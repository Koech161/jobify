from datetime import datetime, timedelta
import logging
import os
from flask import Flask, request, jsonify, send_from_directory
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
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, emit


load_dotenv()
UPLOADER_FOLDER = 'files/'
ALLOWED_EXTENSIONS = {'pdf','txt', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.json.compact=False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ALGORITHM'] = 'HS256'
app.config['UPLOADER_FOLDER'] = UPLOADER_FOLDER

CORS(app)

migrate = Migrate(app,db)
db.init_app(app)

api = Api(app)
jwt = JWTManager(app)

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


socketio.init_app(app)


if not os.path.exists(UPLOADER_FOLDER):
    os.makedirs(UPLOADER_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/files/<filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOADER_FOLDER'], filename)    

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
            access_token = create_access_token(identity=str(user.id),expires_delta=timedelta(days=7)) 
            return {'message': 'Login successfully', 'token': access_token, 'userId': user.id}, 200
        
        return {'error': 'Invalid credentials'}, 401
    
    def get(self,id):
        user = User.query.get_or_404(id)
        return user.to_dict(), 200
    
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
        if posted_at:
            posted_at = datetime.fromisoformat(posted_at.replace('Z', '+00:00')) 
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
class JobByID(Resource):    
    def get(self, id):
        job = Job.query.get_or_404(id)
        return job.to_dict(), 200

class Applications(Resource):
    @jwt_required()
    def post(self):
        data = request.form
        job_id = data.get('job_id')
        job_seeker_id= get_jwt_identity()
        cover_letter = data.get('cover_letter')
        # resume_url = data.get('resume_url')
        job_status = data.get('job_status')
        applied_at = data.get('applied_at')
        
        if 'resume_url' not in request.files:
            return {'error': 'Resume file is required'}, 400
        
        resume_url = request.files['resume_url']

        if resume_url.filename == '':
            return {'error': 'No selected resume file'}, 400
        if resume_url and allowed_file(resume_url.filename):
            resume_url_filename = secure_filename(resume_url.filename)
            resume_path = os.path.join(app.config['UPLOADER_FOLDER'], resume_url_filename)
            resume_url.save(resume_path)

        if not all([cover_letter, job_seeker_id, job_id]):
            return {'error': 'All Fields are required.'}, 401
        if applied_at:
            applied_at = datetime.fromisoformat(applied_at.replace('Z', '+00:00'))
        new_application = Application(job_id=job_id, job_seeker_id=job_seeker_id, cover_letter=cover_letter, 
                                      resume_url=resume_path, job_status=job_status, applied_at=applied_at)
        
        try:
            db.session.add(new_application)
            db.session.commit()
            print(f"Resume file saved at: {resume_path}")

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
        logging.info("Received request: %s", request.form)
        logging.info("Files in request: %s", request.files)
        user_id = request.form.get('user_id')
        bio = request.form.get('bio','')
        education = request.form.get('education','')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        phone = request.form.get('phone')

        
        if 'profile_picture' not in request.files:
            return {'error': 'Profile picture is required'}
        profile_picture = request.files['profile_picture']
        if profile_picture.filename == '':
            return {'error': 'No selected profile pictur file'}, 400
        
        if profile_picture and allowed_file(profile_picture.filename):
            profile_pic_filename = secure_filename(profile_picture.filename)
            profile_pic_path = os.path.join(app.config['UPLOADER_FOLDER'], profile_pic_filename)
            profile_picture.save(profile_pic_path)
        
            new_user_profile = User_profile(user_id=user_id, bio=bio, education=education, profile_picture=profile_pic_path,
                                        first_name=first_name, last_name=last_name, phone=phone)

            try:
                db.session.add(new_user_profile)
                db.session.commit()
                return jsonify({'message': 'User profile added successfully', 'user_profile': new_user_profile.user_id})
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)},500
        else:
            return {'error': 'Invalid profile picture file type'}, 400
    @jwt_required()    
    def get(self):
        user_id  = get_jwt_identity()

        if not user_id:
            return {'error': 'No User available'}, 400
        user_prof = User_profile.query.filter_by(user_id=user_id).first()
        if user_prof and user_prof.profile_picture:
            user_prof.profile_picture = f'http://127.0.0.1:5555/{user_prof.profile_picture}'
        return user_prof.to_dict(), 200        

class Users(Resource):

    def get(self):
        users = User.query.all()
        if not users:
            return {'error': 'No users available'},404
        return [user.to_dict() for user in users], 200 
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
    @jwt_required()
    def post(self):
        data  = request.get_json()
        message = data.get('message')
        is_read = data.get('is_read')
        created_at = data.get('created_at')

        users = User.query.all()
        if not users:
            return {'error': 'No users to send notifications'}, 404
        
        
        notifications =[]
        try:
            for user in users:

                new_notification = Notification(user_id=user.id, message=message, is_read=is_read, created_at=created_at)
                db.session.add(new_notification) 
                notifications.append(new_notification)
            db.session.commit()

            for user in users:
                socketio.emit('new_notification', {
                    'user_id': user.id,
                    'message': message,
                    'is_read': is_read,
                    'created_at': created_at
                }, room=user.id)
            return {'message': 'New notification created successfully',
                     'notification': [notif.id for notif in notifications]}, 201
        except Exception as e:
            return {'error': str(e)}, 500   
    @jwt_required()
    def get(self):
        user_id  = get_jwt_identity()
        
        notifications = Notification.query.filter_by(user_id=user_id).all()

        if not notifications:
            return {'error': 'Notifications not available'}, 404
        return [notification.to_dict() for notification in notifications], 200 
class NotificationResource(Resource):
    def put(self, id):
        # Get the data from the request
        data = request.get_json()
        is_read = data.get('is_read')

        
        notification = Notification.query.get_or_404(id)


        # Update the 'is_read' field
        notification.is_read = is_read

        try:
            # Commit the changes to the database
            db.session.commit()
            return {'message': 'Notification updated successfully'}, 200
        except Exception as e:
            return {'error': str(e)}, 500    
    def get(self, id):
        notification= Notification.query.get_or_404(id)
        return notification.to_dict(), 20
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
api.add_resource(Login, '/login', '/users/<int:id>')
api.add_resource(Users, '/user')
api.add_resource(Jobs, '/jobs')
api.add_resource(JobByID, '/jobs/<int:id>')
api.add_resource(Applications, '/applications')
api.add_resource(User_Profile, '/user_profile')
api.add_resource(Job_Category,'/job_category')
api.add_resource(Notifications, '/notifications')
api.add_resource(NotificationResource, '/notifications/<int:id>')
api.add_resource(Job_search, '/job_search')

if __name__ == '__main__':
    app.run(port=5555)
