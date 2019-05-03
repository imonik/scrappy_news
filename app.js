var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var axios = require("axios");

var PORT = 3000;
var app = express();

app.use(express.static("public"));
app.use(bodyParser());

//Database configuration

var databaseUrl = 'scrappy_news_db';
var collection = ['articles'];

//Hook mongojs to db variable 
var db = mongojs(databaseUrl, collection);
//log any mongo hs errors to the console

db.on('error',function(error) {
    console.log("Database Error:", error); 
});

app.get('/', function(req, res) {
  res.render('pages/index');
});

// Retrieve data from the db
app.get("/articles", function(req, res) {
    // Find all results from the articles collection in the db
    db.articles.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });

app.get("/scrape", function (req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://news.ycombinator.com/").then(function (response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $(".title").each(function (i, element) {
      // Save the text and href of each link enclosed in the current element
      var headLine = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
      // If this found element had both a title and a link
      if (!(headLine && link)) {
        // Insert the data in the scrapedData db
        return;
      }

      db.articles.findOne({ link: link }, function (error, found) {
        if (found) {
          console.log('The article already exists in the db! ', found.headLine);
        } else {
          db.articles.insert({
            headLine: headLine,
            summary: 'sjhdhd',
            link: link
          }, function (err, inserted) {
              if (error) console.log("An error ocurred when adding an article:", err);
              else console.log("(NEW) Article added to the db:", inserted.headline);
          });
        }
      });
    });
  });
  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

   //update a frog
  //curl -d "comments=comments,comments,comments" -X PUT http://localhost:3000/article/5cc904b10b73042ae05d34d6
  app.put("/article/:id", function(req, res) {
    console.log('Add comment route called.')
    db.articles.findAndModify({
      query: {
        "_id": mongojs.ObjectId(req.params.id)
      },
      update: { $push: {
        "comments": req.body.comments}
      },
      new: true
      }, function (err, updatedFrogDocument) {
          if (err) console.log(err);
          else console.log('Comment added to article with id', req.params.id)
          res.json(updatedFrogDocument);
      });
  });
/*  
    curl -X DELETE http://localhost:3000/articles/5cc288d471a416daebc0d4d6/
  */
 app.delete("/article/:id", function(req, res) {
    var id = req.params.id;
    db.articles.remove({
      "_id": mongojs.ObjectID(id)
    }, function(error, removed) {
      if (error) {
        res.send(error);
      }else {
        res.json(id);
      }
    });
  });
  
// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});