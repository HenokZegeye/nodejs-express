var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');
var middleware = require('../middleware');

//show all campgrounds
router.get('/',middleware.isLoggedIn,function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});     
        }
    });
});

// Create - create a new campground
router.post('/',middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name,image:image,description:desc,author:author};
    
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
    
});

// new - display a form to create a new campground
router.get('/new',middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//show detail of a campground
router.get('/:id',function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});
//edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnerShip,function(req,res){
        Campground.findById(req.params.id, function(err,foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});   
        });
});

//update campground

router.put('/:id',middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findOneAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        }else{
            console.log(updatedCampground);
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});
//destroy route
router.delete('/:id',middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds')
        }
    });
});


module.exports = router;