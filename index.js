#! /usr/bin/env node
'use strict'

const enquirer = require('enquirer')
const MovieJs = require("movie.js")

class Main {
  async run () {
    const answer = await enquirer.prompt([{
      type: 'input',
      name: 'key',
      message: 'Please enter your OMDb API key.\n:'
    },{
      type: 'input',
      name: 'title',
      message:
        "Please enter the title of the movie you want to know the plot of in English.\nex.『となりのトトロ』=>'My Neighbor Totoro'\n:"
    }])
    this.showMovie(answer)
  }

  showMovie(answer) {
    new MovieJs(answer.key)
      .getByTitle(answer.title, { plot: 'full' })
      .then((results) => {
        console.log('Title:', results.title)
        results.ratings.forEach((rating) => {
          if (rating.source === 'Rotten Tomatoes') {
            console.log('Rotten Tomatoes:', rating.value, '%')
          }
        })
        console.log('Plot:', results.plot)
      })
  }
}

new Main().run()
