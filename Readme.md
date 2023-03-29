<h1 align="center"> The art of drift </h1>

![The art of drift animated title](https://github.com/MichaelGombos/browser-driving-demo/blob/main/public/title.gif?raw=true)

The art of drift is a racing game built in javascript.


## Where to play

You can play this game online at [www.TheArtOfDrift.com](https://www.TheArtOfDrift.com)

## How to play?

This game is played with wasd and the arrow keys to control the car. Shift, space, s or down arrow can be used to engage the brakes.

## Attributions

[Red Car (top-down) by sheikh_tuhin](https://opengameart.org/content/red-car-top-down)

[Post-apocalyptic background by PashaSmith](https://pashasmith.itch.io/post-apocalyptic-background)

[CC0 Award Icons by AntumDeluge](https://opengameart.org/content/cc0-award-icons)

[Pixel Art Animated Star by Narik](https://soulofkiran.itch.io/pixel-art-animated-star)

[Animated smoke cloud by pimen](https://pimen.itch.io/smoke-vfx-1)

[DisrespectfulTeenagerFade font by Jay Wright](http://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=920)

[NES Cyrillic by xbost](http://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=2639)

## RoadMap

### Upcoming Release 1.0.0

- (done) add interaction for profile selector 
- (done) add email login w/firebase
- (done) add error banner for database functions
- (done) add loading icon for database functions
- (done) add gmail login w/firebase
- (done) update existing leaderboard functions to use new database facade
- (done) refactor the [map maker](https://michaelgombos.github.io/browser-driving-map-creator/) as a react component, and allow it to be accessed from the create map button
- (done) add community leaderboard page
- (done) add community maps pages
- (done) fix replays crashing randomly[b1]
- (done) fix infinite async loads on finish navigation
- add publish/set to draft flow for maps
- (done) fix huge particle bug on replay
- remake replays for all maps
- (done) compress replay stats (4 min replay is 1.3mb)
- (done) update car sprite to use new graphics
- add controller/keyboard support for navigation & framer animations
- add custom keybinds
- update particle layer to use pixi js
- add pixel art assets for particles
- add sounds
- commision logo
- add dialogue system
- add tutorial level
- fix game time being tied to fps [b2]
- publish this games design doc, game description, create full feature list
- add credits
- commision trailer
- release :)

### bugs

- [b1] (fixed) While watching or racing against a replay, the replay inconsistantly fails. This may be tied to performance or maybe the game time bug [b2] but this is difficult to test, so I am going to overhaul the replay system; Instead of:
 the ghost reading the inputs of the replayArray on each frame then running the car physics using the inputs,
I will:
   store the location/angle of car in the replayArray, so the ghost won't have to run the physics, and should always be accurate. I can still use the replay input to display the steering wheel and pedals in the HUD since its only slightly innacurate.

- [b2] The timer is using the real time that has passed to check how long you have been racing (minus the time paused). BUT each "tick" of the game is pulled using requestAnimationFrame, this means that if you are running this game at 30fps instead of 60fps, you will experience the game running half as fast, but the timer will tick in real time. If you have a 144hz monitor, the game will run extremely fast. The solution here is to rewrite my game loop function to consider delta time.


## License

[MIT](https://choosealicense.com/licenses/mit/)
