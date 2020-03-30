chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // const premiumBlock = document.querySelectorAll("sc-pmjoL gdTQse")
  const premiumBlock = document.querySelectorAll("div div section div aside")

  // const popularImages = document.querySelectorAll(".sc-fzocqA.jLbcpr img")
  const popularImages = document.querySelectorAll("ul li div div div a div img")

  // const popularImageDivs = document.querySelectorAll(".sc-fzpdyU.eQptyb")
  const popularImageDivs = document.querySelectorAll("ul li div div div a div")

  const searchTag = document.querySelector(".sc-qPZPj.kNDoln")
  // alert(popularImageDivs.length)
  let popularImageLinks = []
  let popularThumbnails = []
  for (i = 0; i < 4; i++) {
    popularImageLinks.push(popularImageDivs[i].href)
    popularThumbnails.push(popularImages[i].src)
    // alert(popularImageLinks[i])
  }
  let imageFavorites = []
  // for each(var i in popularImageDivs){
  //   imageFavorites.push(makeRequest(i.href, retrieveFavorites, checkStatusJSON))
  // }

  sendResponse({links: popularImageLinks,
                thumbnails: popularThumbnails,
                tag: searchTag,
                allthumbnails: popularImages,
                alllinks: popularImageDivs,
                allbookmarkcounts: imageFavorites})
})

function retrieveFavorites(responseData) {
  return responseData["bookmarkCount"]
}

// 3-24
// sc-fzonZV rebfy  sorted popular img
// sc-fzppip kQRslZ img link

// 3-23
// sc-pmjoL gdTQse class for img block
// sc-puEpG jCnNCp class for sorted popular img
// sc-fzXfPH lgBvYG class for popular artwork link
// sc-qPZPj kNDoln class for search tag

function makeRequest(apiURL, successFunction, checkStatus) {
    console.log(apiURL);
    // CORB blocked, need HTML encoding
    let myHeaders = new Headers();
    myHeaders.append("X-Content-Type-Options","nosniff");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    fetch(apiURL, {headers: myHeaders, mode:"cors"})
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

      let profileDisplay = document.getElementById("info-display");
      let loadingGif = qsa("#info-display img")[0];
      let errorMessage = document.createElement("div");
      errorMessage.classList.add("error-message");
      profileDisplay.removeChild(loadingGif);

      if (response.status == "429") {
        errorMessage.innerText = "ERROR 429: TOO MANY REQUESTS";
      }
      else if (response.status == "403") {
        errorMessage.innerText = "ERROR 404: EXPIRED API KEY";
      }
      else if (response.status == "404") {
        errorMessage.innerText = "ERROR 404: SUMMONER NOT FOUND";
      }

      else {
        errorMessage.innerText = "ERROR" + response.status;
      }
      profileDisplay.appendChild(errorMessage);
      return Promise.reject(new Error(response.status + ": " + response.statusText));

    }
   }
   /**
  * Helper function to return the response's result text if successful, otherwise
  * returns the rejected Promise result with an error status and corresponding text
  * @param {object} response - response to check for success/error
  * @returns {object} - valid result text if response was successful, otherwise rejected
  *                     Promise result
  */
   function checkStatusPlainText(response) {
     if (response.status < 300) {
      console.log("source extracted");
      return response.text();
    } else {
      console.log("source: " + response.json());
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
   }
