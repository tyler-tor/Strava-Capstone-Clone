from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Workout, Comment, db
from ..forms.workout_form import CreateWorkoutForm
from ..forms.comment_form import CreateCommentForm


workout_routes = Blueprint('workouts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@workout_routes.route('/')
@login_required
def all_workouts():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    workouts = Workout.query.all()
    return {'workouts': [workout.to_dict() for workout in workouts]}


@workout_routes.route('/', methods=['POST'])
@login_required
def add_workout():
    form = CreateWorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        workout = Workout(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            type=form.data['type'],
            total_time=form.data['total_time'],
            image_url=form.data['image_url'],
            distance=form.data['distance']
        )
        db.session.add(workout)
        db.session.commit()
        created_workout = Workout.query.order_by(Workout.created_at.desc()).first()
        return created_workout.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@workout_routes.route('/<int:id>')
@login_required
def one_workout(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    workout = Workout.query.get(id)
    return workout.to_dict()


@workout_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_workout(id):
    form = CreateWorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workout = Workout.query.get(id)
        workout.set_kwargs(**form.data)
        db.session.commit()
        return workout.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@workout_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_workout(id):
    workout = Workout.query.get(id)
    if workout and current_user.id == workout.user_id:
        db.session.delete(workout)
        db.session.commit()

        return {'message': 'Success'}
    return {'errors': 'That workout does not exist!'}



@workout_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment_to_workout(id):
    workout = Workout.query.get(id)
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            body=form.data['body'],
            workout_id=workout.id
        )
        db.session.add(comment)
        db.session.commit()
        # print('route---------------', workout.to_dict())
        return comment.to_dict()
    return {'errors': form.errors}, 401
