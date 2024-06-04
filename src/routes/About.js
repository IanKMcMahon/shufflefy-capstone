/**Provides relevant background info and expands the Homepage's function beyond just a landing page*/


import React from "react";
import { NavLink } from "react-router-dom";
import './About.css'


const AboutUs = () => {
return(
    <div className="info-box">
        <p>
            Do you ever play a Spotify playlist on shuffle and you're seemingly still listening to the same songs over and over again despite having thousands of songs saved in your library? Yeah me too. That's why I created Shufflefy. We're a free service that allows you to upload your Spotify playlist and make changes to it -- including a one-time shuffle -- all inside of a simple, modern single-page-application. Once you've shuffled to your hearts content and removed all those songs you saved 10 years ago, You can simply export your playlist back to Spotify through their backend web API and start listening immediately. Enjoy your music in truly random order without the headache of Spotify's shuffle algorithm. <b>Enjoy Shufflefy!</b>
        </p>
        <br></br>
        <NavLink to="/" className={'back-to-home'}>Go Back </NavLink>
    </div>
) 
}

export default AboutUs;