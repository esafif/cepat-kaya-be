# USER API SPEC

## Register User

Endpoint : POST /api/users

Request Body : 
```json
{
  "username": "blablabla",
  "password": "pasword321",
  "email":"blabla@mail.com"
}
```

Response request : 
```json
{
  "data":{
    "username": "blablabla",
    "name": "user"
  },
  "message":"user created successfuly",
  "status":200
}
```

## Login User

Endpoint : POST /api/users/login

Request Body : 
username = username or email
```json
{
  "username": "blablabla",
  "password": "pasword321",
}
```

Response request : 
```json
{
  "data":{
    "username": "blablabla",
    "name": "user",
    "token": "ini token"
  },
  "message":"success",
  "status":200
}
```

## Get User

Endpoint : GET /api/users/

Request Body : 
id required
```json
{
  "id": "",
}
```

Response request : 
```json
{
  "data":{
    "username": "blablabla",
    "name": "user"
  },
  "message":"success",
  "status":200
}
```

## Logout User

Endpoint : POST /api/users/logout


Response request : 
```json
{
  "data":{},
  "message":"success",
  "status":200
}
```