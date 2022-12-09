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

![image](https://user-images.githubusercontent.com/93111660/206751136-457ed00c-e913-433d-87c1-7fa503d4963f.png)
- If you are a existing User with the proper credentials you can login here.

### Signup Page

![image](https://user-images.githubusercontent.com/93111660/206635919-c9aaff96-8475-4008-b5ad-565bf695adb9.png)
- If you are not already a user you can easily signup here to enjoy!

### Landing page after Login/Signup

![image](https://user-images.githubusercontent.com/93111660/206636167-527007ca-312b-4221-9f41-cb3e70ab5752.png)
- Here you have view all created routes and view them individually by following the links.

### Selecting a individual route on the landing page 

![image](https://user-images.githubusercontent.com/93111660/206751883-43a8c86a-0cbb-49e2-b16d-d6fe3348a44a.png)
- By clicking on the route title you can view the route and it's details

### Viewing a routes page

![image](https://user-images.githubusercontent.com/93111660/206752052-89b31ac5-7e5e-4b25-8a03-c428b6a91e06.png)
- Here you have access to view the route and it's details and also the user that created this route

### Comments on a individual route

![image](https://user-images.githubusercontent.com/93111660/206752229-cbcdae0e-62bd-4cdb-9bea-71452009b496.png)
- A little further down the page you can see comments other users have made as well as produce comments of your own


### Adding a comment

![image](https://user-images.githubusercontent.com/93111660/206752484-01a26160-83c4-4642-81dd-7edc7c14db4b.png)
- By clicking the add comment button you can add a comment and interact with other users

### Editing/Deleting a comment

![image](https://user-images.githubusercontent.com/93111660/206752606-875c7a93-828b-40d8-bad9-185890fd467b.png)
- Selecting the icon to the right of your comment here you will have the option to edit or delete

![image](https://user-images.githubusercontent.com/93111660/206752711-99d90386-3452-43de-ba8a-0267ab1b89b7.png)
- The comment list will update accordingly

![image](https://user-images.githubusercontent.com/93111660/206752786-fe2eea8f-8cb5-4f68-aaa5-b7d836b4a16e.png)

![image](https://user-images.githubusercontent.com/93111660/206752825-9067311a-790b-40e0-b406-dc190cb81bf9.png)


### Adding a route

![image](https://user-images.githubusercontent.com/93111660/206752908-d29d6384-87dd-4d04-b89f-836bfc8fc005.png)
- Using the navbar '+ Route' button this will direct you to adding a new Route


![image](https://user-images.githubusercontent.com/93111660/206753062-6c552431-8de5-4a96-b788-43c215da3aba.png)
- By selecting either 'Set Start Point' or 'Set End Point' This will give you access to place a marker on the map, once all fields are completed it will automatically set your route and the distance of the route

![image](https://user-images.githubusercontent.com/93111660/206753424-cee1d43e-d97c-47cd-8f9a-4f44b4ecc04b.png)
- You also have the ability to set a picture for your route with some information about it.

![image](https://user-images.githubusercontent.com/93111660/206753615-c1ffb5de-74b8-4d87-ad0a-2bc2bd71f844.png)
- Once completed it will redirect you to the homepage where you have access to all routes including your newly created route!

### Editing/Deleting a route

![image](https://user-images.githubusercontent.com/93111660/206753764-431179db-c433-40cc-adb7-f01016e9fe07.png)
- If you are the user that created the route you will have access to edit or delete the desired route.

![image](https://user-images.githubusercontent.com/93111660/206753923-673f8629-e5ae-4e2e-909f-1d3d92153e25.png)
- When selecting to edit a edit modal will be brought up where you can drag your start/end point markers to the desired place and update your route

![image](https://user-images.githubusercontent.com/93111660/206754176-d325716a-3bc0-4c8a-94b0-62e07a7c26c8.png)
- Once completed it will reload the data and show you your updated route

![image](https://user-images.githubusercontent.com/93111660/206754291-a5d915c8-e784-48f5-80d1-165385788791.png)
- If you decide to delete this modal will pop up confirming this is the desired result, if so it will redirect you to the home page to confirm that this route has in fact been deleted

### Viewing a user's profile page

![image](https://user-images.githubusercontent.com/93111660/206754988-e3bdd9bf-c220-47cd-b686-b469fbd184a8.png)
- By Selecting a user's username on a route you will have access to that user's profile page where you can view all those user's routes and visit those routes if so desired.


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
