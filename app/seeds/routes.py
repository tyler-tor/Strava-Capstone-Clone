from app.models import db, Route, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_routes():
    route1 = Route(
        user_id=3,
        title='Woah look at these views!',
        description='Decided to take a long bike ride and enjoyed the view',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/1.jpg',
        start_lat=40.13623451097302,
        start_lng=-111.51741027832031,
        end_lat=40.148609331587394,
        end_lng=-111.4701564221499,
        traveling_mode='BICYCLING',
        distance='16.2 km')
    route2 = Route(
        user_id=2,
        title='Fun Times',
        description='Glad I was able to get out today',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/2.jpg',
        start_lat=41.66586261307326,
        start_lng=-111.10544730275784,
        end_lat=41.6543202528191,
        end_lng=-111.07986975759182,
        traveling_mode='BICYCLING',
        distance='10 km')
    route3 = Route(
        user_id=1,
        title='Lets get it',
        description='How could you not love this?',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/3.jpg',
        start_lat=48.54159342341892,
        start_lng=-117.78206890151162,
        end_lat=48.58975931934812,
        end_lng=-117.79854839369912,
        traveling_mode='WALKING',
        distance='15.9 km')
    route4 = Route(
        user_id=4,
        title='Cmon now',
        description='Got after it today, success',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/4.jpg',
        start_lat=39.4017526773127,
        start_lng=-105.50341155598821,
        end_lat=39.37309543495405,
        end_lng=-105.43200042317571,
        traveling_mode='WALKING',
        distance='10.4 km')
    route5 = Route(
        user_id=5,
        title='Rough one',
        description='Got it but was rough today.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/5.jpg',
        start_lat=38.961504091372106,
        start_lng=-106.27951084629564,
        end_lat=38.82896973404329,
        end_lng=-106.28637730137376,
        traveling_mode='WALKING',
        distance='23.4 km')
    route6 = Route(
        user_id=1,
        title='Very hilly',
        description='Lots of elevation today',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/6.jpg',
        start_lat=33.86444617138348,
        start_lng=-93.08407749165694,
        end_lat=33.89180954826349,
        end_lng=-92.97421421040694,
        traveling_mode='WALKING',
        distance='16 km')
    route7 = Route(
        user_id=2,
        title='Good Weather',
        description='Such nice weather, glad I was able to enjoy.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/7.jpg',
        start_lat=37.02886944696474,
        start_lng=-84.2431640625,
        end_lat=37.074917309117666,
        end_lng=-84.23875418988248,
        traveling_mode='WALKING',
        distance='16.6 km')
    route8 = Route(
        user_id=3,
        title='Cooooooold',
        description='Super cold out was difficult today',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/8.jpg',
        start_lat=47.104905381532575,
        start_lng=-110.67921345639526,
        end_lat=47.11612110043876,
        end_lng=-110.58582966733276,
        traveling_mode='WALKING',
        distance='20.9 km')
    route9 = Route(
        user_id=4,
        title='Nice Views',
        description='This hike produced great views.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/9.jpg',
        start_lat=44.326810692068875,
        start_lng=-71.7520500669418,
        end_lat=44.256034851125015,
        end_lng=-71.8728996763168,
        traveling_mode='WALKING',
        distance='16.6 km')
    route10 = Route(
        user_id=5,
        title='Wildlife everywhere',
        description='Glad I brought the bear spray.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/10.jpg',
        start_lat=35.89240509796169,
        start_lng=-77.3660637388168,
        end_lat=35.91020357101724,
        end_lng=-77.6077629575668,
        traveling_mode='WALKING',
        distance='28.8')
    route11 = Route(
        user_id=1,
        title='Lake hike',
        description='Able to enjoy a nice dip in the lake.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/11.jpg',
        start_lat=48.06783995662273,
        start_lng=-98.95938768073135,
        end_lat=48.023771406912275,
        end_lng=-98.78360643073135,
        traveling_mode='WALKING',
        distance='26.6 km')
    route12 = Route(
        user_id=2,
        title='Group hike',
        description='Met up for a group hike today.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/12.jpg',
        start_lat=41.31082388091823,
        start_lng=-122.0526123046875,
        end_lat=41.29904412200889,
        end_lng=-121.98394068112788,
        traveling_mode='WALKING',
        distance='12.4 km')
    route13 = Route(
        user_id=3,
        title='Breaking out the MTB',
        description='Tough but was nice to get out.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/13.jpg',
        start_lat=34.30780334554731,
        start_lng=-110.63271082005355,
        end_lat=34.27149572593679,
        end_lng=-110.56679285130355,
        traveling_mode='BIKING',
        distance='23.7 km')
    route14 = Route(
        user_id=4,
        title='Long road bike',
        description='Able to enjoy the fresh air on the road bike.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/14.jpg',
        start_lat=32.49190370569448,
        start_lng=-97.44911707005355,
        end_lat=32.547486174893194,
        end_lng=-96.94374597630355,
        traveling_mode='BIKING',
        distance='63 km')
    route15 = Route(
        user_id=5,
        title='Jump day',
        description='Took the MTB on the track today.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/15.jpg',
        start_lat=38.46091222396728,
        start_lng=-90.66443115679557,
        end_lat=38.39205816876799,
        end_lng=-90.57654053179557,
        traveling_mode='BIKING',
        distance='26.6 km')
    route16 = Route(
        user_id=1,
        title='Nice downhill action',
        description='Trails were super wet today great to get out.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/16.jpg',
        start_lat=42.705699785408115,
        start_lng=-112.18669480259999,
        end_lat=42.64108001647478,
        end_lng=-112.03288620884999,
        traveling_mode='BIKING',
        distance='27.1')
    route17 = Route(
        user_id=2,
        title='Family ride',
        description='Nice neighborhood ride today.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/17.jpg',
        start_lat=41.713638201386495,
        start_lng=-79.1337817934853,
        end_lat=41.730038252964526,
        end_lng=-78.8261646059853,
        traveling_mode='BIKING',
        distance='42.1 km')
    route18 = Route(
        user_id=3,
        title='Beach ride',
        description='Wanted to see what all the fuss was about',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/18.jpg',
        start_lat=30.051820931978586,
        start_lng=-85.44529119074306,
        end_lat=29.99474769925928,
        end_lng=-85.37937322199306,
        traveling_mode='BIKING',
        distance='42.5 km')
    route19 = Route(
        user_id=4,
        title='Trail riding',
        description='Some steep long trails today, much enjoyment today.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/19.jpg',
        start_lat=41.885480680038604,
        start_lng=-98.69740970199531,
        end_lat=41.787255980931036,
        end_lng=-98.45571048324531,
        traveling_mode='BIKING',
        distance='30.1 km')
    route20 = Route(
        user_id=5,
        title='Lunch ride',
        description='Glad to get away from the desk for a bit.',
        image_url='https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/strava+pictures/routes/20.jpg',
        start_lat=47.96010630337556,
        start_lng=-94.47865970199531,
        end_lat=47.930670036336366,
        end_lng=-94.32485110824531,
        traveling_mode='BIKING',
        distance='13.1 km')

    db.session.add(route1)
    db.session.add(route2)
    db.session.add(route3)
    db.session.add_all([
        route1,
        route2,
        route3,
        route4,
        route5,
        route6,
        route7,
        route8,
        route9,
        route10,
        route11,
        route12,
        route13,
        route14,
        route15,
        route16,
        route17,
        route18,
        route19,
        route20
    ])
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
