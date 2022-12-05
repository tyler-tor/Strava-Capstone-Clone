from app.models import db, Route, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_routes():
    route1 = Route(
        user_id=3,
        title='route1',
        description='test this route 1',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/rp-default-1.jpg',
        start_lat=47.650439,
        start_lng=-117.448093,
        end_lat=47.669415,
        end_lng=-117.103644,
        traveling_mode='BICYCLING',
        distance='45 miles')
    route2 = Route(
        user_id=2,
        title='route2',
        description='test this route 2',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/rp-default-2.jpg',
        start_lat=47.772469,
        start_lng=-117.378410,
        end_lat=47.769955,
        end_lng=-117.544946,
        traveling_mode='BICYCLING',
        distance='20 miles')
    route3 = Route(
        user_id=1,
        title='route3',
        description='test this route 3',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/rp-default-3.jpg',
        start_lat=47.602045,
        start_lng=-117.368188,
        end_lat=47.586971,
        end_lng=-117.319481,
        traveling_mode='WALKING',
        distance='15 miles')

    db.session.add(route1)
    db.session.add(route2)
    db.session.add(route3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_routes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.routes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM routes")

    db.session.commit()
