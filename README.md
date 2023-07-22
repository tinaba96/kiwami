# Kiwami

- Frontend Repository  
[Frontend](https://github.com/Sauna-Kiwami/kiwami-frontend/tree/main)  

- Backend Repository  
[Backend](https://github.com/Sauna-Kiwami/kiwami-backend/tree/development)


- - -
## Overview
- - -
This is the reservation app for Sauna Business. It was developed for pre-open period (30/11/2022 - 14/12/2022) for the users who were invited to the Sauna (Kiwami) which is located in Nagoya, Japan.


- - -
## Background & Objectives
- - - 
Before the Sauna Business starts, some people who have invested in Crowdfunding have been invited to pre-open sauna. These people recieved the email with an ID for reserving the time for sauna in the pre-open period.
It requires an app which enables people to reserve the time slot in correct time period for those who only have the ID written in the invitation email. (used Google App Script to send to people automatically)


- - - 
## Approach
- - -
This app contains following functions:
- User accounts can be created by their email address
- Able to change their profile such asn email adress
- Reservations can be made with a user account
- Users can start reserving the slot from 8pm 10/11/2022
- Reservation Period is only between 30/11/2022 - 14/12/2022
- 5 time slots per day between 9-23 are available to reserve (2 hours for each time slot)
- 10 reservations is the maximum in each time slot
- Users can visit their personal page to check their reservation.
- Able to cancel the reservation and receive the cancellation email
- Reservation completion e-mail notification
- Remind e-mail notification the day before the reservation
- Admin user can visit the admin page and check all the reserved users with their profiles in each time slots.

I used Firebase for user authentication for them to login to the reservation app. Also I implemented a lot of validation for both frontend and backend such as the limitation of number of reservations in each slots and ID should be invalid if it is already used by other users.
I also considered the cases that same user can reserve multiple times if they have multiple IDs.
What I fucused on is that I tried to implement most of the function in Frontend to prevent the users to make any actions that affects badly on our server side. If a lot of users calls many APIs at the same, the server load can be higher that may leads to the server down. In addition, instead of asking backend for processing or data in Database, I tried to handle that in frontend in order to reduce the API calls and loading time so that I can increase the User Experience. (ex. Disable all the time slots on the same day once the user reserves (calls the API) instead of calling the APIs to check each time slots whether it is available or not)


- - - 
## Result & Conclusion
- - -
More than 500 users visited our app and reserved almost 700 times in total.
All the functions above worked successfully and there was no server down during that period with no security failure.


- - - 
- - - 

# How To



## Development in Local

## Main Tech Stack
- Firebase (for user authentication)
- Mysql5.7
- Reactjs
- Next.js
- Typescript
- Ruby
- Ruby on Rails
- Heroku & vercel (for deployment)


## Architecture
<img width="928" alt="image" src="https://github.com/tinaba96/kiwami/assets/57109730/257a065f-85a2-4759-8720-ae96e29eba2b">



## Demo (SP version)
[demo](https://drive.google.com/file/d/1Om5dcyb7CAjAPm03jB-MlNz_VycCS_IK/view?usp=sharing)
