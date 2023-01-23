var scrollingEnabled = true;
chrome.storage.local.set({scrollingEnabled: scrollingEnabled}, function() {});
let checker = document.getElementById("scrolling-toggle")
checker.addEventListener("change", toggleScrolling);

if(document.getElementById("scrolling-toggle")){
    console.log("löyty")
}

function toggleScrolling() {
    scrollingEnabled = !scrollingEnabled;
    chrome.storage.local.set({scrollingEnabled: scrollingEnabled}, function() {});
}

