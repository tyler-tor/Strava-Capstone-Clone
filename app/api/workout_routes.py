from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Workout

workout_routes = Blueprint('workouts', __name__)


@workout_routes.route('/')
@login_required
def all_workouts():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    workouts = Workout.query.all()
    return {'workouts': [workout.to_dict() for workout in workouts]}


@workout_routes.route('/<int:id>')
@login_required
def one_workout(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    workout = Workout.query.get(id)
    return workout.to_dict()
