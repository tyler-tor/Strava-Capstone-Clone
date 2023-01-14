from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('routes.id')))
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    total_time = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", back_populates="workouts", single_parent=True)
    routes = db.relationship("Route", back_populates="workouts")
    comments = db.relationship('Comment', back_populates='workouts', cascade='all, delete-orphan', single_parent=True)


    #update instance method. Will need to set states on frontend to prevent errors from nonupdated fields
    def set_kwargs(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        return self


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'routeId': self.route_id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'totalTime': self.total_time,
            'distance': self.distance,
            'imageUrl': self.image_url,
            'createdAt': self.created_at.strftime('%a %B %d %Y'),
            'updatedAt': self.updated_at.strftime('%a %B %d %Y'),
            'comments': [comment.to_dict() for comment in self.comments],
            'ownerInfo': {
                'profilePicture': self.users.profile_picture,
                'firstName': self.users.first_name,
                'lastName': self.users.last_name,
                'email': self.users.email,
                'username': self.users.username,
            }
        }
