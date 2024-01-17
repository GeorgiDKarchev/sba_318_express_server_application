Creating an Expresss Server Application:

The application consist of main page , login page , users content page , orders content page and products content page.
The maine page is listing HATEOS  links to each of the get request pages and the login page. 
The login page has a login form, wich requires user's e-mail and password.
The orders page is listing all current orders(id,userId, order # coresponding to a product)
The users page is listing all curent users(id, name , username,email).
The products page is listing all products:(id, section, kind, brand).

The methods used for users data are:
POST, GET, PATCH, DELETE.
The post method is allowing us to add new user to the DB.
The PATCH method is editing users data and the DELETE method is deleting.

The application also allows users to be listed by ID.

The methods used for orders are: PATCH and GET.

The application allows  each order to be listed with the corresponding users data.

In the application are implemented also :
-multiple middleware
-error handling middleware
-3 different data categories are used ( users, orders, products)
-Get routs created for orders,products, users.
-Post routs created for users
-Patch rout created for users and orders
-Delete route created for users.
-Rendered login form view


