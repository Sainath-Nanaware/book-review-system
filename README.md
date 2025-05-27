# Book Review System

### Project Setup Instructions:

### 1. Clone the repository
### 2. Install dependencies
### 3. Create a .env file
### 4. Run the server

# ----------------------------------------------------------------------------------------
### Example API Requests:

##  User:
### User Registration:  POST http://localhost:4000/user/register
### User Login:         POST http://localhost:4000/user/login

##  Book
### Create Book:     POST http://localhost:4000/books/
### Get All Books:   GET http://localhost:4000/books/books?page=1&limit=8
### Get Single Book: GET http://localhost:4000/books/:id?page=2&limit=3

## Review
### Post Review:    POST http://localhost:4000/review/:id
### Update Review:  PUT http://localhost:4000/review/:id
### Delete Review:  DELETE http://localhost:4000/review/:id

### Search Book
## http://localhost:4000/books/search

# -------------------------------------------------------------------------------------------
### Design Decisions & Assumptions:

## Used JWT for user authentication.
## A user can only review a book once.
## Used Mongoose validation and Joi for input validation.
## Routes are protected using middleware for authenticated access.
## Pagination is implemented on book listing and reviews.


