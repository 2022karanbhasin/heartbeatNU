const router = require('express').Router();
const configg=require('../configure.js')
const request = require('request')

let User = require('../models/user.model');
let Spotify =require('spotify-web-api-node');
var spotifyApi = new Spotify({
    clientId:'75dfedc5f2d847e7bfad7f2da2f9c611',
    clientSecret: process.env.NODE_ENV == 'production' ? process.env.SECRETKEY :configg,
    redirectUri: process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/callback` : `http://localhost:8888/users/callback`
});

router.route('/login').get((req,res)=>{
    var scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-top-read', 'user-library-read'];
    var state='spotify_auth_state';
    var url = spotifyApi.createAuthorizeURL(scopes, state);

    res.redirect(url);
});
router.route('/callback').get((req,res)=>{

      // The code that's returned as a query parameter to the redirect URI
      var code = req.query.code;
      
      // Retrieve an access token and a refresh token
      spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
      
          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
        },
        function(err) {
          console.log('Something went wrong!', err);
        }
      );
});

// route to display all users.
router.route('/').get((req,res)=>{
    User.find()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').get((req,res)=>{
    
      var temp=false;
      if( req.query )
      {
        temp=true;
        // s.setAccessToken(req.query.accesstoken)
      }

    //getting display name
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + req.query.access_token },
        json: true
      };


      request.get(options, function(error, response, body) {
        console.log("this is the display name")
        console.log(body.display_name);
      });

      //// gettting top artists
    var options = {
        url: 'https://api.spotify.com/v1/me/top/artists',
        headers: { 'Authorization': 'Bearer ' + req.query.access_token },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log("this is not using the API")
         var ids = body.items.map(item=>item.id)
         temp.push(ids)
      });
var ids=[]
      // get currently playing song
      var options = {
        url: 'https://api.spotify.com/v1/me/player',
        headers: { 'Authorization': 'Bearer ' + req.query.access_token },
        json: true
      };
      var nameofsong=""
    //   request.get(options, function(error, response, body) {
    //     console.log("this is not using the API")
    //      nameofsong = body.item.name
    //      temp.push(body.item.name)
    //   });

    //   console.log(temp);
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(`"name":${displayname}, "topartists":${ids},"nowplaying":${nameofsong}, ${temp[0]}`);
    // console.log(temp);

    // res.send(name);

    // const newUser=new User(displayname,);
    // newUser.save()
    // .then(()=>res.json('User Added!'))
    // .catch(err=>res.status(400).json('Error: '+err));

})

module.exports=router;