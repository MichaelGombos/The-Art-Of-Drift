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
- add loading icon for database functions
- add gmail login w/firebase
- (done) update existing leaderboard functions to use new database facade
- (done) refactor the [map maker](https://michaelgombos.github.io/browser-driving-map-creator/) as a react component, and allow it to be accessed from the create map button
- add community leaderboard page
- add community maps pages
- fix replay bug[b1]
- add controller/keyboard support for navigation & framer animations
- add tutorial level
- add support for custom keybinds in settings
- fix game time bug[b2]
- add pixel art assets for particles
- add sounds for UI and game
- add a logo
- release :D 

### bugs

- [b1] While watching or racing against a replay, the replay inconsistantly fails. This may be tied to performance or maybe the game time bug [b2] but this is difficult to test, so I am going to overhaul the replay system; Instead of the ghost reading the inputs of the replayArray on each frame to then running the car physics using the inputs, I will just store the location/angle of car in the replayArray, so the ghost won't have to run the physics, and should always be accurate. I can still use the replay input to display the steering wheel and pedals in the HUD since its only slightly innacurate.

- [b2] The timer is using the real time that has passed to check how long you have been racing (minus the time paused). BUT each "tick" of the game is pulled using requestAnimationFrame, this means that if you are running this game at 30fps instead of 60fps, you will experience the game running half as fast, but the timer will tick in real time. If you have a 144hz monitor, the game will run extremely fast. The solution here is to rewrite my game loop function to consider delta time.

## License

[MIT](https://choosealicense.com/licenses/mit/)
