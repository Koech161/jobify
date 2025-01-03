from datetime import datetime
from utils import db
from models.application import Application
from models.job import Job
from models.job_category import Job_category
from models.job_search import Job_search_history
from models.notification import Notification
from models.user import User
from models.user_profile import User_profile
import random
from app import app

# Function to clear the existing data from the database
def clear_existing_data():
    db.session.query(Notification).delete()
    db.session.query(Job_search_history).delete()
    db.session.query(User_profile).delete()
    db.session.query(Application).delete()
    db.session.query(Job_category).delete()
    db.session.query(Job).delete()
    db.session.query(User).delete()
    db.session.commit()
    print("Existing data cleared.")

# Function to create sample users
def create_sample_users():
    users = [
        User(username="employer1", email="employer1@example.com", password="password", role="employer"),
        User(username="jobseeker1", email="jobseeker1@example.com", password="password", role="job_seeker"),
        User(username="employer2", email="employer2@example.com", password="password", role="employer"),
        User(username="jobseeker2", email="jobseeker2@example.com", password="password", role="job_seeker")
    ]
    db.session.add_all(users)
    db.session.commit()

# Function to create sample jobs
def create_sample_jobs():
    jobs = [
        Job(employer_id=1, title="Software Developer", description="Develop software", requirements="Python, JavaScript", location="Remote", salary_range="$80,000 - $100,000", job_type="full-time"),
        Job(employer_id=2, title="Data Scientist", description="Analyze data", requirements="Python, Machine Learning", location="On-site", salary_range="$70,000 - $90,000", job_type="full-time"),
        Job(employer_id=1, title="UI/UX Designer", description="Design user interfaces", requirements="Figma, Photoshop", location="Remote", salary_range="$60,000 - $80,000", job_type="part-time")
    ]
    db.session.add_all(jobs)
    db.session.commit()

# Function to create sample job categories
def create_sample_job_categories():
    job_categories = [
        Job_category(job_id=1, name="Software Engineering"),
        Job_category(job_id=2, name="Data Science"),
        Job_category(job_id=3, name="Design")
    ]
    db.session.add_all(job_categories)
    db.session.commit()

# Function to create sample applications
def create_sample_applications():
    applications = [
        Application(job_id=1, job_seeker_id=2, cover_letter="Great opportunity!", resume_url="http://example.com/resume1.pdf", job_status="pending"),
        Application(job_id=2, job_seeker_id=4, cover_letter="I am passionate about data science!", resume_url="http://example.com/resume2.pdf", job_status="pending")
    ]
    db.session.add_all(applications)
    db.session.commit()

# Function to create sample job search history
def create_sample_job_search_history():
    job_search_history = [
        Job_search_history(user_id=2, search_query="Python jobs", search_date=datetime.utcnow()),
        Job_search_history(user_id=4, search_query="Data scientist jobs", search_date=datetime.utcnow())
    ]
    db.session.add_all(job_search_history)
    db.session.commit()

# Function to create sample notifications
def create_sample_notifications():
    notifications = [
        Notification(user_id=2, message="Your application for Software Developer is under review.", is_read=False),
        Notification(user_id=4, message="New job match for Data Scientist role!", is_read=True)
    ]
    db.session.add_all(notifications)
    db.session.commit()

# Function to create sample user profiles
def create_sample_user_profiles():
    user_profiles = [
        User_profile(user_id=2, bio="Experienced software developer", education="BSc Computer Science", profile_picture="http://example.com/profile1.jpg"),
        User_profile(user_id=4, bio="Data science enthusiast", education="MSc Data Science", profile_picture="http://example.com/profile2.jpg")
    ]
    db.session.add_all(user_profiles)
    db.session.commit()

# Seed function to populate the database
def seed():
    clear_existing_data()  # Clear existing data first
    create_sample_users()
    create_sample_jobs()
    create_sample_job_categories()
    create_sample_applications()
    create_sample_job_search_history()
    create_sample_notifications()
    create_sample_user_profiles()
    print("Database seeded successfully.")

# Run the seed function within the application context
if __name__ == "__main__":
    with app.app_context():
        seed()