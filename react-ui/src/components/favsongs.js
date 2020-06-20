
import React, {useState, useEffect, isValidElement} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const mongoose = require('mongoose');
const s = new Spotify();
const FavoriteSongs = ({accesstoken, songs, refreshtoken}) =>{
     const [songnames,setNames]= useState([]);
     const [songimages, setImages]=useState([]);
     var array = [...Array(20).keys()];
     const [indexarray, setIndex]=useState(array);
     
     s.setAccessToken(accesstoken);
     useEffect(initializeState, []);
     var temp = [];
     var temp2 = [];
    function initializeState() {
            for(let i = 0; i<songs.length; i++){
                //     console.log("This is songs",songs)
             s.getTrack(songs[i]).then(
                     res => {
                             temp.push(res.name);
                             temp2.push(res.album.images[0].url);
                        //      console.log("Inside then")
                        //      console.log(res);
                        //      console.log(temp);
                             if(temp.length==20){
                                setNames(temp);
                                setImages(temp2);
                             }
                            
                     }).catch(err=>console.log(err));
     }
//      console.log(temp);
//      console.log(temp2);
//      setNames(temp);
//      setImages(temp2);
     

}
    
     const ReturnFavSong=({id}) =>{
        var songName=songnames[id];
        var imageurl=songimages[id];
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
        //      console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={8} id={id}> 
                        <Link to={`/track/${songs[id]}`} >
                        <Image size='huge' rounded fluid verticalAlign='middle' src={imageurl} />
                        <Header  size='massive'>{songName}</Header>
                        </Link>
                        
                        <br></br>
                </Grid.Column>);
       }
        else{
                // console.log(imageurl)
                return "null";
        }
     }
     function returnSecondFavSong(id){
        var songName=songnames[id];
        var imageurl=songimages[id];
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
        //      console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                        <Link to={`/track/${songs[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='huge'>{songName}</Header>
                        </Link>
                        <br></br>
                </Grid.Column>);
       }
        else{
                // console.log(imageurl)
                return "null";
        }
     }
     function returnThirdFavSong(id){
        var songName=songnames[id];
        var imageurl=songimages[id];
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
        //      console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                         <Link to={`/track/${songs[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='large'>{songName}</Header>
                        </Link>
                        <br></br>
                </Grid.Column>);
       }
        else{
                // console.log(imageurl)
                return "null";
        }
     }
     
//      console.log(artistnames)
     return(
    <div className="FavoriteArtists ">
           
            
                
        <Header  size='huge'>Top Songs</Header>

        <Grid.Row >  
        {songimages.length > 15 ? indexarray.slice(0,2).map(id=><ReturnFavSong key = {id.toString()} id={id} />) : ""}
        </Grid.Row>
       
        <Grid.Row >  
        {songimages.length > 15 ? indexarray.slice(2,4).map(id=><ReturnFavSong key = {id.toString()}  id={id} />) : ""}
        </Grid.Row>
        
        <Grid.Row >  
        {songimages.length > 15 ? indexarray.slice(4,6).map(id=><ReturnFavSong key = {id.toString()}  id={id} />) : ""}
        </Grid.Row>
     
         <Grid.Row>  
        {songimages.length > 15 ? indexarray.slice(6,10).map(id=>returnSecondFavSong(id)):""}
        </Grid.Row>
       
        <Grid.Row>  
        {songimages.length > 19 ? indexarray.slice(10,14).map(id=>returnSecondFavSong(id)):""}
        </Grid.Row>
        
        <Grid.Row>  
        {songimages.length > 19 ? indexarray.slice(14,21).map(id=>returnThirdFavSong(id)):""}
        </Grid.Row> 
        
      
    </div> 
   
        )
}

export default FavoriteSongs;