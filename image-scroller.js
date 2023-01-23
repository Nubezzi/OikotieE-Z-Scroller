let scrollingEnabled = true
var scrollingType = true //false for button scrolling, true for simulated arrow keys
let right = document.getElementsByClassName('icon icon--chevron-right icon--gallery')
let left = document.getElementsByClassName('icon icon--chevron-left icon--gallery')
let gallery = document.getElementsByClassName('galleria')

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if(key == "scrollingEnabled"){
        scrollingEnabled = newValue
      }
      if(key == "scrollingType"){
        scrollingType = newValue
      }
    }
});

document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log(key)
})

function fireKey(el){
    var keycode;
    var key;
    switch(el)
    {
        case "left":
        keycode = 37;
        key = "ArrowLeft"
        break;
        case "right":
        keycode = 39;
        key = "ArrowRight"
        break;    
    }
    if(document.createEventObject)
    {
        var eventObj = document.createEventObject();
        eventObj.keyCode = key;
        document.fireEvent("onkeydown", eventObj);   
    }else if(document.createEvent)
    {
        var eventObj = document.createEvent("Event");
        eventObj.initEvent('keydown', true, true);
        eventObj.which = keycode;
        eventObj.key = key
        document.dispatchEvent(eventObj)
        //console.log(key)
    } 
}

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
        if(scrollingType){
            //console.log("oikea")
            fireKey("right")
            //document.dispatchEvent(new KeyboardEvent('keydown', {'which': 39}));
        }else{
            right[0].click()
        }
    } else {
        // mouse wheel scrolled down
        if(scrollingType){
            //console.log("vasen")
            fireKey("left")
            //document.dispatchEvent(new KeyboardEvent('keydown', {'which': 37}));
            //fireKey("left")
        }else{
            left[0].click()
        }
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
