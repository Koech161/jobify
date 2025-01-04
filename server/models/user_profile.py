from datetime import datetime
from utils import db

class User_profile(db.Model):
    __tablename__ = 'user_profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    education = db.Column(db.Text, nullable=True)
    profile_picture = db.Column(db.String, nullable=True)
    first_name = db.Column(db.String,nullable=True)
    last_name = db.Column(db.String, nullable=True)
    phone = db.Column(db.String, nullable=True)
    updated_at= db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='user_profiles')

    def __repr__(self):
        return f'<User_profile {self.user_id}, {self.bio}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'education': self.education,
            'profile_picture': self.profile_picture,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'update_at': self.updated_at.isoformat() if self.updated_at else None
        }
