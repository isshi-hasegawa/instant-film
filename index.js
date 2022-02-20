#! /usr/bin/env node
'use strict'

const enquirer = require('enquirer')
const fs = require('fs')
const MovieJs = require("movie.js")
const apiKeyPath = __dirname + '/apikey.txt'

class Main {

  constructor () {
  if (fs.existsSync(apiKeyPath)) {
        fs.readFile(apiKeyPath, (err, data) => {
          this.apiKey = data
          if (err) throw err;
        });
      } else {
        this.apiKey = ''
      }
  }

  async run () {
    if (!fs.existsSync(apiKeyPath)) {
      const answer = await enquirer.prompt({
        type: 'input',
        name: 'key',
        message: 'Please enter your OMDb API key.\n:'
      })
      fs.writeFile(apiKeyPath, answer.key, (error, result)=> {
        if (error) console.log(error)
      })
    this.apiKey = answer.key
    }
    const answer = await enquirer.prompt({
      type: 'input',
      name: 'title',
      message:
        "Please enter the title of the movie you want to know the plot of in English.\nex.『となりのトトロ』=>'My Neighbor Totoro'\n:"
    })
    this.showMovie(answer)
  }

  showMovie(answer) {
    new MovieJs(this.apiKey)
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
