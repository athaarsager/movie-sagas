# PROJECT NAME

Weekend Movie Sagas

## Description

_Duration: 1 Weekend_

This project is a CRUD app that is all about using redux sagas to handle requests to the backend and practicing table joins in SQL.

I was given a database with three tables: one for movies, one for genres, and an intermediary table that stored the relationship between movies and their genres. The project contains several pages: one displaying the list of movies along with their posters, a page for viewing movie details, a page for editing those movie details, and a page for adding a new movie for display. In order to make these pages functional, I had to use redux sagas to handle the backend requests. Along with this, I had to make a table join query in order to make the GET request function properly and make multiple queries in a single request in the case of the POST and PUT.

My own personal challenge on this project was to get a better handle on Material UI, especially with form input validation. By working through this project I was able to get a better grasp on how the different MUI components work together and managed to get the input validation working with some additional research and help from ChatGPT. 

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
How does someone use this application? Tell a user story here.

1. xxx
2. xxx
3. xxx
4. xxx
5. xxx
6. xxx


## Built With

List technologies and frameworks here

## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)
