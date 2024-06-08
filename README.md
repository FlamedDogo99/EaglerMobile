# <img src="images/logo128.png" alt="Eagler Mobile Logo" align="right" width="128px"></img>Eagler Mobile



![](https://img.shields.io/badge/Github-v3.0.1-blue?style=flat-square&logo=github&logoColor=white&label=GitHub&color=181717)
[![](https://img.shields.io/github/license/FlamedDogo99/EaglerMobile?style=flat-square)](https://github.com/FlamedDogo99/EaglerMobile/blob/master/LICENSE)

## About

Eagler Mobile brings new functionality and benefits for the EaglerCraft web client by providing mobile-friendly touch controls, keyboard access, and other settings configirable through the EaglerCraft client. 

<div align="center">

![Eagler Mobile Screenshot](images/preview.png)

</div>

## Installation

The easiest way to use Eagler Mobile is to use a userscript application such as Greasemonkey. However, because Eagler Mobile is plain JavaScript you can easily deploy it in other ways as well. For instance we've included `eaglermobile.ef.js` which can be run as a mod on [EaglerForge](https://github.com/eaglerforge/EaglerForge).

If you want to download the source, no building is required. The best way to download the source is with Git:

```sh
git clone https://github.com/FlamedDogo99/EaglerMobile.git
```
## Contributing

### Suggestions and bug reports

If you found a bug or have a suggestion [create an issue](https://github.com/FlamedDogo99/EaglerMobile/issues/new/choose) after checking for duplicates.


### Features and documentation
#### Fake API's
- Pointerlock methods such as `Element.prototype.requestPointerLock`, `document.pointerLockElement`, and `document.exitPointerLock` are replaced with vanilla JavaScript that mimics pointerlock functionality. This allows the EaglerCraft client to load.
- Fullscreen methods such as `Element.prototype.requestFullscreen`, `document.fullscreenElement`, and `document.exitFullscreen` are replaced with vanilla JavaScript that mimics fullscreen functionality. This fixes a crash due with viewport dimensions.

#### Keyboard Events
- The EaglerCraft client captures keypress through a `keydown` event listener. Because Android devices currently have an issue with `keydown` and `keyup` events, Eagler Mobile dynamically toggles between capturing `keydown` and `input` events. The state is saved in window.keyboardFix, and is toggled if a faulty keyboard event is detected.
- To dispatch keyboard events, Eagler Mobile requires the use of the `keyEvent` function, in order to maintain functionality for `input` event listeners. For example, typing an uppercase `h` in the chat is as simple as:
  ```js
  keyEvent("shift", "keydown"); 
  keyEvent("h", "keydown");
  ```
#### Mobile controls
- Eagler Mobile controls can either be shown in-game or in-menu. When creating a an element you can achieve this simply by either adding the `inGame` or `inMenu` class.
- Simple gesture controls such as scrolling, single pressing, and long pressing have been implemented, however there are currently no functions provided to easily bring this functionality to other elements.

#### File uploads
- On MacOS and iOS safari, the EaglerCraft client's implementation of triggering the file selection dialog does not work. A rudimentary fix has been added for now.

## License

Eagler Mobile is licensed under the terms of the [Apache License, Version 2.0](https://github.com/FlamedDogo99/EaglerMobile/blob/main/LICENSE).

## Intended future features
- [ ] **Gamepad support**: Mapping gamepad inputs to `keyEvent`, `wheelEvent` and `mouseEvent` functions, and implenting a controllable fake cursor for menus.
- [ ] **File upload improvements**: Adding a cancel button and improving the styling
- [ ] **Dynamic enable and disable of features**: Seperating gamepad controls, touch controls, pointerlock fix, and upload fix into seperate functions which can be enabled and disabled by the user 
