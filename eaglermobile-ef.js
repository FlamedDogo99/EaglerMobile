// eaglermobile for eaglerforge

function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}
if(!isMobile()){alert("WARNING: This script doesn't play well with non-mobile browsers. Proceed at your own risk!")};
// Hides inventory button
window.inInventory = false;
// Used for changing touchmove events to mousemove events
var previousX = null;
var previousY = null;
// Key and mouse events
function keyEvent(name, state) {
    const keyName = name.toUpperCase().charCodeAt(0)
    window.dispatchEvent(new KeyboardEvent(state, {
      key: name,
        keyCode: keyName,
      which: keyName
    }));
}
function shiftKey(state) {
    window.dispatchEvent(new KeyboardEvent(state, {
        keyCode: 16,
      which: 16
    }));
}
function mouseEvent(number, state, canvas) {
  canvas.dispatchEvent(new PointerEvent(state, {"button": number}))
}
// POINTERLOCK
// When requestpointerlock is called, this dispatches an event, saves the requested element to window.fakelock, and unhides the touch controls
window.fakelock = null;

Element.prototype.requestPointerLock = function() {
  window.fakelock = this
  document.dispatchEvent(new Event('pointerlockchange'));
  console.log("requested pointerlock")
  var hideButtonStyleDOM = document.getElementById('hideButtonStyle');
  var hideInventoryStyleDOM = document.getElementById('hideInventoryStyle');
  hideButtonStyleDOM.disabled = true;
  hideInventoryStyleDOM.disabled = true;
  return true
}


// Makes pointerLockElement return window.fakelock
Object.defineProperty(document, "pointerLockElement", {
  get: function() {
    return window.fakelock;
  }
});
// When exitPointerLock is called, this dispatches an event, clears the
document.exitPointerLock = function() {
    window.fakelock = null
    document.dispatchEvent(new Event('pointerlockchange'));
    var hideButtonStyleDOM = document.getElementById('hideButtonStyle');
  var hideInventoryStyleDOM = document.getElementById('hideInventoryStyle');
  hideButtonStyleDOM.disabled = false;
  hideInventoryStyleDOM.disabled = window.inInventory;
    return true
}

// FULLSCREEN
window.fakefull = null;
// Stops the client from crashing when fullscreen is requested
Element.prototype.requestFullscreen = function() {
  window.fakefull = this
  document.dispatchEvent(new Event('fullscreenchange'));
  return true
}
Object.defineProperty(document, "fullscreenElement", {
  get: function() {
    return window.fakefull;
  }
});
document.exitFullscreen = function() {
    window.fakefull = null
    document.dispatchEvent(new Event('fullscreenchange'));
    return true
}

// FILE UPLOADING
// Safari doesn't recognize the element.click() used to display the file uplaoder as an action performed by the user, so it ignores it.
// This hijacks the element.createElement() function to add the file upload to the DOM, so the user can manually press the button again.
var oldCreate = document.createElement;
document.createElement = function(type) {
  this.oldCreate = oldCreate;
  var element = this.oldCreate(type);
  if(type == "input") {
    var newElement = document.querySelector('input');
    if(!newElement) {
      this.body.appendChild(element);
      newElement = document.querySelector('input');
      newElement.addEventListener('change', function(e) {
        this.hidden = true;
      })
    }
    newElement.value = null;
    newElement.style.cssText ="position:absolute;left:0%;right:100%;top:0%;bottom:100%;width:100%;height:100%;background-color:rgba(255,255,255,0.5);";
    newElement.hidden = false;
    return newElement;
  }
  return this.oldCreate(type);
}
// CSS for touch screen buttons, along with fixing iOS's issues with 100vh ignoring the naviagtion bar, and actually disabling zoom because safari ignores user-scalable=no :(
let customStyle = document.createElement("style");
customStyle.textContent = `
    button {
        position: absolute; 
        width: 9.5vh;
        height: 9.5vh;
        font-size:4vh;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        line-height: 0px;
        padding:0px;
        color: #ffffff;
        text-shadow: 0.35vh 0.35vh #000000;
        box-sizing: content-box;
        image-rendering: pixelated;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAUCAYAAACnOeyiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAACoAMABAAAAAEAAAAUAAAAABBl8JYAAAIvaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgp+x0mNAAAAU0lEQVQIHV2OXQoAIAiDdSIdt0N3iAiMfhz00IPzw01URWSdEtRabxe01ghmRlgrIwJ352TOSUg9ggdjDFqlFAJAF733z3pbqvqF34mISOsG8o8N3G8YG4Y+w98AAAAASUVORK5CYII=) no-repeat right center, url(data:image/png;base64,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) no-repeat left center;
        background-size: contain, cover;
        outline:none;
        box-shadow: none;
        border: none;
    }
    button:active {
        position: absolute; 
        width: 9.5vh;
        height: 9.5vh;
        font-size:4vh;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        line-height: 0px;
        padding:0px;
        color: #ffffff;
        text-shadow: 0.35vh 0.35vh #000000;
        box-sizing: content-box;
        image-rendering: pixelated;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAUCAYAAACnOeyiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAACoAMABAAAAAEAAAAUAAAAABBl8JYAAAIvaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgp+x0mNAAAAWUlEQVQIHV2OUQrAMAhDNaX01vverXYPL1IES9ca1o99GB8moioic5Xgup/dBWZGKKUQ5syIoNbKyRiDkLoEB9ydVmuNANBF7/1nnS1VpXWORgQnH+xA/vECGrAYeIZg8CAAAAAASUVORK5CYII=) no-repeat right center, url(data:image/png;base64,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) no-repeat left center;
        background-size: contain, cover;
        outline:none;
        box-shadow: none;
        border: none;

    }
    html, body {
        height: -webkit-fill-available !important;
        touch-action: pan-x pan-y;
    }
    `;
document.documentElement.appendChild(customStyle);

// Lazy way to hide touch controls through CSS.
let hideButtonStyle = document.createElement("style");
hideButtonStyle.id = "hideButtonStyle";
hideButtonStyle.textContent = `
    #hideButton {
        display: none;
    }`;
document.documentElement.appendChild(hideButtonStyle);
let hideInventoryStyle = document.createElement("style");
hideInventoryStyle.id = "hideInventoryStyle";
hideInventoryStyle.textContent = `
    #hideInventory {
        display: none;
    }`;
document.documentElement.appendChild(hideInventoryStyle);  

// The canvas is created by the client after it finishes unzipping and loading. When the canvas is created, this applies any necessary event listeners
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('canvas').then(() => {insertCanvasElements()});
function insertCanvasElements() {    
    // Translates touchmove events to mousemove events
    var canvas = document.querySelector('canvas');
    canvas.addEventListener("touchmove", (e) => {
        const touch = e.targetTouches[0]; // We can get away with this because every other touch event will be on different elements

        if (!previousX) {
            previousX = touch.pageX;
            previousY = touch.pageY;
        }
        e.movementX = touch.pageX - previousX;
        e.movementY = touch.pageY - previousY;
        var evt = window.fakelock ? new MouseEvent("mousemove", {movementX: e.movementX, movementY: e.movementY}) : new WheelEvent("wheel", {"wheelDeltaY": e.movementY});
        canvas.dispatchEvent(evt);
        previousX = touch.pageX;
        previousY = touch.pageY;
        event.preventDefault();
    }, false);

    canvas.addEventListener("touchend", (e) => {
        previousX = null;
        previousY = null; 
    }, false)
    // Adds all of the touch screen controls
    // Theres probably a better way to do this but this works for now
    var forwardButton = document.createElement('button');
  forwardButton.id = "hideButton"
  forwardButton.textContent = "▲";
  forwardButton.style.cssText = "left:10vh;bottom:20vh;"
  forwardButton.addEventListener("touchstart", function(e){keyEvent("w", "keydown")}, false);
  forwardButton.addEventListener("touchend", function(e){keyEvent("w", "keyup")}, false);
  forwardButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(forwardButton);
  var rightButton = document.createElement('button');
  rightButton.id = "hideButton"
  rightButton.textContent = "▶";
  rightButton.style.cssText = "left:20vh;bottom:10vh;"
  rightButton.addEventListener("touchstart", function(e){keyEvent("d", "keydown")}, false);
  rightButton.addEventListener("touchend", function(e){keyEvent("d", "keyup")}, false);
  rightButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(rightButton);
  var leftButton = document.createElement('button');
  leftButton.id = "hideButton"
  leftButton.textContent = "◀";
  leftButton.style.cssText = "left: 0vh; bottom:10vh;"
  leftButton.addEventListener("touchstart", function(e){keyEvent("a", "keydown")}, false);
  leftButton.addEventListener("touchend", function(e){keyEvent("a", "keyup")}, false);
  leftButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(leftButton);
  var backButton = document.createElement('button');
  backButton.id = "hideButton"
  backButton.textContent = "▼";
  backButton.style.cssText = "left:10vh;bottom:0vh;"
  backButton.addEventListener("touchstart", function(e){keyEvent("s", "keydown")}, false);
  backButton.addEventListener("touchend", function(e){keyEvent("s", "keyup")}, false);
  backButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(backButton);
  var jumpButton = document.createElement('button');
  jumpButton.id = "hideButton"
  jumpButton.textContent = "⇧";
  jumpButton.style.cssText = "right:10vh;bottom:10vh;"
  jumpButton.addEventListener("touchstart", function(e){keyEvent(" ", "keydown")}, false);
  jumpButton.addEventListener("touchend", function(e){keyEvent(" ", "keyup")}, false);
  jumpButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(jumpButton);
  var crouchButton = document.createElement('button');
  crouchButton.id = "hideButton"
  crouchButton.textContent = "⇩";
  crouchButton.style.cssText = "left:10vh;bottom:10vh;"
  crouchButton.addEventListener("touchstart", function(e){shiftKey("keydown")}, false);
  crouchButton.addEventListener("touchend", function(e){shiftKey("keyup")}, false);
  crouchButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(crouchButton);
  var inventoryButton = document.createElement('button');
  inventoryButton.id = "hideInventory"
  inventoryButton.textContent = "🎒";
  inventoryButton.style.cssText = "right:0vh;bottom:0vh;"
  inventoryButton.addEventListener("touchstart", function(e){
    window.inInventory = (window.fakelock != null)
    keyEvent("e", "keydown");
  }, false);
  inventoryButton.addEventListener("touchend", function(e){keyEvent("e", "keyup")}, false);
  inventoryButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(inventoryButton);
  var chatButton = document.createElement('button');
  chatButton.id = "hideButton"
  chatButton.textContent = "💬";
  chatButton.style.cssText = "right:0vh;top:0vh;"
  chatButton.addEventListener("touchstart", function(e){keyEvent("¿", "keydown")}, false);
  chatButton.addEventListener("touchend", function(e){keyEvent("¿", "keydown")}, false);
  chatButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(chatButton);
  var exitButton = document.createElement('button');
  exitButton.id = "exitButton"
  exitButton.textContent = "⮐";
  exitButton.style.cssText = "left:0vh;top:0vh;"
  exitButton.addEventListener("touchstart", function(e){keyEvent("À", "keydown")}, false);
  exitButton.addEventListener("touchend", function(e){keyEvent("À", "keyup")}, false);
  exitButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(exitButton);
  var hiddenInput = document.createElement('input');
  hiddenInput.id = "hiddenInput"
  hiddenInput.style.cssText = "opacity:0;z-index:-99999";
  document.body.appendChild(hiddenInput);
  var keyboardButton = document.createElement('button');
  keyboardButton.id = "keyboardButton"
  keyboardButton.textContent = "⌨️";
  keyboardButton.style.cssText = "left:10vh;top:0vh;"
  keyboardButton.addEventListener("touchstart", function(e){e.preventDefault();hiddenInput.blur()}, false);
  keyboardButton.addEventListener("touchend", function(e){hiddenInput.select()}, false);
  keyboardButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(keyboardButton);
  var placeButton = document.createElement('button');
  placeButton.id = "hideButton"
  placeButton.textContent = "⊹";
  placeButton.style.cssText = "right:0vh;bottom:20vh;"
  placeButton.addEventListener("touchstart", function(e){mouseEvent(2, "mousedown", canvas)}, false);
  placeButton.addEventListener("touchend", function(e){mouseEvent(2, "mouseup", canvas)}, false);
  placeButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(placeButton);
  var breakButton = document.createElement('button');
  breakButton.id = "hideButton"
  breakButton.textContent = "🗡";
  breakButton.style.cssText = "right:10vh;bottom:20vh;"
  breakButton.addEventListener("touchstart", function(e){mouseEvent(0, "mousedown", canvas)}, false);
  breakButton.addEventListener("touchend", function(e){mouseEvent(0, "mouseup", canvas)}, false);
  breakButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(breakButton);
  var selectButton = document.createElement('button');
  selectButton.id = "hideButton"
  selectButton.textContent = "⬚";
  selectButton.style.cssText = "right:20vh;bottom:20vh;"
  selectButton.addEventListener("touchstart", function(e){mouseEvent(1, "mousedown", canvas)}, false);
  selectButton.addEventListener("touchend", function(e){mouseEvent(1, "mouseup", canvas)}, false);
  selectButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(selectButton);
  var scrollUpButton = document.createElement('button');
  scrollUpButton.id = "hideButton"
  scrollUpButton.textContent = "⇨";
  scrollUpButton.style.cssText = "right:0vh;bottom:30vh;"
  scrollUpButton.addEventListener("touchstart", function(e){
    canvas.dispatchEvent(new WheelEvent("wheel", {"wheelDeltaY": -10}))
  }, false);
  scrollUpButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(scrollUpButton);
  var scrollDownButton = document.createElement('button');
  scrollDownButton.id = "hideButton"
  scrollDownButton.textContent = "⇦";
  scrollDownButton.style.cssText = "right:10vh;bottom:30vh;"
  scrollDownButton.addEventListener("touchstart", function(e){
    canvas.dispatchEvent(new WheelEvent("wheel", {"wheelDeltaY": 10}))
  }, false);
  scrollDownButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(scrollDownButton);
  var throwButton = document.createElement('button');
  throwButton.id = "hideButton"
  throwButton.textContent = "Q";
  throwButton.style.cssText = "right:0vh;bottom:10vh;"
  throwButton.addEventListener("touchstart", function(e){
    window.inInventory = (window.fakelock != null)
    keyEvent("q", "keydown");
  }, false);
  throwButton.addEventListener("touchend", function(e){keyEvent("q", "keyup")}, false);
  throwButton.addEventListener("touchmove", function(e){e.preventDefault()}, false);
  document.body.appendChild(throwButton);
}
