
# Devcamper API

Backend API for the DevCamper apllication which is part of the Brad Traversy udemy course. This can be used to manage bootcamps, courses, reviews, users and authentication

## Indices

* [Authetication](#authetication)

  * [Forgot Password](#1-forgot-password)
  * [Get Logged In User via Token](#2-get-logged-in-user-via-token)
  * [Login User](#3-login-user)
  * [Logout User](#4-logout-user)
  * [Register User](#5-register-user)
  * [Reset Password](#6-reset-password)
  * [Update Details](#7-update-details)
  * [Update Password](#8-update-password)

* [Bootcamps](#bootcamps)

  * [Create a Bootcamp](#1-create-a-bootcamp)
  * [Delete Bootcamp](#2-delete-bootcamp)
  * [Get All Bootcamps](#3-get-all-bootcamps)
  * [Get Single Bootcamp](#4-get-single-bootcamp)
  * [Update Single Bootcamp](#5-update-single-bootcamp)
  * [Upload Photo](#6-upload-photo)

* [Courses](#courses)

  * [Create Course](#1-create-course)
  * [Delete Course](#2-delete-course)
  * [Get All Courses](#3-get-all-courses)
  * [Get Courses For Bootcamp](#4-get-courses-for-bootcamp)
  * [Get Single Course](#5-get-single-course)
  * [Update Course](#6-update-course)


--------


## Authetication
Routes for user authentication including register. login, forget password, etc



### 1. Forgot Password


Route to generate reset password token and send an email


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTFhMjk3ZWNiMTBiNTU1MGZlMWI1MiIsImlhdCI6MTYyNTQwOTU1OSwiZXhwIjoxNjI4MDAxNTU5fQ.m2qRb9gjApTEWWbFb9Xq79LWrcHBWoaO3V1m5s2pUXo |  |



***Body:***

```js        
{
    "email" : "john@gmail.com"
}
```



### 2. Get Logged In User via Token



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{  
    "email" : "xyz@gmail.com",
    "password" : "12345678"   
}
```



### 3. Login User


Login user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTFhMjk3ZWNiMTBiNTU1MGZlMWI1MiIsImlhdCI6MTYyNTQwOTU1OSwiZXhwIjoxNjI4MDAxNTU5fQ.m2qRb9gjApTEWWbFb9Xq79LWrcHBWoaO3V1m5s2pUXo |  |



***Body:***

```js        
{  
    "email" : "jd@gmail.com",
    "password" : "123456"   
}
```



### 4. Logout User


Route to log user out and clear cookie


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/auth/logout
```



### 5. Register User


Add user to database with encrypted password


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name" : "Adithya",
    "email" : "xyz@gmail.com",
    "password" : "12345678",
    "role" : "publisher"
}
```



### 6. Reset Password


Reset password using token sent via email


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/cd33ec426132ac922abe97c9d00a62da73c36217
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "password" : "123457"
}
```



### 7. Update Details


Route to update name and email of user logged in


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name" : "John",
    "email" : "jd@gmail.com"
}
```



### 8. Update Password


Route to update password by giving current and new passwordss


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "currentPassword": "123457",
    "newPassword" : "123456"
}
```



## Bootcamps
Bootcamps CRUD functionality



### 1. Create a Bootcamp


Create a Bootcamp and add it to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Modern Tech Bootcamp 1",
		"description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
		"website": "https://devworks.com",
		"phone": "(111) 111-1111",
		"email": "enroll@devworks.com",
		"address": "233 Bay State Rd Boston MA 02215",
		"careers": ["Web Development", "UI/UX", "Business"],
		"housing": true,
		"jobAssistance": true,
		"jobGuarantee": false,
		"acceptGi": true
}
```



### 2. Delete Bootcamp


Delete Bootcamp from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/bootcamps/60e1fc276b2dfe9b507c8ed9
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Get All Bootcamps


Fetch all bootcamps from dB. Includes pagination, filtering , etc


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/
```



### 4. Get Single Bootcamp


Fetch single bootcamp by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/1
```



### 5. Update Single Bootcamp


Update a single bootcamp using id


***Endpoint:***

```bash
Method: PUT
Type: 
URL: {{URL}}/api/v1/bootcamps/1
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Upload Photo


Route to upload a bootcamp photo


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/photo
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



## Courses
Create, Update and Delete courses.



### 1. Create Course


Add a course for a specific bootcamp


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title": "Front End Web Development",
		"description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
		"weeks": 8,
		"tuition": 8000,
		"minimumSkill": "beginner",
		"scholarhipsAvailable": true
}
```



### 2. Delete Course


Delete course from database


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/courses/5d725c84c4ded7bcb480eaa0
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "tuition" : 13000,
    "minimumSkill" : "advanced"
}
```



### 3. Get All Courses


Get all courses from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get Courses For Bootcamp


Get all the courses for a specific bootcamp.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 5. Get Single Course


Get single course from database given an id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses/5d725cfec4ded7bcb480eaa4
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Update Course


Update a course in the database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/courses/5d725c84c4ded7bcb480eaa0
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "tuition" : 13000,
    "minimumSkill" : "advanced"
}
```



---
[Back to top](#devcamper-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-07-05 20:39:28 by [docgen](https://github.com/thedevsaddam/docgen)
