# Eagler Mobile

## A userscript that allows eaglercraft to run on iOS safari
To-do
- [ ] Strafe buttons when holding forward
- [ ] Crouch lock on hold
- [ ] Sprint button (sperate from double tapping forward)
- [ ] Gamepad support
- [ ] Cancel button for file upload
- [ ] Styling for file upload
- [ ] Back button for Kiwi browser?
- [ ] Re-orginize button layout
- [ ] Redo the display button functions
 
Implemented

- [x] Fake pointerlock API (tricks the client into loading)
- [x] Fake fullscreen API (so that selecting full screen doesn't crash the client)
- [x] Custom upload button for files (because safari is a pain with button clicks)
- [x] Fake mousemove events (Allows touch and drag to simulate mouse movement)
- [x] Fake cursor scroll events (Allows scrolling through hotbar and in menus)
- [x] On-screen controls (Movement, block placement/removal/picking, inventory, item dropping, keyboard, and exiting keys)
- [x] Styling for html, body, and canvas (So that the canvas doesn't ignore the navigation bars for viewport sizing)
