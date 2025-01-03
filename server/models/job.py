from datetime import datetime
from enum import Enum
from utils import db

class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key= True)
    employer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    location = db.Column(db.String, nullable=False)
    salary_range = db.Column(db.String, nullable=False)
    job_type = db.Column(db.String, db.Enum('full-time, part-time, remote, contract, internship', name='job_type_emum'), nullable=False)
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    user = db.relationship('User', back_populates='jobs')
    applications = db.relationship('Application', back_populates='job', cascade='all, delete-orphan', lazy=True)
    job_categories = db.relationship('Job_category', back_populates='job', cascade='all, delete-orphan', lazy=True)

    def __repr__(self):
        return f'<Job {self.title}, {self.job_type}, {self.location}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'employer_id': self.employer_id,
            'title':self.title,
            'description': self.description,
            'requirements': self.requirements,
            'location': self.location,
            'salary_range': self.salary_range,
            'job_type': self.job_type,
            'posted_at': self.posted_at.isoformat(),
            'updated_at':self.updated_at.isoformat() if self.updated_at else None,
            'is_active': self.is_active
              
        }
