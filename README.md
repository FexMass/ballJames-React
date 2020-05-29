# BallJames front end React

#### Project Explanation: 

An application for uploading game data from two files. One file is XML file which provides structure of the recorded game and CSV file which contains 
all data recorded in 25 frames per second (4 records per second). After uploading files (files need to go under specifed area. XML should go where XML 
is supposed to be uploaded and CSV should go where CSV is supposed to go) we can click on upload and wait for spinner to finish processing data and 
"check game statistics label" will apear, so we can navigate through it to open new window containing game information. That page holds data about 
game itself and couple of inormations about players from coth teams.

## Project Status

Project is developed for Job purposes and its not completed 100%, but it is working properly.

## Installation and Setup Instructions

#### Example:  

Clone/download down this repository. `node` and `npm` needs to be installed globally on your machine.  

Installation:

`npm install`  

For updating packages if needed:

`npm i -g npm-check-updates`

To Start Server:

`npm start` 

To Visit App:

`localhost:3000/home`  or  `localhost:3000/`

To Visit Game information page:

`localhost:3000/gameInformation` 

## Note!

In order for this application to work properly Java/Spring Boot repository "FexMass/ballJames-test" should be cloned/downloded and ran. 

## Reflection

Improvement of this project of course can be done. Better code design, usage of different libraries, etc.
For design matter, this app has simple design just to not be plain and ugly, so design can be improved.
For functionality matter, application have endless possibilities for improvement i that section.

#### Purpose:  

This was less than 1 week long project. His purpose is to demonstrate developer skills for handling Front end.


## Technologies used

 * React
 * React Hooks
 * ES6
 * JavaScript
 * HTML
 * CSS
 * Axios
