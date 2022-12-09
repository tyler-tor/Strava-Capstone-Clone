# AKTIV - Strava Clone Project

Welcome to my application where users can view/create/delete Routes and interact by commenting on their own or other's routes.

## How to get started
  1. Copy the code sample into a local repository
  2. Once finished 'pipenv install' to install dependencies
  3. Install Docker If not already make sure to follow instructions here docker.com/products/docker-desktop/
  4. Create a .env file in the root of your project based off of the .env.example
  5. Now create and seed your database using the following
    - pipenv shell
    - flask db migrate
    - flask db upgrade
    - flask seed all
  6. Once that is done confirm you are in the root of your project folder, then run 'flask run'
  7. Now in a new terminal 'cd' into your react-app folder and run 'npm install' so all dependencies will install
  8. Now run 'npm start' to initiate the front end and run the application locally
  9. The application will start at http://localhost:3000/

## Walkthrough of application

### Login Page

![image](https://user-images.githubusercontent.com/93111660/206635657-5c251bf5-85fd-424a-af26-75bdf048ee30.png)
- If you are a existing User with the proper credentials you can login here.

### Signup Page

![image](https://user-images.githubusercontent.com/93111660/206635919-c9aaff96-8475-4008-b5ad-565bf695adb9.png)
- If you are not already a user you can easily signup here to enjoy!

### Landing page after Login/Signup

![image](https://user-images.githubusercontent.com/93111660/206636167-527007ca-312b-4221-9f41-cb3e70ab5752.png)
- Here you have view all created routes and view them individually by following the links.

## Technologies Used:
- JavaScript
- Python
- SqlAlchemy
- React
- Redux
- CSS
- GoogleMaps API
- AWS
- react-google-maps/api
- Flask
- Alembic
- DockerFile
- Postgres
- Git

[![My Skills](https://skills.thijs.gg/icons?i=js,html,css,docker,postgres,nodejs,py,react,git)](https://skills.thijs.gg)
