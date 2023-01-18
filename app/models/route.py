from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Route(db.Model):
    __tablename__ = 'routes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    start_lat = db.Column(db.Float(), nullable=False)
    start_lng = db.Column(db.Float(), nullable=False)
    end_lat = db.Column(db.Float(), nullable=False)
    end_lng = db.Column(db.Float(), nullable=False)
    optimize_waypoints = db.Column(db.Boolean(), default=True)
    stopover = db.Column(db.Boolean(), default=False)
    traveling_mode = db.Column(db.String(50), nullable=False)
    distance = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship(
        "User", back_populates="routes", single_parent=True)
    # workouts = db.relationship("Workout", back_populates="routes")
    comments = db.relationship(
        'Comment', back_populates='routes', cascade='all, delete-orphan')

# update instance method. Will need to set states on frontend to prevent errors from nonupdated fields
    def set_kwargs(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        return self

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.image_url,
            'startingPoint': {
                'lat': self.start_lat,
                'lng': self.start_lng
            },
            'endingPoint': {
                'lat': self.end_lat,
                'lng': self.end_lng
            },
            'travelMode': self.traveling_mode,
            'requestData': {
                'origin': {
                    'lat': self.start_lat,
                    'lng': self.start_lng
                },
                'optimizeWaypoints': self.optimize_waypoints,
                'waypoints': [{
                    'location': {
                        'lat': self.start_lat,
                        'lng': self.start_lng
                    },
                    'stopover': self.stopover
                }],
                'destination': {
                    'lat': self.end_lat,
                    'lng': self.end_lng
                },
                'travelMode': self.traveling_mode
            },
            'staticMap': f'https://maps.googleapis.com/maps/api/staticmap?markers={self.start_lat},{self.start_lng}|{self.end_lat},{self.end_lng}&size=300x300&maptype=roadmap',
            'distance': self.distance,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments],
            'ownerInfo': {
                'profilePicture': self.users.profile_picture,
                'firstName': self.users.first_name,
                'lastName': self.users.last_name,
                'email': self.users.email,
                'username': self.users.username
            }
        }
