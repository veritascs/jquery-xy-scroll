/**
 * Code base from Andrew Johnson
 * http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
 *
 * Modified by Max Bechdel to work in both x and y planes.
 */
;(function ($) {
    $.fn.xyScroll = function () {
        return this.each(function () {
            //get the current x,y coordinates
            var start       = currentPosition();
            var startX      = start['x'];
            var startY      = start['y'];
            
            //get the end position
            var stop        = elmPosition(this);
            var stopX       = stop['x'];
            var stopY       = stop['y'];
            
            //compute the distances to the end position
            var distanceX = stopX > startX ? stopX - startX : startX - stopX;
            var distanceY = stopY > startY ? stopY - startY : startY - stopY;
            var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
            
            if (distance < 100) {
                scrollTo(stopX, stopY); 
                return;
            }
            
            var speed = Math.round(distance / 100);
            
            //limit how slow we go, higher the number the slower it is
            if (speed >= 10) 
                speed = 10;
            
            var stepFactor  = 250;
            var stepX = Math.round(distanceX / stepFactor);
            var stepY = Math.round(distanceY / stepFactor);
            
            var leapX = (stopX > startX) ? startX + stepX : (stopX < startX) ? startX - stepX : 0;
            var leapY = (stopY > startY) ? startY + stepY : (stopY < startY) ? startY - stepY : 0;
            var timer = 0;
            
            directionX = (stopX > startX) ? 1 : (stopX < startX) ? -1 : 0; //1 moving right, -1 moving left, 0 not moving left or right
            directionY = (stopY > startY) ? 1 : (stopY < startY) ? -1 : 0; //1 moving down, -1 moving up, 0 not moving up or down
            
            while(true) {
                
                setTimeout("window.scrollTo("+leapX+", "+leapY+")", timer * speed);
                
                //check if we've made it!
                if(leapX == stopX && leapY == stopY)
                {
                    //setTimeout("moveNav()", timer * speed );// * (timer * .5));
                    break;
                }
                
                //set the new scrollTo locations
                leapX += directionX * (stepX + timer);
                leapY += directionY * (stepY + timer);
                
                //make sure we aren't over shooting the x coordinate
                if (directionX == 1)//right
                    if (leapX > stopX) leapX = stopX;
                else if (directionX == -1) //left
                    if (leapX < stopX) leapX = stopX;
                else
                    leapX = stopX; //neither
                
                
                //make sure we aren't over shooting the X coordinate
                if (directionX == 1) //down
                {
                    if (leapX > stopX)
                        leapX = stopX; 
                }else if (directionX == -1) //up
                {
                    if (leapX < stopX)
                        leapX = stopX; 
                }else
                    leapX = stopX; //neither
                
                //make sure we aren't over shooting the Y coordinate
                if (directionY == 1) //down
                {
                    if (leapY > stopY)
                        leapY = stopY; 
                }else if (directionY == -1) //up
                {
                    if (leapY < stopY)
                        leapY = stopY; 
                }else
                    leapY = stopY; //neither
                
                //increment timer
                timer++;
            }
            
            //returns the current position of the upper left corner of the viewable screen
            function currentPosition() {
                //get the current coordinates (long/magic line to deal with different browsers)
                var x = typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
                var y = typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop  ? document.documentElement.scrollTop  : document.body.scrollTop  ? document.body.scrollTop  : 0;
                
                return {
                    'x' : x,
                    'y' : y
                };
            }

            //returns the position of target element
            function elmPosition(elm) {
                var x       = elm.offsetLeft;    
                var y       = elm.offsetTop;
                var node    = elm;
                
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                    x += node.offsetLeft;
                } 
                
                return {
                    'x' : x,
                    'y' : y
                };
            }

            function moveNav()
            {
                upperNav = document.getElementById('upperNavList');
                lowerNav = document.getElementById('lowerNavList');
                pos = currentPosition();
                
                if (pos['x'] == 0)
                {
                    upperNav.className = 'navList-right';
                    lowerNav.className = 'navList-right';
                }else 
                {
                    upperNav.className = 'navList-left';
                    lowerNav.className = 'navList-left';
                }
            }
        });
    };
 }(window.jQuery));   