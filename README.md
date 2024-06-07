# Eagler Mobile

## A userscript that allows eaglercraft to run on mobile devices
To-do
- [ ] Cancel button for file upload
- [ ] Styling for file upload
- [ ] Back button for Kiwi browser?
- [ ] Gamepad support
- [ ] Seperate pointerlock fix, file upload fix, touch screen controls, and gamepad controls
- [ ] Custom settings menu for mobile button placement, and mouse sensitivity for gamepad and touch events
- [ ] Dynamic enable and disable of pointerlock fix, file upload fix, touch screen controls, and gamepad controls
 
Implemented

- [x] Fake pointerlock API (tricks the client into loading)
- [x] Fake fullscreen API (so that selecting full screen doesn't crash the client)
- [x] Custom upload button for files (because safari is a pain with button clicks)
- [x] Fake mousemove events (Allows touch and drag to simulate mouse movement)
- [x] Fake cursor scroll events (Allows scrolling through hotbar and in menus)
- [x] On-screen controls (Movement, block placement/removal/picking, inventory, item dropping, keyboard, and exiting keys)
- [x] Styling for html, body, and canvas (So that the canvas doesn't ignore the navigation bars for viewport sizing)
- [x] Strafe buttons when holding forward
- [x] Crouch lock on hold
- [x] Re-orginize button layout
- [x] Redo the display button functions
- [x] Sprint button (sperate from double tapping forward)
- [x] Android-friendly keyboard capture 

