# wwTest

# Run:
npm run start

# Description

1.  POST:  http://localhost:5000/createStudent
 .json:
{
    "std_name":"Test2",
    "std_email":"test2@gmail.com",
    "std_enrolledIn":"Java",
    "password":"123456"
}

First of all, you have to create a student and need to chose a class. 
2. POST: http://localhost:5000/signin
.json:
{
    "std_email":"test2@gmail.com",
    "password":"123456"
}

Then, signed in with the existing students creadentials.
BodY:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQwOGQ3Mzg3ZDNmNTAzNjRkZGIwMTYiLCJpYXQiOjE2MDc1MDMyNjh9.AqQ2ip1RGt1n6DJHI71dq3hVlL8E2LujAWyDLRc8UVs",
    "student": {
        "_id": "5fd08d7387d3f50364ddb016",
        "std_name": "Test2",
        "std_email": "test2@gmail.com"
    }
}

You will get a json web token.
3. GET: http://localhost:5000/afterStudentLoggedIn
Headers:
Key: Authorization 
value : "Bearer  " "token"
BodY:
hello logged in student

4. POST: http://localhost:5000/stdEnrollClass
 .json:
Headers:
Key: Content-Type
Value: application/json
Key: Authorization 
value : "Bearer  " "token"
.json:
{
    "class_name":"Express.JS"
}

Body:
{
    "clas": {
        "_id": "5fd08e0b87d3f50364ddb018",
        "class_name": "Express.JS",
        "class_enrolledBy": {
            "_id": "5fd08d7387d3f50364ddb016",
            "std_name": "Test2",
            "std_email": "test2@gmail.com",
            "std_enrolledIn": "Node.JS",
            "password": "$2b$12$JMbIU8c07J.XfLi81Ib8IeybWd8S6i4.QGK2/Tiwl2jq67ro3q7.S",
            "__v": 0
        },
        "__v": 0
    }
}

 5. GET: http://localhost:5000/classAndStudent
Body:
[
    {
        "_id": "5fd08df787d3f50364ddb017",
        "class_name": "Node.JS",
        "class_enrolledBy": {
            "_id": "5fd08d7387d3f50364ddb016",
            "std_name": "Test2",
            "std_email": "test2@gmail.com",
            "std_enrolledIn": "Node.JS"
        },
        "__v": 0
    },
    {
        "_id": "5fd08e0b87d3f50364ddb018",
        "class_name": "Express.JS",
        "class_enrolledBy": {
            "_id": "5fd08d7387d3f50364ddb016",
            "std_name": "Test2",
            "std_email": "test2@gmail.com",
            "std_enrolledIn": "Node.JS"
        },
        "__v": 0
    }
]

 6. GET http://localhost:5000/allposts/Express.JS
Body:
[
    {
        "_id": "5fd08d3887d3f50364ddb015",
        "class_name": "Express.JS",
        "__v": 0
    },
    {
        "_id": "5fd08e0b87d3f50364ddb018",
        "class_name": "Express.JS",
        "class_enrolledBy": {
            "_id": "5fd08d7387d3f50364ddb016",
            "std_name": "Test2",
            "std_email": "test2@gmail.com",
            "std_enrolledIn": "Node.JS"
        },
        "__v": 0
    }
]
 
