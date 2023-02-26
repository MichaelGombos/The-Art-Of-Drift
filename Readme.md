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

- (done) Show wheel & pedal pressure in stats
- (done) Fix Background On Back navigation [b1]
- (done) Compress Maps [b2]
- Add upload map page
- Add community map list + leaderboard
- Fix Controller/Keyboard Navigation [b3]
- Add an email login system.
- Add tutorial level
- Package game into an exe

### Upcoming Release 1.1.0

- Add animations
- Add sounds
- Replace gui+game assets with pixelart
- Add header font missing characters
- Add mobile support

### bugs

- [b1] game doesn't shut off if you close by navigating back using the mouse or browser, causing background to not render and the game to still be visible in the main menu
- [b2] maps are currently too large for netifly to process & build without running into "FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory" , causing www.theartofdrift.com to not be running the most up to date version
- [b3] navigation loses focus occaisionally and cannot be restored if you are only using the controller/keyboard and not mouse/tab.

## License

[MIT](https://choosealicense.com/licenses/mit/)
