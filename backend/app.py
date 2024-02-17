import requests
from flask import Flask, request
import csv
from geopy.distance import geodesic

app = Flask(__name__)

GOOGLE_MAPS_API_KEY = 'KEY'

#import bus shelter CSV information, to change to database call probably lol
def load_shelters_from_csv(csv_file):
    shelters = []
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            shelter = {
                'name': row['ADDRESSSTREET'],  # Use ADDRESSSTREET as the shelter name
                'latitude': float(row['geometry']['coordinates'][1]),  # Latitude is at index 1 of coordinates
                'longitude': float(row['geometry']['coordinates'][0])  # Longitude is at index 0 of coordinates
            }
            shelters.append(shelter)
    return shelters

def find_closest_shelter(point, shelters):
    min_distance = float('inf')
    closest_shelter = None
    for shelter in shelters:
        distance = geodesic((point['latitude'], point['longitude']), (shelter['latitude'], shelter['longitude'])).meters
        if distance < min_distance:
            min_distance = distance
            closest_shelter = shelter
    return closest_shelter

@app.route("/")
def hello_world():
    print("hello world")
    return "<p>Hello, World!</p>"

@app.route("/calculate")
def start_routing():
    # Load shelters from CSV
    shelters = load_shelters_from_csv('ShelterData.csv')

    #get posted values from form (frontend)
    start_point = request.form.get('start')
    end_point = request.form.get('end')

    # Find the closest shelters to the start and end points
    start_shelter = find_closest_shelter(start_point, shelters)
    end_shelter = find_closest_shelter(end_point, shelters)

    # Use Google Directions API to find transit route between start and end points
    # Use Google Directions API to find transit route between start and end points
    directions_api_url = 'https://maps.googleapis.com/maps/api/directions/json'
    params = {
        'origin': f'{start_point["latitude"]},{start_point["longitude"]}',
        'destination': f'{end_point["latitude"]},{end_point["longitude"]}',
        'key': GOOGLE_MAPS_API_KEY,
        'mode': 'transit'
    }
    response = requests.get(directions_api_url, params=params)
    if response.status_code == 200:
        transit_route = response.json()
    else:
        return {'error': 'Failed to fetch transit route from Google Directions API'}

    # Implement transfer logic
    if 'routes' in transit_route and len(transit_route['routes']) > 0:
        route = transit_route['routes'][0]
        for leg in route['legs']:
            for i, step in enumerate(leg['steps']):
                if step['travel_mode'] == 'TRANSIT':
                    if 'transit_details' in step:
                        transfer_stop = step['transit_details']['arrival_stop']
                        transfer_location = {'latitude': transfer_stop['location']['lat'],
                                             'longitude': transfer_stop['location']['lng']}
                        closest_shelter_to_transfer = find_closest_shelter(transfer_location, shelters)
                        if closest_shelter_to_transfer is None:
                            # Find the nearest shelter along the remaining transit route
                            remaining_steps = leg['steps'][i:]
                            for remaining_step in remaining_steps:
                                if remaining_step['travel_mode'] == 'TRANSIT':
                                    transit_stop_location = {
                                        'latitude': remaining_step['transit_details']['arrival_stop']['location'][
                                            'lat'],
                                        'longitude': remaining_step['transit_details']['arrival_stop']['location'][
                                            'lng']
                                    }
                                    closest_shelter_to_transfer = find_closest_shelter(transit_stop_location,shelters)

                                    if closest_shelter_to_transfer:
                                        # Redirect to the shelter found along the remaining route
                                        # Adjust transit route to include walking to the shelter
                                        distance = ((transfer_location['latitude'] - closest_shelter_to_transfer[
                                            'latitude']) ** 2 + (transfer_location['longitude'] -
                                                                 closest_shelter_to_transfer[
                                                                     'longitude']) ** 2) ** 0.5
                                        duration_minutes = distance / 60  # Assuming average walking speed of 1.4 m/s
                                        walking_step = {
                                            'distance': {'text': f'{distance:.1f} m', 'value': distance},
                                            'duration': {'text': f'{duration_minutes:.0f} mins',
                                                         'value': duration_minutes * 60},
                                            'end_location': {'lat': closest_shelter_to_transfer['latitude'],
                                                             'lng': closest_shelter_to_transfer['longitude']},
                                            'html_instructions': f'Walk to shelter: {closest_shelter_to_transfer["name"]}',
                                            'travel_mode': 'WALKING'
                                        }
                                        leg['steps'] = leg['steps'][:i] + [walking_step] + remaining_steps[remaining_steps.index(remaining_step):]
                                        break
                            else:
                                # If no shelter found along remaining route, continue on bus until next transfer
                                continue
    else:
        return {'error': 'No transit route found'}

    # Return route information
    route_info = {
        'start_point': start_point,
        'end_point': end_point,
        'start_shelter': start_shelter,
        'end_shelter': end_shelter,
        'transit_route': transit_route
    }

    return route_info




if __name__ == '__main__':
    app.run()