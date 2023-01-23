let scrollingEnabled = true
let right = document.getElementsByClassName('icon icon--chevron-right icon--gallery')
let left = document.getElementsByClassName('icon icon--chevron-left icon--gallery')

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if(key == "scrollingEnabled"){
        scrollingEnabled = newValue
      }
    }
  });

function startScrolling() {
    // add event listener for mouse wheel scroll
    document.addEventListener("wheel", handleScroll);
}

function stopScrolling() {
    // remove event listener for mouse wheel scroll
    document.removeEventListener("wheel", handleScroll);
}

// handle mouse wheel scroll event
function handleScroll(event) {
    if (event.deltaY < 0) {
        // mouse wheel scrolled up
        right[0].click()
    } else {
        // mouse wheel scrolled down
        left[0].click()
    }
}

document.addEventListener("fullscreenchange", function() {
    //console.log(document.fullscreenElement.nodeName)
    if (!(!window.screenTop && !window.screenY)) {
        if (scrollingEnabled) {
            startScrolling();
        }
    } else {
        stopScrolling();
    }
});
