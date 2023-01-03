from app.models import db, Workout, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_workouts():
    workout1 = Workout(
        user_id=3, route_id=2, title='workout 1 for user 3 route 2', description='test workout 1', image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/hiking-image-1.jpg', type='running',
        total_time='40 min', distance='12 miles')
    workout2 = Workout(
        user_id=2, route_id=3, title='workout 2 for user 2 route 3', description='test workout 2', image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/hiking-image-2.jpg', type='hiking',
        total_time='1 hour 20 min', distance='8 miles')
    workout3 = Workout(
        user_id=1, route_id=1, title='workout 3 for user 1 route 1', description='test workout 3', image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/hiking-image-3.jpg', type='biking',
        total_time='56 min', distance='23 miles')

    db.session.add(workout1)
    db.session.add(workout2)
    db.session.add(workout3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM workouts")

    db.session.commit()
