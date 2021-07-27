const Post = require('../models/post');

module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    //Populate the whole user object
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
    
    // return res.render('home', {
    //     title: "Home"
    // });
}


//module.exports.actionName = function(req, res){}