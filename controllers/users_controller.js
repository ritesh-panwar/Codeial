const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            }
            return res.redirect('/users/sign-in'); 
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.posts = function(req, res){
    res.end('<h1>All Your Posts are here!</h1>');
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}


//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//Get the signup data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user in signing up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in finding the user in signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log("User Already Exist!");
            return res.redirect('back');
        }
    });


}

//Sign In and create a session for the user
module.exports.createSession = function(req, res){
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user in signing-in');
            return;
        }
        if(user){
            //handle password which don't match
            if(user.password != req.body.password){
                console.log("Incorrect Password!");
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            console.log(user.id);
            return res.redirect('/users/profile');
        }
        else{
            console.log("User Not Found!");
            return res.redirect('back');
        }
    });

}