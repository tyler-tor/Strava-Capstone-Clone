from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Route(db.Model):
    __tablename__ = 'routes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    starting_point = db.Column(db.String(500), nullable=False)
    ending_point = db.Column(db.String(500), nullable=False)
    distance = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", back_populates="routes", single_parent=True)
    workouts = db.relationship("Workout", back_populates="routes")
    comments = db.relationship('Comment', back_populates='routes', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.image_url ,
            'startingPoint': self.starting_point,
            'endingPoint': self.ending_point,
            'distance': self.distance,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
