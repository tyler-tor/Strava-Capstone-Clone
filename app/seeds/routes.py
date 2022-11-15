from app.models import db, Route, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_routes():
    route1 = Route(
        user_id=3, title='route1', description='test this route 1', image_url='test.url', starting_point='test point start',
        ending_point='test point end', distance='45 miles')
    route2 = Route(
        user_id=2, title='route2', description='test this route 2', image_url='test.url2', starting_point='test point start2',
        ending_point='test point end2', distance='46 miles')
    route3 = Route(
        user_id=1, title='route3', description='test this route 3', image_url='test.url3', starting_point='test point start3',
        ending_point='test point end3', distance='47 miles')

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.routes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM routes")

    db.session.commit()
