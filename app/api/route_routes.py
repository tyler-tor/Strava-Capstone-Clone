from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route

route_routes = Blueprint('routes', __name__)


@route_routes.route('/')
@login_required
def all_routes():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    routes = Route.query.all()
    return {'routes': [route.to_dict() for route in routes]}


@route_routes.route('/<int:id>')
@login_required
def one_route(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    route = Route.query.get(id)
    return route.to_dict()
