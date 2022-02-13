#! /usr/bin/env node
'use strict'

require('dotenv').config()
const enquirer = require('enquirer')
const omdb = require('omdb-js')(process.env.OMDB_KEY)

class Main {
  async run () {
    const answer = await enquirer.prompt({
      type: 'input',
      name: 'movieTitle',
      message:
        "Please enter the title of the movie you want to know the plot of in English. ex.『となりのトトロ』=>'My Neighbor Totoro':"
    })
    omdb
      .getSpecificMovie(answer.movieTitle, null, { plot: 'full' })
      .then((results) => {
        if (results.Response === 'False') {
          return console.log('Movie not found!')
        }
        console.log('Title:', results.Title)
        if (results.Ratings.length === 3) {
          console.log('Tomatometer:', results.Ratings[1].Value)
        }
        console.log('Plot:', results.Plot)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

new Main().run()
