(function() {
 "use strict";
  const SUMMONER_URL = "summoner.php";
  const EVENTS = "?events=";
  const EVENTS_ALL = "all";

 window.addEventListener("load", initialize);

 function initialize() {
   makeRequest(SUMMONER_URL + EVENTS + EVENTS_ALL, loadEvents, checkStatusJSON);
 }
 function loadEvents(responseData) {
   let displayBody = document.getElementById("homepagecontenttable");
   let coverBody = document.createElement("div");
   let coverImg1 = document.createElement("img");
   let coverImg2 = document.createElement("img");
   let coverImg3 = document.createElement("img");
   let premiumBlock = document.querySelectorAll("sc-fzXfPH lgBvYG")
   
 // sc-LzNQc hKWpw class for sorted popular img
 // sc-fzXfPH lgBvYG class for popular artwork link
   coverImg1.classList.add("glitche");
   coverImg1.src = responseData["event1"]["picture"];
   coverBody.appendChild(coverImg1);
   coverBody.appendChild(coverImg2);
   coverImg2.classList.add("glitchebefore");
   coverImg2.src = responseData["event1"]["picture"];
   coverBody.appendChild(coverImg3);
   coverImg3.classList.add("glitcheafter");
   coverImg3.src = responseData["event1"]["picture"];
   // <div id="myCarousel" class="carousel slide" data-ride="carousel">
//     <!-- Indicators -->
//     <ol class="carousel-indicators">
//       <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
//       <li data-target="#myCarousel" data-slide-to="1"></li>
//     </ol>
//
//     <!-- Wrapper for slides -->
//     <div class="carousel-inner" role="listbox">
//       <div class="item active">
//         <img src="https://placehold.it/1200x400?text=IMAGE" alt="Image">
//         <div class="carousel-caption">
//           <h3>Sell $</h3>
//           <p>Money Money.</p>
//         </div>
//       </div>
//
//       <div class="item">
//         <img src="https://placehold.it/1200x400?text=Another Image Maybe" alt="Image">
//         <div class="carousel-caption">
//           <h3>More Sell $</h3>
//           <p>Lorem ipsum...</p>
//         </div>
//       </div>
//     </div>
//
//     <!-- Left and right controls -->
//     <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
//       <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
//       <span class="sr-only">Previous</span>
//     </a>
//     <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
//       <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
//       <span class="sr-only">Next</span>
//     </a>
// </div>
   coverBody.classList.add("maincover");
   displayBody.appendChild(coverBody);
 }

  /**
  *  Makes GET request to specified URL and runs specified function if
  *  request is successful.
  *  @param {String} apiURL - URL that get request is made to
  *  @param {function} successFunction - function to be run if GET request is successful
  */
 function makeRequest(apiURL, successFunction, checkStatus) {
   console.log(apiURL);
   // CORB blocked, need HTML encoding
   // let myHeaders = new Headers();
   // myHeaders.append("X-Content-Type-Options","nosniff");
   // myHeaders.append("Content-Type", "application/json");
   // myHeaders.append("Access-Control-Allow-Origin", "*");
   //  fetch(apiURL, {headers: myHeaders, mode:"cors"})

   fetch(apiURL)
    .then(checkStatus)
    .then(successFunction)
    .catch(console.log);
 }

 /**
* Helper function to return the response's result text if successful, otherwise
* returns the rejected Promise result with an error status and corresponding text
* @param {object} response - response to check for success/error
* @returns {object} - valid result JSON if response was successful, otherwise rejected
*                     Promise result
*/
 function checkStatusJSON(response) {
   if (response.status < 300) {
    console.log("source extracted");
    return response.json();
  } else {
    console.log("source: " + response.json());

    // let profileDisplay = document.getElementById("info-display");
    // let loadingGif = qsa("#info-display img")[0];
    // let errorMessage = document.createElement("div");
    // errorMessage.classList.add("error-message");
    // profileDisplay.removeChild(loadingGif);
    //
    // if (response.status == "429") {
    //   errorMessage.innerText = "ERROR 429: TOO MANY REQUESTS";
    // }
    // else if (response.status == "403") {
    //   errorMessage.innerText = "ERROR 404: EXPIRED API KEY";
    // }
    // else if (response.status == "404") {
    //   errorMessage.innerText = "ERROR 404: SUMMONER NOT FOUND";
    // }
    //
    // else {
    //   errorMessage.innerText = "ERROR" + response.status;
    // }
    profileDisplay.appendChild(errorMessage);
    return Promise.reject(new Error(response.status + ": " + response.statusText));

  }
 }


})();
