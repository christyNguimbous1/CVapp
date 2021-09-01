const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
const express         = require('express')
const session         = require('express-session');
const hbs             =require('express-handlebars');
const mongoose        =require('mongoose');
const passport        =require('passport');
const localStrategy   =require('passport-local').Strategy;
const bcrypt          = require('bcrypt');
const app             =express();

// mongoose.connect('mongodb://localhost:27017/node-auth-yt',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// });

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        require: true,
    }
});

const User = mongoose.model('User',UserSchema)

//Middleware
app.engine('hbs', hbs({extname: '.hbs'}) );
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret:"verygoodsecret",
    resave:false,
    saveUninitilized:true
}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function (id,done){
    User.findbyId(id, function(err, user){
       done(err, user);
    });
});
passport.use(new localStrategy(function(username, password, done){
    User.findOne({username: username }, function(err, user){
      if (err) return done(err);
      if (!user) return done(null, false, {message:'Incorrect username.' }); 

      bcrypt.compare(password, user.password, function(err, res) {
          if( err) return done(err);

          if(res === false) {return done(null, false, { message: 'Insorrect password.'}); }

          return done(null, user);
      })
    });
}));

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}
//Routes
app.get('/',isLoggedIn, (req, res) =>{
    res.render("index", { title:"Home", });
});
 app.get('/login', (req, res) =>{
     res.render('login',{ title:"Login"} );
 })
app.listen(3000, () => {
    console.log("Listening on port")
});
  
app.post('/login', password.authenticate('local',{
  successRedirect:'/',
  falureRedirect:'/login?erro=true'
}))

//  Setup our admin user
app.get('/setup',async(req, rest) => {
    const exists= await User.exists({username: "admin"});

    if (exists){
      res.redirect('/login');
      return;
    };


  bcrypt.genSalt(10, function (err, salt) {
     if(err) return next(err);
      bcrypt.hash("pass", salt, function(err, hash) {
       if (err) return next(err);
         const newAdmin = new User({
         Username: "admin",
          password: hash
       });
       newAdmin.save();

       res.redirect('/login');
      });
  });
});