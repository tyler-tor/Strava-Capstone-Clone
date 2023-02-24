from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=3, route_id=None, workout_id=2, body="Andy loved to sleep on a bed of nails.")
    comment2 = Comment(
        user_id=2, workout_id=1, route_id=None, body="That must be the tenth time I've been arrested for selling deep-fried cigars.")
    comment3 = Comment(
        user_id=1, route_id=None, workout_id=5, body="He decided to live his life by the big beats manifesto.")
    comment4 = Comment(
        user_id=4, route_id=None, workout_id=3, body="We have never been to Asia, nor have we visited Africa.")
    comment5 = Comment(
        user_id=5, route_id=None, workout_id=4, body="It didn't make sense unless you had the power to eat colors.")
    comment6 = Comment(
        user_id=1, route_id=None, workout_id=5, body="Pantyhose and heels are an interesting choice of attire for the beach.")
    comment7 = Comment(
        user_id=2, route_id=None, workout_id=3, body="She always speaks to him in a loud voice.")
    comment8 = Comment(
        user_id=3, route_id=None, workout_id=1, body="He said he was not there yesterday; however, many people saw him there.")
    comment9 = Comment(
        user_id=4, route_id=None, workout_id=2, body="I never knew what hardship looked like until it started raining bowling balls.")
    comment10 = Comment(
        user_id=5, route_id=None, workout_id=4, body="It's always a good idea to seek shelter from the evil gaze of the sun.")
    comment11 = Comment(
        user_id=1, route_id=None, workout_id=6, body="The lyrics of the song sounded like fingernails on a chalkboard.")
    comment12 = Comment(
        user_id=2, route_id=None, workout_id=7, body="A good example of a useful vegetable is medicinal rhubarb.")
    comment13 = Comment(
        user_id=3, route_id=None, workout_id=8, body="After exploring the abandoned building, he started to believe in ghosts.")
    comment14 = Comment(
        user_id=4, route_id=None, workout_id=9, body="Waffles are always better without fire ants and fleas.")
    comment15 = Comment(
        user_id=5, route_id=None, workout_id=10, body="I liked their first two albums but changed my mind after that charity gig.")
    comment16 = Comment(
        user_id=1, route_id=None, workout_id=7, body="Malls are great places to shop; I can find everything I need under one roof.")
    comment17 = Comment(
        user_id=2, route_id=None, workout_id=10, body="He stomped on his fruit loops and thus became a cereal killer.")
    comment18 = Comment(
        user_id=3, route_id=None, workout_id=6, body="Wisdom is easily acquired when hiding under the bed with a saucepan on your head.")
    comment19 = Comment(
        user_id=4, route_id=None, workout_id=8, body="You bite up because of your lower jaw.")
    comment20 = Comment(
        user_id=5, route_id=None, workout_id=9, body="I want a giraffe, but I'm a turtle eating waffles.")
    comment21 = Comment(
        user_id=1, route_id=20, workout_id=None, body="I love bacon, beer, birds, and baboons.")
    comment22 = Comment(
        user_id=2, route_id=19, workout_id=None, body="The elephant didn't want to talk about the person in the room.")
    comment23 = Comment(
        user_id=3, route_id=18, workout_id=None, body="The glacier came alive as the climbers hiked closer.")
    comment24 = Comment(
        user_id=4, route_id=17, workout_id=None, body="I've never seen a more beautiful brandy glass filled with wine.")
    comment25 = Comment(
        user_id=5, route_id=16, workout_id=None, body="The rain pelted the windshield as the darkness engulfed us.")
    comment26 = Comment(
        user_id=1, route_id=15, workout_id=None, body="So long and thanks for the fish.")
    comment27 = Comment(
        user_id=2, route_id=14, workout_id=None, body="Tomorrow will bring something new, so leave today as a memory.")
    comment28 = Comment(
        user_id=3, route_id=13, workout_id=None, body="There's no reason a hula hoop can't also be a circus ring.")
    comment29 = Comment(
        user_id=4, route_id=12, workout_id=None, body="The beauty of the sunset was obscured by the industrial cranes.")
    comment30 = Comment(
        user_id=5, route_id=11, workout_id=None, body="He had decided to accept his fate of accepting his fate.")
    comment31 = Comment(
        user_id=1, route_id=10, workout_id=None, body="I've always wanted to go to Tajikistan, but my cat would miss me.")
    comment32 = Comment(
        user_id=2, route_id=9, workout_id=None, body="I met an interesting turtle while the song on the radio blasted away.")
    comment33 = Comment(
        user_id=3, route_id=8, workout_id=None, body="Boulders lined the side of the road foretelling what could come next.")
    comment34 = Comment(
        user_id=4, route_id=7, workout_id=None, body="He loved eating his bananas in hot dog buns.")
    comment35 = Comment(
        user_id=5, route_id=6, workout_id=None, body="He didn't want to go to the dentist, yet he went anyway.")
    comment36 = Comment(
        user_id=1, route_id=5, workout_id=None, body="Everything was going so well until I was accosted by a purple giraffe.")
    comment37 = Comment(
        user_id=2, route_id=4, workout_id=None, body="I met an interesting turtle while the song on the radio blasted away.")
    comment38 = Comment(
        user_id=3, route_id=3, workout_id=None, body="The thunderous roar of the jet overhead confirmed her worst fears.")
    comment39 = Comment(
        user_id=4, route_id=2, workout_id=None, body="The underground bunker was filled with chips and candy.")
    comment40 = Comment(
        user_id=5, route_id=1, workout_id=None, body="Nancy decided to make the porta-potty her home.")
    comment41 = Comment(
        user_id=1, route_id=1, workout_id=None, body="The external scars tell only part of the story.")
    comment42 = Comment(
        user_id=2, route_id=2, workout_id=None, body="Dan ate the clouds like cotton candy.")
    comment43 = Comment(
        user_id=3, route_id=3, workout_id=None, body="She opened up her third bottle of wine of the night.")
    comment44 = Comment(
        user_id=4, route_id=4, workout_id=None, body="Her hair was windswept as she rode in the black convertible.")
    comment45 = Comment(
        user_id=5, route_id=5, workout_id=None, body="I like to leave work after my eight-hour tea-break.")
    comment46 = Comment(
        user_id=1, route_id=6, workout_id=None, body="Nancy was proud that she ran a tight shipwreck.")
    comment47 = Comment(
        user_id=2, route_id=7, workout_id=None, body="I really want to go to work, but I am too sick to drive.")
    comment48 = Comment(
        user_id=3, route_id=8, workout_id=None, body="His get rich quick scheme was to grow a cactus farm.")
    comment49 = Comment(
        user_id=4, route_id=9, workout_id=None, body="They throw cabbage that turns your brain into emotional baggage.")
    comment50 = Comment(
        user_id=5, route_id=10, workout_id=None, body="Traveling became almost extinct during the pandemic.")
    comment51 = Comment(
        user_id=1, route_id=11, workout_id=None, body="Trash covered the landscape like sprinkles do a birthday cake.")
    comment52 = Comment(
        user_id=2, route_id=12, workout_id=None, body="She was too short to see over the fence.")
    comment53 = Comment(
        user_id=3, route_id=13, workout_id=None, body="More RVs were seen in the storage lot than at the campground.")
    comment54 = Comment(
        user_id=4, route_id=14, workout_id=None, body="He was the type of guy who liked Christmas lights on his house in the middle of July.")
    comment55 = Comment(
        user_id=5, route_id=15, workout_id=None, body="The ants enjoyed the barbecue more than the family.")
    comment56 = Comment(
        user_id=1, route_id=16, workout_id=None, body="The secret code they created made no sense, even to them.")
    comment57 = Comment(
        user_id=2, route_id=17, workout_id=None, body="We have never been to Asia, nor have we visited Africa.")
    comment58 = Comment(
        user_id=3, route_id=18, workout_id=None, body="We have a lot of rain in June.")
    comment59 = Comment(
        user_id=4, route_id=19, workout_id=None, body="He had a vague sense that trees gave birth to dinosaurs.")
    comment60 = Comment(
        user_id=5, route_id=20, workout_id=None, body="He liked to play with words in the bathtub.")

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add_all([
        comment4,
        comment5,
        comment6,
        comment7,
        comment8,
        comment9,
        comment10,
        comment11,
        comment12,
        comment13,
        comment14,
        comment15,
        comment16,
        comment17,
        comment18,
        comment19,
        comment20,
        comment21,
        comment22,
        comment23,
        comment24,
        comment25,
        comment26,
        comment27,
        comment28,
        comment29,
        comment30,
        comment31,
        comment32,
        comment33,
        comment34,
        comment35,
        comment36,
        comment37,
        comment38,
        comment39,
        comment40,
        comment41,
        comment42,
        comment43,
        comment44,
        comment45,
        comment46,
        comment47,
        comment48,
        comment49,
        comment50,
        comment51,
        comment52,
        comment53,
        comment54,
        comment55,
        comment56,
        comment57,
        comment58,
        comment59,
        comment60
    ])
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
