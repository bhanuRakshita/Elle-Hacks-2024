import csv, os, requests
from flask import json
from pymongo import MongoClient
from geopy.distance import geodesic

#Setting up MongoDB server
mongo_uri = os.environ.get('MONGO_URI')

client = MongoClient(mongo_uri)
db = client['CSV-Shelter-Stop-data']
collection = db['Shelter-longitude-latitude']

csv_file_path = "staticFiles/Transit-Shelter-Data.csv"

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
                collection.insert_one(shelter)   #Inserted into database
    return shelters


#To find the closes shelter
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


#Extracting data from database
def extractDataFromDatabase():
    shelters = []
    cursor = collection.find({})  # Retrieve all documents from the collection

    for document in cursor:
        shelter = {
            'name': document['name'],
            'latitude': document['latitude'],
            'longitude': document['longitude']
        }
        shelters.append(shelter)

    return shelters