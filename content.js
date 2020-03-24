chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const premiumBlock = document.querySelectorAll("sc-pmjoL gdTQse")
  const popularImages = document.querySelectorAll(".sc-fzocqA.jLbcpr img")
  const popularImageDivs = document.querySelectorAll(".sc-fzpdyU.eQptyb")
  // alert(popularImageDivs.length)
  let popularImageLinks = []
  let popularThumbnails = []
  for (i = 0; i < 4; i++) {
    popularImageLinks.push(popularImageDivs[i].href)
    popularThumbnails.push(popularImages[i].src)
    // alert(popularImageLinks[i])

  }
  sendResponse({links: popularImageLinks,
                thumbnails: popularThumbnails})
})

// 3-23
// sc-pmjoL gdTQse class for img blo  ck
// sc-puEpG jCnNCp class for sorted popular img
// sc-fzXfPH lgBvYG class for popular artwork link
