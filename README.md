
# Frontend Part

This is the frontend part of the FlimsyTalk, built using React.js.

## Installation

To get started with the project, you need to have Node.js and npm (or yarn) installed. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Nirajiitr/FlimsyTalk.git
cd FlimsyTalk/frontend
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

REACT_APP_PUBLIC_FOLDER = http://localhost:PORT/images/   
###### replace PORT with your server port number

# Backend Project

This is the backend part of the FlimsyTalk, built using Node.js, Express, and MongoDB.

## Installation

To get started with the project, you need to have Node.js and npm installed. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Nirajiitr/FlimsyTalk.git
cd FlimsyTalk/backend
npm install
```

## Available Scripts

In the project directory, you can run:

### `nodemon index.js`

Runs the app in development mode using nodemon. The server will restart if you make edits.

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
MONGO_URI=your_mongodb_uri
JWT_SECRETE_KEY=your_jwt_secret_key
EMAIL=your_email
EMAIL_PASSWORD=your_email_password
```


