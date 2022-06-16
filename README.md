# MERN-SHOP
https://mernmegashopapp.herokuapp.com
Working prototype of e-commerce web application using MongoDB, Express, React, NodeJs, Redux, etc.
The web-app has working shopping cart feature with PayPal & credit/debit payments
Registered users can buy products and leave ratings
There are features that are only available to admin users
Products are presented using pagination
Products can be searched by keywords
Top rated products are presented in the carousel
Authorization and authentication is performed using JWT which is stored and transmitted via httponly cookie to avoid XSS attack. Still vulnerable to CSRF attack which is a room for future improvements
In the future, the code will be re-written using redux-toolkit to avoid tedious work. Also, backend could be written using Spring and MongoDB could be replaced with relational PostgreSQL database.
