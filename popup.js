document.addEventListener('DOMContentLoaded', function () {
  const PIXIV_URL = "www.pixiv.net"
  const bg = chrome.extension.getBackgroundPage()

  document.querySelector("button").addEventListener("click", onClick, false)
  function onClick () {
    chrome.tabs.query({currentWindow: true, active: true},
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'hi', showLinks)
    })
  }

  function showLinks (res) {
    for (i = 0; i < 4; i++) {
      newLink = document.createElement("a")
      newImg = document.createElement("img")

      newLink.href = res["links"][i]
      newLink.appendChild(newImg)
      newImg.src = res["thumbnails"][i]
      document.body.appendChild(newLink)
    }
    conf = document.createElement("p")
    conf.innerText = "Links Loaded"
    document.body.appendChild(conf)
  }
}, false)
