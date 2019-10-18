var moongoose = require('mongoose');

var CampgroundSchema = new moongoose.Schema({
    name: String,
    image: String,
    description: String,
    author:{
        id:{
            type:moongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type: moongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports= moongoose.model("Campground",CampgroundSchema);