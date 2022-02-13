#! /usr/bin/env node
'use strict'

require('dotenv').config()
const enquirer = require('enquirer')
const MovieJs = require("movie.js")
const movies = new MovieJs(process.env.API_KEY);

class Main {
  async run () {
    const answer = await enquirer.prompt({
      type: 'input',
      name: 'movieTitle',
      message:
        "Please enter the title of the movie you want to know the plot of in English. ex.『となりのトトロ』=>'My Neighbor Totoro':"
    })
    movies
      .getByTitle(answer.movieTitle, { plot: 'full' })
      .then((results) => {
        console.log('Title:', results.title)
        results.ratings.forEach((rating)=>{
          if(rating.source === 'Rotten Tomatoes'){
            console.log(rating.value,'%')
          }
        })
        console.log('Plot:', results.plot)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

new Main().run()
