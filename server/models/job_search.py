from datetime import datetime
from utils import db

class Job_search_history(db.Model):
    __tablename__ = 'job_search_historys'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    search_query= db.Column(db.String, nullable=False)
    search_date = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='Job_search_historys')
    
    def __repr__(self):
        return f'<Job_search_history {self.id}, {self.search_query}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'search_query': self.search_query,
            'search_date':  self.search_date.isoformat()
        }
