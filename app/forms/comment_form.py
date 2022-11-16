from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateCommentForm(FlaskForm):
    body = StringField('title', validators=[DataRequired()])
