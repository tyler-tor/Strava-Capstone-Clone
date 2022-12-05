from flask import Blueprint
import os
from flask_login import current_user, login_required

map_routes = Blueprint('map', __name__)

@map_routes.route('/key')
@login_required
def map_key():
    GOOGLE_MAP_API_KEY = os.environ.get('REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
    # print('google key---------------------------------------', GOOGLE_MAP_API_KEY)
    return {'mapKey': GOOGLE_MAP_API_KEY}
