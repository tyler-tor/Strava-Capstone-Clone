from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateRouteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    image_url = StringField('image', validators=[DataRequired()])
    starting_point = StringField('starting point', validators=[DataRequired()])
    ending_point = StringField('ending point', validators=[DataRequired()])
    distance = StringField('distance', validators=[DataRequired()])
