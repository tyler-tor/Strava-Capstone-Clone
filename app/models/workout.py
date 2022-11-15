from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    total_time = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", back_populates="routes", single_parent=True)
    routes = db.relationship("Route", back_populates="routes")
    comments = db.relationship('Comment', back_populates='routes', cascade='all, delete-orphan', single_parent=True)

def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.username,
            'description': self.description,
            'type': self.type,
            'totalTime': self.time,
            'distance': self.distance,
            'imageUrl': self.image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
