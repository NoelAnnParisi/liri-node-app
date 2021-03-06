const twitter = require('twitter');
const spotify = require('spotify');
const omdbApi = require('omdb-client');
const inquirer = require('inquirer');
const fs = require('fs');
const keys = require('./keys.js');
const twitterAccess = keys.twitterKeys;
//use inquirer to obtain command from user

//all responses will be recorded to log.txt file 
inquirer.prompt([{
    type: 'list',
    name: 'userCommand',
    message: "What do you want Liri to do?",
    choices: ['my_tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
}]).then(answer => {
    //depending on what they choose liri will do something!
    switch (answer.userCommand) {
    //retrieve 20 most recent tweets
    case "my_tweets":
        var params = { screen_name: 'noelannparisi' };
        twitterAccess.get('statuses/user_timeline', 'count:20', function(error, tweets, response) {
          if (!error) {
            for (tweet in tweets) {
              console.log("You tweeted:", tweets[tweet].text, " on", tweets[tweet].created_at + "\n\n");
              fs.appendFile('log.txt', tweets[tweet].text + tweets[tweet].created_at, 'utf8', err => {
                if (err) {
                  console.log('All done!');
                }
              });
            }
          }
        });
        break;

    //search for a song!
    case "spotify-this-song":
        //https://api.spotify.com/v1/search?query=I+want+it+that+way&type=track&offset=0&limit=20
        inquirer.prompt([{
          type: 'input',
          //if they don't type in anything this song's info will display
          default: 'The Sign, Ace of Base',
          name: 'song',
          message: "What song do you want to look up?"
        }]).then(answer => {
            //retreive their query and search for it using spotify's API
            const songName = answer.song;
            spotify.search({ type: 'track', query: "'" + answer.song + "'" }, function(err, data) {
            if (!err) {
              console.log("Song: " + answer.song);
              console.log("Artist:", data.tracks.items[0].artists[0].name);
              console.log("Album: ", data.tracks.items[0].album.name);
              console.log("Preview link: " + data.tracks.items[0].preview_url);
              fs.appendFile('log.txt', answer.song + '\n' + data.tracks.items[0].artists[0].name + '\n' + data.tracks.items[0].album.name + '\n' + data.tracks.items[0].preview_url, 'utf8', err => {
                  console.log('All done!');
              });
            } else {
              console.log('err');
            }
          });
        })
      break;
        //retreive movie information of a particular movie
    case "movie-this":
        inquirer.prompt([{
          type: 'input',
          //if they don't type in anything this movie's info will display
          default: 'Mr. Nobody',
          name: 'movieTitle',
          message: "What movie do you want to look up?"
      }]).then(answer => {
          //retreive their query and search for movie's stats using ombdApi
          const params = {
            title: answer.movieTitle,
            incTomatoes: true
          }
          omdbApi.get(params, function(err, data) {
            if (!err) {
              fs.appendFile('log.txt', data.Title + '\n' + data.Year + '\n' + data.imdbRating + '\n' + data.Country + '\n' + data.Language + '\n' + data.Plot + '\n' + data.Actors, 'utf8', err => {
                console.log('All done!');
              });
              console.log("Movie title: " + data.Title);
              console.log("Year released: " + data.Year);
              console.log("IMDB Rating: " + data.imdbRating);
              console.log("Country produced: " + data.Country);
              console.log("Primary language: " + data.Language);
              console.log("Plot: " + data.Plot);
              console.log("Actors: " + data.Actors);
              if (data.Ratings[1]) {
                console.log(data.Ratings[1].Source + " : " + data.Ratings[1].Value);
              } else {
                console.log("Rotten Tomatoes Score: " + data.tomatoRating);
              }
              console.log("Rotten Tomatoes Link: " + data.tomatoURL);
          } else {
              console.log(err);
          }
        });
      });
      break;

        //this will do what is says on the random.txt file (purpose: practice reading from files)
    case "do-what-it-says":
        fs.readFile('/Users/NoelParisi/Desktop/liri/liri-node-app/random.txt', "utf8", function(err, data) {
          var dataArr = data.split(',');
          const songName = dataArr[1];
          spotify.search({ type: 'track', query: "'" + songName + "'" }, function(err, data) {
            if (!err) {
              fs.appendFile('log.txt', songName + '\n' + data.tracks.items[0].artists[0].name + '\n' + data.tracks.items[0].album.name + '\n' + data.tracks.items[0].preview_url, 'utf8', err => {
                console.log('All done!');
              });
              console.log("Song: " + songName);
              console.log("Artist:", data.tracks.items[0].artists[0].name);
              console.log("Album: ", data.tracks.items[0].album.name);
              console.log("Preview link: " + data.tracks.items[0].preview_url);
            }
          })
        })
      break;
    }

})