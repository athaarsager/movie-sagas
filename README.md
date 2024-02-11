# PROJECT NAME

Weekend Movies Saga

## Description

_Duration: 1 Weekend_

This project is a CRUD app that is all about using redux sagas to handle requests to the backend and practicing table joins in SQL.

I was given a database with three tables: one for movies, one for genres, and an intermediary table that stored the relationship between movies and their genres. The project contains several pages: one displaying the list of movies along with their posters, a page for viewing movie details, a page for editing those movie details, and a page for adding a new movie for display. In order to make these pages functional, I had to use redux sagas to handle the backend requests. Along with this, I had to make a table join query in order to make the GET request function properly and make multiple queries in a single request in the case of the POST and PUT.

One additional challenge that came up was to keep the movie information displayed in the inputs on the "edit" page upon refresh. In order to achieve this, I had to store the page's local state in local memory, which is then accessed upon page reload.

My own personal goal on this project was to get a better handle on Material UI, especially with form input validation. By working through this project I was able to get a better grasp on how the different MUI components work together and managed to get the input validation working with some additional research and help from ChatGPT. 

## Screen Shot

![Main Movie List Page](./public/Screenshots/Screenshot%202024-02-11%20at%209.24.11 AM.png)

![Movie Details Page](./public/Screenshots/Screenshot%202024-02-11%20at%209.24.51 AM.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named `saga_movies_weekend`
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. Click the link given by `npm run client` to open a new tab with the running project!

## Usage

1. The home page displays a list of movies and their posters. Click on any movie card to go to a page with details about the movie.
2. On the movie details page, there is an edit button which will take you to a screen where you can edit the movie's information.
3. When you are done editing, hit the "save" button and a popup confirming the success of the edit will display, and you will be taken back to the movie details page, which will now display the updated information
4. All screens have a back button that will take you to the previous page.
5. On the home page again, you can click the "add movie" button to be taken to a screen where you can add a new movie.
6. In order to add a new movie, you must completely fill out the form on the "add movie" page. Hit the "save" button when you are done, and a popup will display confirming that the movie was added. You will be taken back to the home page. Important note: if the image url you submit is too long, the confirmation will still display, but the movie will not be added. Save the image to your local computer for best results.


## Built With

* React
* Redux
* Postgres
* Express
* Axios
* Material UI

## Acknowledgements

Thank you to Emerging Digital Academy for equipping me with the knowledge, resources, and support to make this application!

## Support
If you have suggestions or issues, please email me at [athaarsager@gmail.com]
