const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    try {
        //Populate the whole user object
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error", err);
        return;
    }
    
    // return res.render('home', {
    //     title: "Home"
    // });
}


//module.exports.actionName = function(req, res)