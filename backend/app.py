import json

import requests
from flask import Flask, request, jsonify
import csv
from geopy.distance import geodesic

app = Flask(__name__)

global apikey
apikey = 'KEY'

#import bus shelter CSV information, to change to database call probably lol
def load_shelters_from_csv(csv_file):
    shelters = []
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            geometry = json.loads(row['geometry'])
            coordinates = geometry['coordinates']
            if coordinates:  # Check if coordinates list is not empty
                latitude = float(coordinates[0][1])  # Access the first pair of coordinates
                longitude = float(coordinates[0][0])
                shelter = {
                    'name': row['ADDRESSSTREET'],
                    'latitude': latitude,
                    'longitude': longitude
                }
                shelters.append(shelter)
    return shelters


def find_closest_shelter(point, shelters):
    min_distance = float('inf')
    closest_shelter = None
    # Extract latitude and longitude from the point dictionary
    latitude = point['latitude'] if 'latitude' in point else point['lat']
    longitude = point['longitude'] if 'longitude' in point else point['lng']
    # Calculate distance to each shelter and find the closest one
    for shelter in shelters:
        distance = geodesic((latitude, longitude), (shelter['latitude'], shelter['longitude'])).meters
        if distance < min_distance:
            min_distance = distance
            closest_shelter = shelter
    return closest_shelter

@app.route("/")
def hello_world():
    print("hello world")
    return "<p>Hello, World!</p>"


def process_transit_routes(origin, destination, shelters):
    global apikey
    # Use Google Directions API to find transit route between origin and destination
    directions_api_url = 'https://maps.googleapis.com/maps/api/directions/json'
    params = {
        'origin': f'{origin["latitude"]},{origin["longitude"]}',
        'destination': f'{destination["latitude"]},{destination["longitude"]}',
        'mode': 'transit',
        'key': apikey
    }

    response = requests.get(directions_api_url, params=params)
    if response.status_code == 200:
        transit_route = response.json()
    else:
        return {'error': 'Failed to fetch transit route from Google Directions API'}


    # Process the transit route steps
    if 'routes' in transit_route and len(transit_route['routes']) > 0:
        route = transit_route['routes'][0]

        for leg in route['legs']:
            for i, step in enumerate(leg['steps']):
                if step['travel_mode'] == 'TRANSIT':
                    if 'transit_details' in step and 'arrival_stop' in step['transit_details']:
                        arrival_stop_location = step['transit_details']['arrival_stop']['location']

                        closest_shelter = find_closest_shelter(arrival_stop_location, shelters)

                        if closest_shelter is None:
                            remaining_steps = leg['steps'][i:]
                            for remaining_step in remaining_steps:
                                if remaining_step['travel_mode'] == 'TRANSIT' and 'arrival_stop' in remaining_step[
                                    'transit_details']:
                                    transit_stop_location = remaining_step['transit_details']['arrival_stop'][
                                        'location']
                                    closest_shelter = find_closest_shelter(transit_stop_location, shelters)
                                    if closest_shelter:
                                        distance = geodesic(
                                            (arrival_stop_location['lat'], arrival_stop_location['lng']),
                                            (closest_shelter['latitude'], closest_shelter['longitude'])).meters
                                        duration_minutes = distance / 60
                                        walking_step = {
                                            'distance': {'text': f'{distance:.1f} m', 'value': distance},
                                            'duration': {'text': f'{duration_minutes:.0f} mins',
                                                         'value': duration_minutes * 60},
                                            'end_location': closest_shelter,
                                            'html_instructions': f'Walk to shelter: {closest_shelter["name"]}',
                                            'travel_mode': 'WALKING'
                                        }
                                        leg['steps'] = leg['steps'][:i] + [walking_step] + remaining_steps[
                                                                                           remaining_steps.index(
                                                                                               remaining_step):]
                                        break
                            else:
                                continue
    #print(transit_route)
    return transit_route

@app.route("/calculate", methods=['POST'])
def start_routing():
    # Load shelters from CSV
    global apikey

    shelters = load_shelters_from_csv('ShelterData.csv')
    # Retrieve the API key from environment variables
    api_key = apikey

    ## receive points from front end, convert to geopoints
    data = request.json  # Assuming JSON data is sent from the frontend
    start_point = data.get('start_point')
    end_point = data.get('end_point')

    
    start_point = {'latitude': float(43.850910), 'longitude': float(-79.313790)}
    end_point = {'latitude': float(43.8339576), 'longitude': float(-79.3204871)}

    # Find the closest shelters to the start and end points
    start_shelter = find_closest_shelter(start_point, shelters)
    end_shelter = find_closest_shelter(end_point, shelters)

    start2 = {'latitude': float(start_shelter[1]), 'longitude': float(start_shelter[2])}
    end2 = {'latitude': float(end_shelter[1]), 'longitude': float(end_shelter[2])}


    # Process transit routes and adjust for shelters
    route_info = process_transit_routes(start2, end2, shelters)

    #overview_polyline_points = route_info['routes'][0]['overview_polyline']['points']
    #print("Overview Polyline Points:", overview_polyline_points)

    #for leg in route_info['routes'][0]['legs']:
        #for step in leg['steps']:
            #if 'polyline' in step:
                #step_polyline_points = step['polyline']['points']
                #print("Step Polyline Points:", step_polyline_points)

    #print(route_info)
    #print(jsonify(route_info))

    return jsonify(route_info)


if __name__ == '__main__':
    app.run()