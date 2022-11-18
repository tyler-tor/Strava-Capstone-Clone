from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db
from ..forms.comment_form import CreateCommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/')
@login_required
def all_comments():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}



@comment_routes.route('/<int:id>')
@login_required
def one_comment(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    comment = Comment.query.get(id)
    return comment.to_dict()


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        if form.validate_on_submit():
            comment.body = form.data['body']
            db.session.commit()
            return comment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': 'This comment does not belong to you!'}



@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Success'}
    return {'errors': 'This comment does not belong to you!'}
