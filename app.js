//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to Blogger, a platform for Blog on Science and technology. Our blog is a place where you can come to read about science technology and much more, discover new insights, and join a community of like-minded individuals who share your interests. We believe that writing blog is more than just a hobby or a passing interest – it's a way of life. That's why we're dedicated to providing our readers with the latest news, tips, and trends related to science and technology. Whether you're a seasoned expert or just getting started, there's something for everyone on our blog. At Blogger, we're committed to creating a space where you can connect with others who share your passion for science and technology. That's why we encourage you to join the conversation by leaving comments, sharing your own experiences, and engaging with our community on social media. We believe that knowledge is power, and that by sharing information and insights with one another, we can all grow and learn together. That's why we're constantly updating our blog with new content, including articles, interviews, reviews, and more. So whether you're looking for practical advice, inspiring stories, or just a good read, you'll find it all here at Blogger. Thank you for visiting our blog, and we hope you'll stick around and become a part of our community!";

const aboutContent = "At Blogger, we are passionate about technology and its ability to transform the world around us. Our mission is to provide our readers with up-to-date and insightful information on the latest trends and developments in the world of technology. Our team of experienced writers and experts are dedicated to delivering high-quality content that informs, educates, and inspires our readers. From the latest gadgets and devices, to emerging technologies such as AI and blockchain, we cover a wide range of topics to provide our readers with a comprehensive view of the technology landscape. We believe in the power of technology to bring people together and create positive change. That's why we are committed to promoting responsible and ethical use of technology, and to exploring the ways in which technology can be harnessed to solve some of the world's most pressing challenges. We also value our community of readers and encourage open dialogue and engagement. Whether you're a technology enthusiast, a professional in the field, or simply curious about the latest tech developments, we welcome you to join our community and share your thoughts and insights. Thank you for visiting Blogger, and we hope you find our content informative, engaging, and thought-provoking.";

const contactContent = "We are always happy to hear from our readers and welcome any feedback or suggestions you may have. You can contact us via email, social media, or by filling out the contact form on our website.If you have any inquiries regarding advertising, partnerships, or other business-related matters, please contact us at rupakchimakurthi1811@gmail.com .We strive to respond to all inquiries as quickly as possible, but please allow up to 48 hours for a response. Thank you for your interest in Blogger, and we look forward to hearing from you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/blogWeb");

const postSchema = {
  postTitle: String,
  postBody: String
}

const Post = mongoose.model("Post",postSchema);

// let posts = [];

app.get("/", function(req, res){
  Post.find({}, function(err, posts){

    res.render("home", {
 
      startingContent: homeStartingContent,
 
      posts: posts
 
      });
 
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  })

  // posts.push(post);
  console.log(post);
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res){
  const requestedId = (req.params.postId);

  Post.findOne({_id:requestedId}, function(err,post){
    if(!err){
      res.render("post",{
        title: post.postTitle,
        content: post.postBody
      })
    }
  })

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.postTitle);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.postTitleitle,
  //       content: post.postBody
  //     });
  //   }
  // });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
