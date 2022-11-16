from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateWorkoutForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    total_time = StringField('total time', validators=[DataRequired()])
    image_url = StringField('image', validators=[DataRequired()])
    distance = StringField('distance', validators=[DataRequired()])
