from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Route, db
from ..forms.route_form import CreateRouteForm

route_routes = Blueprint('routes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@route_routes.route('/')
@login_required
def all_routes():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    routes = Route.query.all()
    return {'routes': [route.to_dict() for route in routes]}


@route_routes.route('/', methods=['POST'])
@login_required
def add_route():
    form = CreateRouteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        route = Route(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            image_url=form.data['image_url'],
            starting_point=form.data['starting_point'],
            ending_point=form.data['ending_point'],
            distance=form.data['distance']
        )
        db.session.add(route)
        db.session.commit()

        created_route = Route.query.order_by(Route.created_at.desc()).first()
        return created_route.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@route_routes.route('/<int:id>')
@login_required
def one_route(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    route = Route.query.get(id)
    return route.to_dict()
