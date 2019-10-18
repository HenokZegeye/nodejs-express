var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                res.redirect('back')
            }else{
        //check user owns the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
                }else{
                    res.redirect('back');
                }            
            }
        });
    }else{
        res.redirect('back');
    }
    
};

middlewareObj.checkCommentOwnerShip = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect('back')
            }else{
        //check user owns the Comment
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                }else{
                    res.redirect('back');
                }            
            }
        });
    }else{
        res.redirect('back');
    }
    
};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in first");
    res.redirect('/login');
}

module.exports = middlewareObj;