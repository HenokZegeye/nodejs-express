var  express = require('express'),
     app = express(),
     bodyParser = require('body-parser'),
     moongoose = require('mongoose'),
     Comment =  require('./models/comment')
     Campground = require('./models/campgrounds'),
     seedDb = require('./seeds'),
     passport = require('passport'),
     localStrategy = require('passport-local'),
     passportLocalMongoose = require('passport-local-mongoose'),
     user = require('./models/users'),
     methodOverride = require('method-override'),
     flash = require('connect-flash')

     //requiring routes
 var commentRoutes = require('./routes/comments'),
     campgroundRoutes = require('./routes/campgrounds'),
     indexRoutes = require('./routes/index')    

//seedDb;

moongoose.connect("mongodb://localhost/finot_app",{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require('express-session')({
    secret:"Once again Finot makes me good person!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT||8000,function(){
    console.log('server is running')
});