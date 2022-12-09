from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class CreateRouteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    start_lat = FloatField('starting lat', validators=[DataRequired()])
    start_lng = FloatField('starting lng', validators=[DataRequired()])
    end_lat = FloatField('ending lat', validators=[DataRequired()])
    end_lng = FloatField('ending lng', validators=[DataRequired()])
    traveling_mode = StringField('travel mode', validators=[DataRequired()])
    distance = StringField('distance', validators=[DataRequired()])
    image_url = StringField('image', validators=[DataRequired()])
