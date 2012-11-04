/*****************************
 * Metro Progress Multirings *
 *****************************/
(function( $ ) {
   /*** pub Methods + Properties ***/
   var pub = {
      settings : null,
      
      /**
       * Initialize Metro Progress Multirings
       * 
       * @param (function) callback What function to run when initialization is complete
       * @returns (jquery)
       */
      init : function( callback ) {
         // Wrap current DIV contents inside a #center DIV
         if ( this.find( '#center' ).length > 0 ) {
            // if metroProgressMultiring is initialized more than once
            this.html( '<div id="center">' + this.find( '#center' ).html() + '</div>' );
         } else {
            this.html( '<div id="center">' + this.html() + '</div>' );
         }
         
         // Prevent funny behavior when positioning rings in static DOM
         if ( this.css( 'position' ) == 'static' ) {
            this.css( 'position', 'relative' );
         }
         
         // Style rings container
         this.css( {
            'opacity'  : 0,
            'overflow' : 'hidden',
            'width'    : pub.settings.size,
            'height'   : pub.settings.size
         } );
         
         // Style multirings' center
         this.find( '#center' ).css( {
            'position' : 'absolute',
            'width'    : '30%',
            'height'   : '30%',
            'top'      : '35%',
            'left'     : '35%'
         } );
         
         // Append rings
         for ( var r in pub.settings.rings ) {
            this.append(
               '<div id="r' + r + '" style="'
               + 'position:absolute; '
               + 'top:0; left:0; '
               + 'width:100%; height:100%; '
               + 'background-size: 100%; '
               + 'background-color: transparent; '
               + 'background-repeat: no-repeat; '
               + 'background-position: center; '
               + 'background-image: url(' + pub.settings.rings[ r ] + ')"></div>'
            );
         }
         
         // Set initialized flag
         prv.initialized = true;
         
         // If autostart is enabled, run this.metroProgressMultirings('show')
         if ( pub.settings.autostart ) {
            return pub.show.apply( this, callback );
         } else {
            return callback.apply( this );
         }
      },
      
      /**
       * Start rings animation, fading em' in
       * 
       * @param (function) callback to run when animation started successfully
       * @returns (jquery)  
       */
      show : function( callback ) {
         prv.rotatingRingsEnding = false;
         
         // If you only call metroProgressMultiring('show'), auto-initialize
         if ( ! prv.initialized ) {
            pub.settings.autostart = true;
            return pub.init.apply( this, callback );
         }
         
         this.children().not( '#center' ).each( function ( i, ring ) {
            prv.rotateRing(
               $( ring ),
               pub.settings.duration
            );
         });
         
         this.animate( {
            opacity : 1
         }, {
            duration : pub.settings.duration / 5,
            easing   : 'swing',
            complete : ( callback ) ? callback : pub.settings.onShow
         } );
         
         return this;
      },
      
      /**
       * Align the rings to show completion
       * 
       * @param (function) callback to run when alignment is completed
       * @returns (jquery) 
       */
      align : function( callback ) {
         this.children().not( '#center' ).animate( {
            opacity : 0
         }, {
            duration : pub.settings.duration / 5,
            easing : 'swing',
            complete : function() {
               prv.rotatingRingsEnding = true;
               prv.ringsAlign.apply( $( this ).parent() );
               
               $( this ).animate( {
                  opacity : 1
               }, {
                  duration : pub.settings.duration / 5,
                  easing : 'swing',
                  complete : ( callback ) ? callback : pub.settings.onAlign // < Override event with callback
               } );
            }
         } );
         
         return this;
      }
   };
   
   /*** prv Methods + Properties ***/
   var prv = {
      initialized : false,
      rotatingRings : new Array(),
      rotatingRingsEnding  : false,
      
      /**
       * Animates a ring DIV
       * 
       * @param (jquery) ring jquery DIV object
       * @param (int)    duration of the inner ring (outter rings are calculated)
       * @param (int)    delay to start the animation
       */
      rotateRing : function( ring, duration, delay ) {
         // Check if the ring is already being animated
         if ( prv.rotatingRings.indexOf( ring ) > -1 ) {
            // Delay the animation (if it's null it won't be run) and rotate
            ring.delay( delay ).rotate( {
               angle     : ( pub.settings.clockwise ) ? 0 : 360,
               animateTo : ( pub.settings.clockwise ) ? 360 : 0,
               duration  : duration  + ( prv.rotatingRings.indexOf( ring ) * ( duration / 200 ) * 10 ),
               
               easing   : function(x, t, b, c, d) { return ( t / d ) * c ; }, // linear
               callback : function() {
                  // If rings are being aligned, remove this ring from animation cue
                  if ( prv.rotatingRingsEnding ) {
                     prv.rotatingRings.splice( prv.rotatingRings.indexOf( ring, 1 ) );
                  } else {
                     prv.rotateRing( ring );
                  }
               }
            } );
         } else {
            // Add the ring to the animating cue
            prv.rotatingRings.push( ring );
            
            // Start the animation of this ring with a random delay
            prv.rotateRing(
               ring,
               duration,
               100 + Math.floor( Math.random() * ( duration / 5 ) )
            );
         }
      },
      
      /**
       * Align the rings nicely (ala' Smart Glass)  
       */
      ringsAlign : function() {
         this.children().not( '#center' ).each( function( i, ring ) {
            $( ring ).rotate( {
               angle :
                  ( pub.settings.clockwise )
                     ? ( pub.settings.rings.length - i ) * 30
                     : 360 - ( pub.settings.rings.length - i ) * 30, // this allows central ring to be the lead
               animateTo :
                  ( pub.settings.clockwise )
                     ? 360
                     : 0,
               duration : pub.duration / 8,
               easing : function (x, t, b, c, d) { return -c *  ( ( t = t / d - 1 ) * t * t * t - 1) + b; }
            } );
         } );
      }
   }
   
   /*** jQuery Plugin Declaration ***/
   $.fn.metroProgressMultiring = function( method, callback ) {
      if ( pub[ method ] ) { // < Method exists
         return pub[ method ].apply( this, callback );
      } else if ( typeof method === 'object' || ! method ) { // < We're being initialized
         // Set default settings and override with those provided in [ method ]
         pub.settings = $.extend( {
            /* Settings */
            autostart : true,
            clockwise : false,
            duration  : 600,
            size      : 275,
            rings     : [
               'img/metroprogress/inner.png',
               'img/metroprogress/central.png',
               'img/metroprogress/outter.png'
            ],
            
            /* Events */
           onShow  : null,
           onAlign : null
         }, method );
         
         // Initiallize
         return pub.init.apply( this, callback );
      } else {
         $.error( 'Method ' +  method + ' does not exist on jQuery.metroProgressMultiring' );
      }
   };
})( jQuery );