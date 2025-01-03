from utils import db

class Job_category(db.Model):
    __tablename__ = 'job_categories'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    name = db.Column(db.String, nullable=False)

    job = db.relationship('Job', back_populates='job_categories')

    def __repr__(self):
        return f'<Job_category {self.id}, {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'name': self.name
         }