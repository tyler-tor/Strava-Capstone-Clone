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
    return user.to_dict()


#get friends of selected user
@user_routes.route('/<int:id>/friends')
@login_required
def user_friends(id):
    user = User.query.get(id)
    friends = user.to_dict()['friends']
    return {'friends': friends}


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
        return {user.to_dict() for user in curr_user_friends}
