# news-explorer-backend
This repository contains the backend API of the NewsExplorer project that features user authorization and user registration and handles articles and users.Using RESTful API design standards, this was developed with NodeJS and ExpressJS. All user data is stored using MongoDB loaded onto the server. The API is deployed on a Google Cloud virtual machine and reverse proxy is controlled using NGINX.

## Endpoint of the API
https://api.news.karenzhou.me/

## Running the project
git clone repository_url — to clone the repository locally.

npm install — to install all the dependencies.

npm run start — to launch the server.

npm run dev — to launch the server with the hot reload feature.

Note: the project will run in the development mode, the production mode need the .env file.

## API endpoints
POST /signup — Register new user

POST /signin — Login the user

GET /users/me — Get current user info

GET /articles — Get current user saved articles

POST /articles — Save user article

DELETE /articles/:articleId — Delete user article
