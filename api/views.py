import time
import random
from flask import Blueprint, jsonify, request
from . import db
from .models import Album
import json

main = Blueprint('main', __name__)


# @main.route('/init', methods=['POST'])
def init_collection():
    # ONLY RUN ONCE 
    # what about when we add new albums?
    # albums = []


    with open("collection.json", "r") as f:
        json_collection_data = json.load(f)

   
    for i in range(len(json_collection_data['releases'])):
        collection_entry = Album(id=json_collection_data['releases'][i]['release_id'],
                                title=json_collection_data['releases'][i]['basic_information']['title'],
                                artist=json_collection_data['releases'][i]['basic_information']['artists'][0]['name'],
                                year=json_collection_data['releases'][i]['basic_information']['year'],
                                genre=json_collection_data['releases'][i]['basic_information']['genres'][0],
                                date_added=json_collection_data['releases'][i]['date_added'],
                                cover=json_collection_data['releases'][i]['basic_information']['huge_thumb'])
        # checking if we already have album in database
        exists = db.session.query(db.exists().where(Album.id == collection_entry.id)).scalar()
        if exists:
            print(collection_entry.title + " is already in the database.")
        if not exists:
            db.session.add(collection_entry)
            db.session.commit()
    # query all album ids
    # print(album_ids)
    # return albums


@main.route('/time')

def get_current_time():
    return {'time': time.asctime(time.localtime(time.time()))}


@main.route('/add_album', methods=['POST'])

def add_album():
    # taking data from request
    album_data = request.get_json()
    # using schema from models.py (no cover url needed, for now)
    album_list = Album.query.all()
    id_set = set()
    album_ids = Album.query.filter(Album.id).all()
    for i in album_ids:
        id_set.add(i.id)
    valid_id = False

    while not valid_id:
        test_id = random.randint(10000, 30000000)
        if test_id not in id_set:
            valid_id = True
            rand_id = test_id
            id_set.add(rand_id)
    
    new_album = Album(id=rand_id, 
    title=album_data['title'], 
    artist=album_data['artist'], 
    year=album_data['year'], 
    genre=album_data['genre'], 
    date_added=album_data['date_added'], 
    cover=album_data['cover'])
    
    # adding data to database
    db.session.add(new_album)
    db.session.commit()

    return 'Done', 201


# @main.route('/delete_album', method=['DELETE'])

# def delete_album():
#     pass

@main.route('/albums')

def albums():
    init_collection()
    album_list = Album.query.all()

    albums = []


    for album in album_list:
        albums.append({'id' : album.id, 'title' : album.title, 'artist' : album.artist, 'year' : album.year, 'genre' : album.genre, 'date_added' : album.date_added, 'cover' : album.cover})
    
    return jsonify({'albums' : albums})