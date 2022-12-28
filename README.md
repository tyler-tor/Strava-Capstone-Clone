# AKTIV - Strava Clone Project

Welcome to my application where users can view/create/delete Routes and interact by commenting on their own or other's routes.

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

![image](https://user-images.githubusercontent.com/93111660/206814749-25bbbcee-e081-4694-83dc-af19fbad4e81.png)
- Here you have view all created routes and view them individually by following the links.

### Selecting a individual route on the landing page

![image](https://user-images.githubusercontent.com/93111660/206814828-33509729-f9a9-451c-ab0c-170da4d191cd.png)
- By clicking on the route title you can view the route and it's details

### Viewing a routes page

![image](https://user-images.githubusercontent.com/93111660/206814876-8656f201-5d83-49f1-b59f-102547810e7c.png)
- Here you have access to view the route and it's details and also the user that created this route

### Comments on a individual route

![image](https://user-images.githubusercontent.com/93111660/206814899-59a0df07-7d0c-4cbf-92fa-ddef14120889.png)
- A little further down the page you can see comments other users have made as well as produce comments of your own


### Adding a comment

![image](https://user-images.githubusercontent.com/93111660/206814913-f21bf8be-396e-443f-9a6b-85bf77732251.png)
- By clicking the add comment button you can add a comment and interact with other users

### Editing/Deleting a comment

![image](https://user-images.githubusercontent.com/93111660/206814975-a876bb93-2b61-4fa3-97d3-d1ba103667dd.png)
- Selecting the icon to the right of your comment here you will have the option to edit or delete

![image](https://user-images.githubusercontent.com/93111660/206815044-cae32ffd-8739-458e-b4da-6fa019bbe9d2.png)
- The comment list will update accordingly


### Adding a route

![image](https://user-images.githubusercontent.com/93111660/206815110-f5ad8ec1-46df-4e2e-b3d0-639054cffef6.png)
- Using the navbar '+ Route' button this will direct you to adding a new Route


![image](https://user-images.githubusercontent.com/93111660/206815481-c963c8cc-2133-4490-a22b-a76667ba59e5.png)
- By selecting either 'Set Start Point' or 'Set End Point' This will give you access to place a marker on the map, once all fields are completed it will automatically set your route and the distance of the route

- You also have the ability to set a picture for your route with some information about it.

- Once completed it will redirect you to the homepage where you have access to all routes including your newly created route!

### Editing/Deleting a route

![image](https://user-images.githubusercontent.com/93111660/206816067-8ac431f4-fc27-48bc-a114-e7d9786c9fd6.png)
- If you are the user that created the route you will have access to edit or delete the desired route.

![image](https://user-images.githubusercontent.com/93111660/206815971-5d969558-dd1c-42cc-bc9b-bfe4c4230b38.png)
- When selecting to edit a edit modal will be brought up where you can drag your start/end point markers to the desired place and update your route

- Once completed it will reload the data and show you your updated route

![image](https://user-images.githubusercontent.com/93111660/206816320-b8c6b22b-cbcb-4e46-9702-514b638c1202.png)
- If you decide to delete this modal will pop up confirming this is the desired result, if so it will redirect you to the home page to confirm that this route has in fact been deleted

### Viewing a user's profile page

![image](https://user-images.githubusercontent.com/93111660/206754988-e3bdd9bf-c220-47cd-b686-b469fbd184a8.png)
- By Selecting a user's username on a route you will have access to that user's profile page where you can view all those user's routes and visit those routes if so desired.

