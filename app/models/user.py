from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

follows = db.Table('follows',
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.UniqueConstraint('follower_id', 'followed_id')
)

if environment == "production":
    follows.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_picture = db.Column(db.String(255), default='https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg')
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    routes = db.relationship('Route', back_populates='users', cascade='all, delete-orphan')
    workouts = db.relationship('Workout', back_populates='users', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='users', cascade='all, delete-orphan')

    followers = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref('follows'), lazy='dynamic', lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePicture': self.profile_picture,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'routes': [route.to_dict() for route in self.routes],
            'workouts': [workout.to_dict() for workout in self.workouts],
            'comments': [comment.to_dict() for comment in self.comments],
            'friends': [{'userId': follower.id, 'username': follower.username, 'profilePicture': follower.profile_picture} for follower in self.followers]
        }
