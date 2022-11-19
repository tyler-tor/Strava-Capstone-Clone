from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Route, db

user_routes = Blueprint('users', __name__)


#get all users
@user_routes.route('/')
@login_required
def users():

    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


#get info on a specific user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    if user:
        return user.to_dict()
    return {'errors': 'This user does not exist!'}


# get routes from a selected user
@user_routes.route('/<int:id>/routes')
@login_required
def user_route(id):
    user = User.query.get(id)
    if user:
        routes = user.to_dict()['routes']
        return {'routes': routes}
    return {'errors': 'This user does not exist!'}


# get comments from a selected user
@user_routes.route('/<int:id>/comments')
@login_required
def user_comments(id):
    user = User.query.get(id)
    if user:
        comments = user.to_dict()['comments']
        return {'comments': comments}
    return {'errors': 'This user does not exist!'}


# get workouts from a selected user
@user_routes.route('/<int:id>/workouts')
@login_required
def user_workouts(id):
    user = User.query.get(id)
    if user:
        workouts = user.to_dict()['workouts']
        return {'workouts': workouts}
    return {'errors': 'This user does not exist!'}


#get friends of selected user
@user_routes.route('/<int:id>/friends')
@login_required
def user_friends(id):
    user = User.query.get(id)
    if user:
        friends = user.to_dict()['friends']
        return {'friends': friends}
    return {'errors': 'This user does not exist!'}


#adding friend to current user friends list
@user_routes.route('/<int:id>/friends', methods=['POST'])
@login_required
def add_user_friends(id):
    curr_user = User.query.get(current_user.id)
    user = User.query.get(id)
    if curr_user and user:
        curr_user_friends = curr_user.to_dict()['friends']
        if user in curr_user_friends:
            return{'error' : 'This user is already your friend!'}

        curr_user_friends.append(user)
        db.session.commit()
        return {'friend': user.to_dict()}


# unfriending a user
@user_routes.route('/<int:id>/friends', methods=['DELETE'])
@login_required
def unfriend_user(id):
    curr_user = User.query.get(current_user.id)
    user = User.query.get(id)
    if curr_user and user:
        if user in curr_user.friends:
            curr_user.friends.remove(user)
            db.session.commit()
            return {'unFriended': user.to_dict()}
        return {'error': 'user is not a friend of current user!'}
