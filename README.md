# Metro Progress Multirings (v1.0)
Simple [jQuery](http://www.jquery.com/) Plugin that shows a nice, smooth and cool _"loading"_ or 
_"connecting"_  animation, similar to that of the Windows 8 
[Xbox Smart Glass](http://www.xbox.com/smartglass).


## Dependencies
### Scripts
* [jQuery](http://www.jquery.com/) (duh!) 
* [jQuery Rotate Plugin](http://code.google.com/p/jqueryrotate/) **bundled with this plugin (see below)**

### Browsers
This plugin should work with **all browsers supporting CSS3**:


## Files
Inside the `src` folder you'll find the awesome **source code**, beautifully commented and human readable
(as much as the jQuery Rotate developer allowed us, of course). The files inside are:
* ´metro-progress-multiring.src.js´ : the almighty plugin you were looking for
* ´jquery-rotate.src.js´ : the plugin that does the rotating magic

The images in the `img` folder:
* ´central.png´ : central ring for the animation
* ´inner.png´ : inner ring for the animation
* ´outter´ : outter ring for the animation  


## Quickstart
For those lazy to read the beautiful docs, the usage of _Metro Progress Multirings_ is very simple:

     <div id="#fancy-metro-rings-loading"></div>
     <script type="text/javascript">
       $('#fancy-metro-rings-loading').metroProgressMultiring();
     </script>
    
You can also have an image in the center of it:

     <div id="#fancy-metro-rings-loading">
         <img src="image/in/the/center.png" style="width:100%" />
     </div>


When your scripts are done doing whatever time or processor consuming thing, they should just
run the `align` method to align the rings (or you can just fadeout if you don' want the Wi-Fi figure):

     $('#fancy-metro-rings-loading').metroProgressMultiring('align');

By default, images should be inside the `img/metro-progress-multiring` folder (relative to your HTML file
running this script). However, you can define your own images or folder like this (starting with the 
inner-most ring):

     $('#fancy-metro-rings-loading').metroProgressMultiring( {
         rings : [
             'path/to/ring1.png',
             'path/to/ring2.png',
             'path/to/ring3.png'
         ]
     } );


You may aswell define as many rings as you want, this script will generate the animation for each one. Just 
remember that _images must have the same height and width (squared)_ and must be transparent 
(`PNG` prefereably).


## Advanced
### Methods
* **$.metroProgressMultiring('show', callback )** : Fade the rings and start their animation. This is automatically called when `autostart` is `true`. 
* **$.metroProgressMultiring('align', callback )** : Align the rings and finish the animation.

### Settings
These settings are passed during initialization:
* **autostart** (default is _true_) : Animation should start right after initialization
* **clockwise** (default is _false_) : Rings animation direction is counter-clockwise by default
* **duration** (default is _600_) : The duration of a single spin of the inner-most ring
* **size** (default is _275_) : Size of the entire loading multiring DIV
* **rings** (default is _['img/metro-progress-multiring/r1.png', 'img/metro-progress-multiring/r2.png', 'img/metro-progress-multiring/r3.png']_) : Array of the rings' images
* **onShow** : Callback for when the multiring starts animating
* **onAlign** : Callback for when the rings get aligned


## To Do
* Remove image dependency (maybe CSS embbeding?)
* Change rings color throught a hex value