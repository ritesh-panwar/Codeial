module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    });
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

