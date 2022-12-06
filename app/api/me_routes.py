from flask import Blueprint, jsonify, session, request
from app.models import User,Route, Workout, db
from flask_login import current_user, login_user, logout_user, login_required

me_routes = Blueprint('me', __name__)


@me_routes.route('/friends/activity')
@login_required
def friend_activity():
    user = User.query.get(current_user.id)

    if user:
        friends = user.to_dict()['friends']
        act_dict = {}
        route_list = []

        for i in range(len(friends)):
            routes = Route.query.filter(Route.user_id == friends[i]['userId']).order_by(Route.created_at.desc()).all()
            [route_list.append({**route.to_dict()}) for route in routes]
        act_dict = {'routes': route_list}
        # print('act_dict--------------', act_dict)
        return act_dict
    return {'errors': 'This user does not exist!'}
