# Random Video Generator
A web-application which generates & plays random videos fetched from the YouTube Data API. Tags can also be added to narrow results generated from the API to a specific category.

Users can also create an account to save random videos they have viewed.

## Technology Stack
This application is built with the following tools in TypeScript:

### Front-End
* [React](https://reactjs.org/)
* [Mantine](https://mantine.dev/)

### Back-end
* [Node](https://nodejs.dev/)
* [Express](https://expressjs.com/)
* [PostgreSQL](Postgresql.org)
* [TypeORM](https://typeorm.io/)

## Running the Application Locally

### Starting up the Server
You will need to provide a `.env` file in the following format for a `PostgreSQL` database connection and API keys for YouTube Data.

```sh
DB_USERNAME="your_username"
DB_PASSWORD="your_password"
DB_HOST="your_host"
DB_DATABASE="your_dbname"
DB_PORT="your_port"
SALT="rounds for bcrypt"
EKEY="encryption key for jwt"
YOUTUBE_API_KEY="your_api_key"
```

Once this is added, then you can run the application server as follows:
```sh
1. cd server
2. npm install
3. npm run start
```

### Starting up the Client
```sh
1. cd client
2. npm install
3. npm run dev
```