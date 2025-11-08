# Sayan Dev Portfolio  
**COMP.7214 - Client Server Web Development (Assignment 3)**  
**Student:** Sayan Khadka  
**Programme:** Bachelor of Applied Information Technology  
**Institute:** Toi Ohomai Institute of Technology, Tauranga, New Zealand  


## Overview  

**Sayan Dev Portfolio** is a full-stack personal portfolio web application developed for **Assignment 3 - Client Server Web Development**.  
The system demonstrates the integration of **Angular (frontend)**, **Express (backend)**, and **MongoDB (database)** - implementing a complete client–server communication model with RESTful APIs and real-time data rendering.  

This portfolio serves as both a professional showcase and a demonstration of technical capability, including dynamic project display, contact form with email delivery, and resume download functionality.

## Objectives  

- Demonstrate full-stack integration (Angular + Express + MongoDB)  
- Implement dynamic RESTful API communication  
- Enable database-driven portfolio data  
- Add functional email contact using SMTP  
- Produce a deployment-ready and responsive web application  
- Document architecture and structure for academic assessment  


## Folder Structure  

```text
sayan-dev-portfolio/
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   └── dist/
│       └── client/
│           └── browser/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── public/
│   │   │   ├── projects/
│   │   │   └── resume/
│   │   ├── index.js
│   │   └── seed.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Environment Configuration  

Create a `.env` file inside the **/server** folder and add the following:

```text
NODE_ENV=development
PORT=8080
MONGO_URI=<your MongoDB Atlas connection string>
SMTP_HOST=<your smtp host>
SMTP_PORT=587
SMTP_USER=<your smtp user>
SMTP_PASS=<your smtp password>
CONTACT_TO=<your email address>
CLIENT_ORIGIN=http://localhost:4200

```

## Setup and Execution  

### 1. Install Dependencies  

```text
cd client
npm install
```
```text
cd ../server
npm install
```

### 2. Seed the Database
Populate MongoDB with initial data:

```text
cd server
node src/seed.js
```
Expected output:
MongoDB Connected ✅ and ✅ Seeding completed successfully!

### 3. Run Development Servers
Start Angular frontend:

```text
cd client
npm start
```

Start Express backend:
```text
cd server
npm run dev
```
Access the site at:
http://localhost:4200

Deployment-Ready Integration
After building the Angular app:

```text
cd client
npm run build
```
The compiled build is stored in:
client/dist/client/browser

The Express server is configured to automatically serve these static files in production:

```text
js

const clientDist = path.join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser');
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});
```
This makes the application fully deployable to Vercel, Render, or Heroku.

## Functional Components
### 1. Portfolio Data API
Fetches profile, projects, and skills from MongoDB using Mongoose models, displayed dynamically in Angular.

### 2. Contact Form
Posts messages to /api/contact/submit and sends real emails using Nodemailer with SMTP authentication.

### 3. Resume Download
Endpoint /api/resume/download serves the PDF stored in /server/src/public/resume/.

### 4. YouTube Integration
Displays subscriber count and featured videos dynamically fetched from MongoDB.

### 5. Static Asset Hosting
All images and PDFs are served securely from /server/src/public.

## Technology Stack
**Frontend**
- Angular 18
- TypeScript
- SCSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Other Tools**
- Nodemailer (for contact form)
- Helmet, Morgan, CORS, Rate Limiting (for security)
- Environment variables via dotenv
- EJS disabled - using pure JSON API

## Security and Optimization
- CORS and Helmet configured for secure communication

- Rate limiter prevents excessive API calls

- Sensitive data hidden via .env variables

- Angular build optimized for production

## Learning Outcomes
- Implementation of full client-server communication

- Development of RESTful APIs with database integration

- Email functionality using Nodemailer

- Static file hosting and deployment setup

- Code organization and documentation best practices

## Future Enhancements
- Admin panel for adding/updating projects

- Authentication with JWT for admin access

- Database message logging for contact form

- Cloud deployment and CI/CD setup

```text
Author
Name: Sayan Khadka
Student ID: 30073793
Course: COMP.7214 - Client Server Web Development
Programme: Bachelor of Applied Information Technology
Institution: Toi Ohomai Institute of Technology, Tauranga, New Zealand
YouTube: https://www.youtube.com/@sayan_k211
```