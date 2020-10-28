# test_ai

This proyect is for get data from http://localhost:3000/
 - npm install
 - npm run start

1- POST: http://localhost:3000/api/users for register user
{
  "email": "test@gmail.com",
  "password": "12345678"
}
2- get:http://localhost:3000/api/movies/ and post: http://localhost:3000/api/movies/filter/animada
3- GET: http://localhost:3000/chapters/{id_some_season}
{
 "title": "capitulo 4",
  "season": "5f97b47a7905e03a94f42388"
}
4- POST: http://localhost:3000/api/movies/
{
  "title": "cars",
  "gender": "terror"
}
 *here is neccessarry get the token in the url POST: http://localhost:3000/api/login with a user created

