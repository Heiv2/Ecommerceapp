# Nodejs-Ecommerce-App

## Description
This project is an E-Commerce web application built on Node.js, leveraging the power of modern web technologies such as Express.js, EJS, HTML, CSS, Bootstrap, and MongoDB. It provides a comprehensive online shopping experience, where users can browse products, add them to their cart, and proceed to checkout.

## Technologies

<p><strong>Node.js:</strong></p>
Node.js is a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for developing server-side and networking applications. In this project, it serves as the backbone of our server-side logic, handling requests and responses between the client and the server.

<p><strong>Express.js:</strong></p>
Express.js is a minimal, fast, and unopinionated web application framework for Node.js. It provides a simple way to manage routes, handle requests, and send responses. In this application, Express.js manages all the routes for the different pages and API endpoints.


<p><strong>EJS (Embedded JavaScript Templating):</strong></p>
EJS is a simple templating language that generates HTML markup with plain JavaScript. It allows the server-side rendering of JavaScript into HTML, providing a seamless user interface for the client. In this project, EJS is used for creating dynamic HTML templates for the different views in the application.
<br>

<p><strong>HTML/CSS:</strong></p>
HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of a document written in HTML. They are used together in this project to create and style the web pages.
<br>

<p><strong>Bootstrap:</strong></p>
Bootstrap is the most popular CSS framework for developing responsive and mobile-first websites. It provides pre-designed components, which allows faster and easier web development. In this project, Bootstrap is used to ensure the app is mobile-friendly and to provide a clean, intuitive, and sleek user interface.
<br>

<p><strong>MongoDB:</strong></p>
MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. It is used in this application as the primary database to store and retrieve data about users, products, and transactions.
<br>

## Features
<p>This E-commerce application has several key features:</p>

<ul>
  <li><strong>User Registration and Authentication:</strong> Allows new users to create an account and existing users to log in.</li>
  <li><strong>Product Browsing:</strong> Allows users to browse through a list of available products.</li>

## Installation

Here are the steps you can follow to run this application on your local machine:

1. **Clone the repository**
    ```
    git clone https://github.com/Heiv2/Ecommerceapp.git
    
    ```

2. **Navigate to the project directory**
    ```
    cd Ecommerceapp
    ```

3. **Install Node.js**
   Make sure you have [Node.js](https://nodejs.org/en/download/) installed on your system. If you don't have Node.js installed you can go to the official [Node.js website](https://nodejs.org/en/download/) and download the installer.

4. **Install MongoDB**
   This project uses MongoDB as its database. If you don't have MongoDB installed, you can visit the [MongoDB official website](https://www.mongodb.com/try/download/community) and follow the installation instructions there.

5. **Install the dependencies**
   In the project directory, you can run:
    ```
    npm install
    ```
    This command installs all the necessary dependencies required for this project as defined in the `package.json` file.

6. **Set up your environment variables**
   In your `.env` file, add your MongoDB URI and any other environment variables you have used in your project. For example:
    ```
    DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```
     Additionally, this project includes a pre-populated metadata file that you can use to populate your own database for testing purposes.

7. **Start the server**
    ```
    npm start
    ```
    Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

That's it! If you followed all the steps, you should be able to view the application in your web browser.

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>
