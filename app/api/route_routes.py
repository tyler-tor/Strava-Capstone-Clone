from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, Route, db
from ..forms.route_form import CreateRouteForm
from ..forms.comment_form import CreateCommentForm

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

# get all routes
@route_routes.route('/')
@login_required
def all_routes():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    routes = Route.query.all()
    return {'routes': [route.to_dict() for route in routes]}


# add a new route
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
        # print('route---------------', created_route.to_dict())
        return created_route.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get information on a selected route
@route_routes.route('/<int:id>')
@login_required
def one_route(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    route = Route.query.get(id)
    return route.to_dict()


# update a specific route
@route_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_route(id):
    form = CreateRouteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        route = Route.query.get(id)
        route.set_kwargs(**form.data)
        db.session.commit()
        return route.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete a specific route
@route_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_route(id):
    route = Route.query.get(id)
    if route and current_user.id == route.user_id:
        db.session.delete(route)
        db.session.commit()

        return {'message': 'Success'}
    return {'errors': 'That route does not exist!'}


#get all comments on a route
@route_routes.route('/<int:id>/comments')
@login_required
def get_comments_to_route(id):
    route = Route.query.get(id)
    if route:
        comments = route.to_dict()['comments']
        return {'comments': comments}
    return {'errors': 'This route does not exist!'}


# add a comment to a route
@route_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment_to_route(id):
    route = Route.query.get(id)
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            body=form.data['body'],
            route_id=route.id
        )
        db.session.add(comment)
        db.session.commit()
        # print('route---------------', route.to_dict())
        return comment.to_dict()
    return {'errors': form.errors}, 401
