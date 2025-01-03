from datetime import timedelta
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from utils import db

from models.application import Application
from models.job import Job
from models.job_category import Job_category
from models.job_search import Job_search_history
from models.notification import Notification
from models.user import User
from models.user_profile import User_profile

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///app.db'
app.config['SQLACHEMY_TRACK_MODIFICATIONS']=False
app.json.compact=False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

CORS(app)
migrate = Migrate(app,db)
db.init_app(app)

api = Api(app)
jwt = JWTManager(app)

class Home(Resource):
    def get(self):
        return 'Welcome To Jobify'
    
class Register(Resource):   
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'job_seeker')
        created_at = data.get('created_at')

        if not all([username, email, password]):
            return {'error': 'All fields must be fill'}
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return {'error': 'Email or Username already registered'},401
        hash_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(username=username, email=email, password=hash_password,role=role, created_at=created_at)

        try:
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'New user registered successfully','new_user':  new_user.username},200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)},500
        
class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()  

        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id,expires_delta=timedelta(days=7)) 
            return {'message': 'Login successfully', 'token': access_token, 'user_id': user.id}, 200
        
        return {'error': 'Invalid credentials'}, 401
    
class Jobs(Resource):
    def post(self):
        data = request.get_json()
        employer_id = data.get('employer_id')
        title = data.get('title')
        description = data.get('description')
        requirements = data.get('requirements')
        location = data.get('location')  
        salary_range = data.get('salary_range')
        job_type = data.get('job_type')
        posted_at = data.get('posted_at')
        is_active = data.get('is_active')

        if not all([employer_id, title, description, salary_range, location]):
            return {'error': 'All fields are required'}, 401
        new_job = Job(employer_id=employer_id, title=title, description=description, 
                      requirements=requirements, location=location, salary_range=salary_range,
                        is_active=is_active,job_type=job_type, posted_at=posted_at)
        try:
            db.session.add(new_job)
            db.session.commit()
            return {'message': 'New job posted successfully', 'new_job': new_job.title} , 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    def get(self):
        jobs = Job.query.all()
        if not jobs:
            return {'error': 'No jobs available'}, 404
        jobs_dict=[job.to_dict() for job in jobs]
        return jobs_dict, 200

class Applications(Resource):
    def post(self):
        data = request.get_json()
        job_id = data.get('job_id')
        job_seeker_id= data.get('job_seeker_id')
        cover_letter = data.get('cover_letter')
        resume_url = data.get('resume_url')
        job_status = data.get('job_status')
        applied_at = data.get('applied_at')

        if not all([cover_letter, resume_url, job_seeker_id, job_id]):
            return {'error': 'All Fields are required.'}, 401
        
        new_application = Application(job_id=job_id, job_seeker_id=job_seeker_id, cover_letter=cover_letter, 
                                      resume_url=resume_url, job_status=job_status, applied_at=applied_at)
        
        try:
            db.session.add(new_application)
            db.session.commit()
            return {'message': 'New application successfully', 'applicationId': new_application.id},201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}
        
    def get(self):
        applications = Application.query.all()
        if not applications:
            return {'error': 'Application not available'} ,404
        return [application.to_dict() for application in applications],200

class User_Profile(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        bio = data.get('bio')
        education = data.get('education')
        profile_pic = data.get('profile_pic')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone = data.get('phone')
        
        new_user_profile = User_profile(user_id=user_id, bio=bio, education=education, profile_pic=profile_pic,
                                        first_name=first_name, last_name=last_name, phone=phone)

        try:
            db.session.add(new_user_profile)
            db.session.commit()
            return {'message': 'User profile added successfully', 'user_profile': new_user_profile.user_id},201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)},500
        
    def get(self):
        user_profiles = User_profile.query.all()
        if not user_profiles:
            return {'error': 'User_profiles not available'}, 404
        return [user_profile.to_dict() for user_profile in user_profiles], 200  

class Job_Category(Resource):
    def post(self):
        data = request.get_json()
        job_id = data.get('job_id')
        name = data.get('name')

        new_job_category = Job_category(job_id=job_id, name=name)

        try:
            db.session.add(new_job_category)
            db.session.commit()
            return {'message': 'New job category added successfully', 'job_category': new_job_category.name} ,201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)},500  
        
    def get(self):     
        job_categories = Job_category.query.all()

        if not job_categories:
            return {'error': 'job categories not available'}, 404
        return [job_category.to_dict() for job_category in job_categories], 200
    
class Notifications(Resource):
    def post(self):
        data  = request.get_json()
        user_id = data.get('user_id')
        message = data.get('message')
        is_read = data.get('is_read')
        created_at = data.get('created_at')

        new_notification = Notification(user_id=user_id, message=message, is_read=is_read, created_at=created_at)

        try:
            db.session.add(new_notification) 
            db.session.commit()
            return {'message': 'New notification created successfully', 'notification': new_notification.id}, 201
        except Exception as e:
            return {'error': str(e)}, 500   
        
    def get(self):
        notifications = Notification.query.all()

        if not notifications:
            return {'error': 'Notifications not available'}, 404
        return [notification.to_dict() for notification in notifications], 200 

class Job_search(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        search_query= data.get('search_query')
        search_date = data.get('search_date')

        new_job_search = Job_search_history(user_id=user_id, search_query=search_query, search_date=search_date)

        try:
            db.session.add(new_job_search)
            db.session.commit()
            return {'message': 'Job_search crerated successfully', 'job_search':new_job_search.search_query} ,201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    def get(self):
        job_search = Job_search_history.query.all()
        if not job_search:
            return {'error': 'Job search history not available'}, 404
        return [history.to_dict() for history in job_search], 200         
        
api.add_resource(Home, '/')    
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Jobs, '/jobs')
api.add_resource(Applications, '/applications')
api.add_resource(User_Profile, '/user_profile')
api.add_resource(Job_Category,'/job_category')
api.add_resource(Notifications, '/notifications')
api.add_resource(Job_search, '/job_search')

if __name__ == '__main__':
    app.run(port=5555)
