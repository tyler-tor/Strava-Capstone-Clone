from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demouser', email='demo@aa.io', password='password', first_name='Demo', last_name='user',
        profile_picture='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/demo-pic-1.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Doe',
        profile_picture='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/marnie-pic-1.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Smith',
        profile_picture='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/bob-pic-jpg.jpg')


    demo.followers = [marnie, bobbie]
    marnie.followers = [demo, bobbie]
    bobbie.followers = [marnie, demo]

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM follows")

    db.session.commit()
