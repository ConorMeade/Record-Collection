import time
from flask import Blueprint, jsonify
import json

main = Blueprint('main', __name__)


@main.route('/time')

def get_current_time():
    return {'time': time.time()}


@main.route('/add_album', methods=['POST'])

def add_album():
    # album was added successsfully
    return 'Done', 201

@main.route('/albums')

def albums():
    albums = []

    return jsonify({'albums' : albums})