
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams, Redirect} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnPost from './Post'
const mongoose = require('mongoose');
const s = new Spotify();

const HomePagePosts = () =>{
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     if(user){
       localStorage.setItem('user', JSON.stringify(user));
     }
     
    
     if(user|| JSON.parse(localStorage.getItem('user'))){
// 
     console.log(user);
     console.log(JSON.parse(localStorage.getItem('user')));
     useEffect(initializeState, []);
     function getArtistsPosts( artistidd){
      console.log("Ran getArtistsPosts");
      if(artists &&artists[artistidd] &&artists[artistidd]['posts']!="None"){
       var values= Object.values(artists[artistidd]['posts']);
       if(values.length>=3){
         return values.slice(-3);
       }
       else if(values.length>1){
         return values.slice(-2);
       }
       return values.slice(-1);
       
      }
      else{
        return [];
      }

    }
     function initializeState(){
       for(let i=0; user.favoriteartists;i++){
         
         var arrayRecentArtists = getArtistsPosts(user.favoriteartists[i]);
         console.log(arrayRecentArtists);
        }
        console.log("Ran initialize State");

      }
     return(
  
    <div className="HomepageFeed">
      <Container>
      <Header as='h1' content={"Homepagefeed"} textAlign='center' dividing />
     
      </Container>
    </div> 
   
        )
       }
      else{
        return(<Redirect to="/" push={true} />);
      }
}

export default HomePagePosts;

  