var mongoose = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment')

    var data = [
        {
            name:"Somewhere",
            image:"somewhere.jpg",
            description:"I don't know any campground, that is why I said somewhere"
        },
        {
            name:"Nowhere",
            image:"Nowhere.jpg",
            description:"I don't know any campground, that is why I said Nowhere"
        }
    ]

function seedDB(){
    //Campground.remove({},function(err){
        /*if(err){
            console.log(err);
        }
        console.log('everything is removed');
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a compund");
                    Comment.create(
                        {
                            text:"How can i give comment about a place which doesn't even exist",
                            author:"Henok"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Comment Created");
                            }
                    });
                }
            });
        });*/
    //});
}

module.exports = seedDB();