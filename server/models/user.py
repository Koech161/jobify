from datetime import datetime
from enum import Enum
from utils import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, db.Enum('employer', 'job_seeker', name='role_enum'),nullable=False,)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    jobs = db.relationship('Job', back_populates='user', cascade= 'all, delete-orphan', lazy=True)
    applications = db.relationship('Application', back_populates='job_seeker', cascade='all, delete-orphan', lazy=True)
    user_profiles = db.relationship('User_profile', back_populates='user', cascade='all, delete-orphan', lazy=True)
    Job_search_historys = db.relationship('Job_search_history', back_populates='user', cascade='all, delete-orphan', lazy=True)
    notifications = db.relationship('Notification', back_populates='user', cascade='all, delete-orphan', lazy=True)

    def __repr__(self):
        return f'<User {self.username} {self.role}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }