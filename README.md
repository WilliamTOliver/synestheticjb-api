# SJB API - A Sample Portfolio Piece by William T Oliver

##### Prerequisites to Dev on a Forked Version of this Project

First, install [SailsJS](http://sailsjs.com/) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install sails -g

Second, npm install from the project folder:

    npm install

Third, do a find-replace-all in your text or code editor for:

    localhost:8081
    For me this was the location of my client. Replace it and the associated deployed server location and keep them in mind as you switch between production and local. 

    
### Start the development server

This command serves the app at `http://localhost:1337` and provides basic URL
routing for the app:

    sails lift


