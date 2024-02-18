import os
from coordinates import load_shelters_from_csv, find_closest_shelter, process_transit_routes
import requests
from flask import Flask, request, jsonify
from geopy.distance import geodesic

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/calculate", methods=['POST'])
def start_routing():

    # Load shelters from CSV
    global apikey

    #loads coordinates data from csv file
    shelters = load_shelters_from_csv('ShelterData.csv')

    # Retrieve the API key from environment variables
    api_key = os.environ.get('GOOGLE_MAPS_API_KEY')

    ## receive points from front end, convert to geopoints
    data = request.json  # Assuming JSON data is sent from the fronten
    start_address = data.get('start_point')
    end_address = data.get('end_point')

    addressList = [start_address, end_address]

    if not addressList:
        return jsonify({'error': 'Address parameter is required'}), 400
    
    coordinates = []

    for address in addressList:

        geocode_url = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
        response =  requests.get(geocode_url)

        if response.status_code == 200:
            data = response.json()
            if data['status'] == 'OK':
                location = data['results'][0]['geometry']['location']
                latitude = location['lat']
                longitude = location['lng']
                coordinates.append({'address': address, 'latitude': latitude, 'longitude': longitude})
            else:
                return jsonify ({'error': 'Failed to geocode address'}), 500
        else:
            return jsonify({'error': 'Failed to connect to geocoding service'}), 500
          
    # start_point = {'latitude': float(43.850910), 'longitude': float(-79.313790)}
    # end_point = {'latitude': float(43.8339576), 'longitude': float(-79.3204871)}

    # Find the closest shelters to the start and end points
    start_shelter = find_closest_shelter(coordinates[0], shelters)
    end_shelter = find_closest_shelter(coordinates[1], shelters)

    start2 = {'latitude': float(start_shelter[1]), 'longitude': float(start_shelter[2])}
    end2 = {'latitude': float(end_shelter[1]), 'longitude': float(end_shelter[2])}

    # Process transit routes and adjust for shelters
    route_info = process_transit_routes(start2, end2, shelters)

    #overview_polyline_points = route_info['routes'][0]['overview_polyline']['points']
    #print("Overview Polyline Points:", overview_polyline_points)

    for leg in route_info['routes'][0]['legs']:
        for step in leg['steps']:
            if 'polyline' in step:
                step_polyline_points = step['polyline']['points']
                print("Step Polyline Points:", step_polyline_points)

    #print(route_info)
    #print(jsonify(route_info))

    return jsonify(route_info)

if __name__ == '__main__':
    app.run()