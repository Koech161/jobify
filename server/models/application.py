from datetime import datetime
from enum import Enum
from utils import db

class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cover_letter = db.Column(db.Text, nullable=False)
    resume_url = db.Column(db.String, nullable=False)
    job_status = db.Column(db.String, db.Enum('pending', 'rejected', 'accepted', name='job_status_enum'))
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)

    job = db.relationship('Job', back_populates='applications')
    job_seeker = db.relationship('User', back_populates='applications')

    def __repr__(self):
        return f'<Application {self.id} {self.job_seeker_id} >'
    
    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'job_seeker_id': self.job_seeker_id,
            'cover_letter': self.cover_letter,
            'resume_url': self.resume_url,
            'applied_at': self.applied_at.isoformat()
        }