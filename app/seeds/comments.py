from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=3, route_id=2, workout_id=None, body='test comment for route 2 and user 3')
    comment2 = Comment(
        user_id=2, workout_id=1, route_id=None, body='test comment for workout 1 and user 2')
    comment3 = Comment(
        user_id=1, route_id=3, workout_id=None, body='test comment for route 3 and user 1')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
