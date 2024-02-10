const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET all movies:

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// GET details of single movie:
router.get("/:id", (req, res) => {
  const movieId = req.params.id;

  // Use STRING_AGG to combine multiple rows into one. Otherwise, will get multiple rows of the same movie if it has multiple genres
  // JSON_AGG is another great alternative if I want the combined rows to be an array I can iterate over
  const queryText = `
  SELECT "movies"."title", "movies"."poster", "movies"."description", STRING_AGG("genres"."name", ', ') AS "genres" FROM "movies"
  JOIN "movies_genres" ON "movies_genres"."movie_id" = "movies"."id"
  JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."title", "movies"."poster", "movies"."description";
  `;
  pool.query(queryText, [movieId])
    .then(result => {
      // Need to send the result back to store for updating then rendering
      res.send(result.rows);
    })
    .catch(error => {
      console.error("ERROR in server GET for movie details:", error);
      res.sendStatus(500);
    });

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

// Router for updating movie information
router.put("/:id", (req, res) => {
  const movieId = req.params.id;

  // First query to edit movie information
  const queryText = `
  UPDATE "movies" SET "title" = $1, "poster" = $2, "description" = $3
  WHERE "id" = $4;
  `;

  const updateMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description,
    movieId
  ]
  pool.query(queryText, updateMovieValues)
    .then(result => {
      // Second query to update movie genres
      const genreQuery = `
    UPDATE "movies_genres" SET "genre_id" = $1
    WHERE "movie_id" = $2;
    `;

      pool.query(genreQuery, [req.body.genre_id, movieId])
        .then(result => {
          res.sendStatus(200);
        }).catch(error => {
          console.error("ERROR in server genre PUT:", error);
          res.sendStatus(500);
        });
    }).catch(error => {
      console.error("ERROR in server movie PUT:", error);
      res.sendStatus(500);
    });
})

module.exports = router;
