var scrollingEnabled = true;
var scrollingType = true //false for button scrolling, true for simulated arrow keys
chrome.storage.local.set({scrollingEnabled: scrollingEnabled}, function() {});
chrome.storage.local.set({scrollingType: scrollingType}, function() {});
let checker = document.getElementById("scrolling-toggle")
let checker2 = document.getElementById("type-toggle")
checker.addEventListener("change", toggleScrolling);
checker2.addEventListener("change", toggleType);

if(document.getElementById("scrolling-toggle")){
    console.log("löyty")
}

function toggleScrolling() {
    scrollingEnabled = !scrollingEnabled;
    chrome.storage.local.set({scrollingEnabled: scrollingEnabled}, function() {});
}

function toggleType() {
    scrollingType = !scrollingType;
    chrome.storage.local.set({scrollingType: scrollingType}, function() {});
    if(scrollingType){
        document.getElementById("type-toggle-span").innerHTML = "<- Toggle, Simulated Arrow keys";
    }else{
        document.getElementById("type-toggle-span").innerHTML = "<- Toggle, DOM Button";
    }
}

