# Assignment 3

Name:MD Abdullah Al Noman <br>
ID: WEB6-3280 <br>

## Project: Car Wash Management System

<p>A small management system to manage User car wash bookings and services.Here Admin can add services and create slots.User can select service and slot.</p>

## Frameworks and Dependencies

<ul>
    <li>Typescript</li>
    <li>Mongoose</li>
    <li>Zod Validator</li>
    <li>bcrypt (Password encryption)</li>
    <li>cors(2.8.5)</li>
    <li>dotenv(16.4.5)</li>
    <li>express(4.19.2)</li>
    <li>http-status(1.7.4)</li>
    <li>jsonwebtoken(9.0.2)</li>
    <li>mongodb(6.7.0)</li>
</ul>

## Coding Pattern and Features

<ul>
    <li>Moduler Pattern</li>
    <li>Authentication</li>
    <li>Authorization</li>
</ul>

## API Endpoints

[*Accessable by Both User and Admin*]

1. SignUp : /api/auth/signup (POST)
2. LogIn : /api/auth/login(POST)
3. Get available slots: /api/slots/availability (GET) <br>
   Query Params :
   date: (Optional) The specific date for which available slots are requested (format: YYYY-MM-DD).
   serviceId: (Optional) ID of the service for which available slots are requested.

4. Get All Services: /api/services(GET)
5. Get a Service: /api/services/:id(GET) params:id

[*Accessable by Admin Only*]

1. Create Service: /api/services (POST)
2. Update Services : /api/services/:id (PUT)
   params:id
3. Delete a Service: /api/services/:id (DELETE) [SOFT DELETE ]
   params:id
4. Create Slot: /api/services/slots(POST)
5. Get All Bookings: /api/bookings(GET)

[*Accessable by User only*]

1. Book a Service : /api/bookings(POST)
2. Get User's Bookings: /api/my-bookings(GET)

## Live Link :

    vercel: https://assignment-3-five-chi.vercel.app/

## Postman API Documentation Link:

    Published link: https://documenter.getpostman.com/view/30756775/2sA3XQhNDW
