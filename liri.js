const twitter = require('twitter');
const spotify = require('spotify');
const omdbApi = require('omdb-client');
const fs = require('fs');
const keys = require('./keys.js');
const twitterAccess = keys.twitterKeys;
const input = process.argv[2];

switch (input) {
    case "my_tweets":
        var params = { screen_name: 'noelannparisi' };
        twitterAccess.get('statuses/user_timeline', 'count:20', function(error, tweets, response) {
            if (!error) {
                for (tweet in tweets) {
                    console.log("You tweeted:", tweets[tweet].text, " on", tweets[tweet].created_at + "\n\n");
                    fs.appendFile('log.txt', tweets[tweet].text+tweets[tweet].created_at, 'utf8', err =>{
                        console.log('All done!');
                    });
                }
            }
        });
        break;
        //if no song is provided then your program will default to
        //"The Sign" by Ace of Base
    case "spotify-this-song":
        // https://api.spotify.com/v1/search?query=I+want+it+that+way&type=track&offset=0&limit=20
        const songName = process.argv[3];
        spotify.search({ type: 'track', query: "'" + songName + "'" }, function(err, data) {
            if (songName === undefined) {
                fs.appendFile('log.txt', 'They did not type in a song...', 'utf8', err => {
                    console.log('All done!');
                });
                console.log("You didn't tell me a song...How about this one?");
                console.log("Song: The Ace");
                console.log("Artist: Ace of Base");
                console.log("Album: The Sign (US Album)");
                console.log("Preview link: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=null");
            } else if (!err){
                console.log("Song: " + songName);
                console.log("Artist:", data.tracks.items[0].artists[0].name);
                console.log("Album: ", data.tracks.items[0].album.name);
                console.log("Preview link: " + data.tracks.items[0].preview_url);
                fs.appendFile('log.txt', songName+'\n'+data.tracks.items[0].artists[0].name+'\n'+data.tracks.items[0].album.name+'\n'+data.tracks.items[0].preview_url, 'utf8', err => {
                    console.log('All done!');
                });
            } else {
                console.log('err');
            }
        });
        break;

    case "movie-this":
        const movieTitle = process.argv[3];
        if (movieTitle === undefined) {
            fs.appendFile('log.txt', 'They did not type in a movie!', 'utf8', err => {
                console.log('All done!');
            });
            console.log("Looks like you didn't type in a movie!");
            console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!!");
            console.log("Here's it's specs...");
            console.log('Movie title: Mr. Nobody \nYear released: 2009\nIMDB Rating: 7.9 \nCountry produced: Belgium, Germany, Canada, France\nPrimary language: English, Mohawk \nPlot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he does not choose, anything is possible. \nActors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham \nRotten Tomatoes : 64% \nRotten Tomatoes Link: http://www.rottentomatoes.com/m/mr-nobody/');
        } else {
            var params = {
                title: movieTitle,
                incTomatoes: true
            }
            omdbApi.get(params, function(err, data) {
                if (!err) {
                    fs.appendFile('log.txt', data.Title+'\n'+data.Year+'\n'+data.imdbRating+'\n'+data.Country+'\n'+data.Language+'\n'+data.Plot+'\n'+data.Actors, 'utf8', err => {
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
        }
        break;

    case "do-what-it-says":
        data.Actors
        fs.readFile('/Users/NoelParisi/Desktop/liri/liri-node-app/random.txt', "utf8", function(err, data) {
            var dataArr = data.split(',');
            const songName = dataArr[1];
            spotify.search({ type: 'track', query: "'" + songName + "'" }, function(err, data) {
                if (!err) {
                    fs.appendFile('log.txt', songName+'\n'+data.tracks.items[0].artists[0].name+'\n'+data.tracks.items[0].album.name+'\n'+data.tracks.items[0].preview_url, 'utf8', err => {
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
