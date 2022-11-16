from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)


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
