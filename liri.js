// my-tweets
// This will show your last 20 tweets 
//and when they were created at in your terminal/bash window.
const twitter = require('twitter');
const keys = require('./keys.js');
const twitterAccess = keys.twitterKeys;
// console.log(twitterAccess);
if (process.argv[2] === "my_tweets") {
    var params = { screen_name: 'noelannparisi' };
    twitterAccess.get('statuses/user_timeline', 'count:20', function(error, tweets, response) {
        if (!error) {
            for (tweet in tweets) {
                console.log("You tweeted:", tweets[tweet].text, " on", tweets[tweet].created_at + "\n\n");
            }
        }
    });
}

// spotify-this-song
//This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//if no song is provided then your program will default to
//"The Sign" by Ace of Base

// movie-this
//This will output the following information to your terminal/bash window:
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
//   * Rotten Tomatoes Rating.
//   * Rotten Tomatoes URL.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

// do-what-it-says
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it 
//to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.
