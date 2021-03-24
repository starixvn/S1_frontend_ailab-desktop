$(function(){
    $('.dropdown > button').click(function() {
        $(this).siblings('.dropdown-container').toggleClass('active')
    })
    $('html').click(function(n) {
		if($(n.target).parents(".function").length==0) {
			$('.country,.cashier,.wallet,.memberfile').removeClass('active');
		}
	});
    $('.country').click(function() {
        $('.function > div').removeClass('active')
        $(this).addClass('active')
    })
    $('.cashier').click(function() {
        $('.function > div').removeClass('active')
        $(this).addClass('active')
    })    
    $('.wallet').click(function() {
        $('.function > div').removeClass('active')
        $(this).addClass('active')
    })    
    $('.memberfile').click(function() {
        $('.function > div').removeClass('active')
        $(this).addClass('active')
    })
    //新
    $('.sportsbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.sportsList').addClass('active')
        $('.sportsList').mouseover(function() {
            $('.sportsbtn').addClass('active')
        })
        $('.sportsList').mouseleave(function() {
            $('.sportsbtn').removeClass('active')
        })
    })
    $('.eSportsbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.eSportsList').addClass('active')
        $('.eSportsList').mouseover(function() {
            $('.eSportsbtn').addClass('active')
        })
        $('.eSportsList').mouseleave(function() {
            $('.eSportsbtn').removeClass('active')
        })
    })
    $('.slotbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.casinoList').addClass('active')
        $('.casinoList').mouseover(function() {
            $('.slotbtn').addClass('active')
        })
        $('.casinoList').mouseleave(function() {
            $('.slotbtn').removeClass('active')
        })
    })
    $('.livecasinobtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.livecasinoList').addClass('active')
        $('.livecasinoList').mouseover(function() {
            $('.livecasinobtn').addClass('active')
        })
        $('.livecasinoList').mouseleave(function() {
            $('.livecasinobtn').removeClass('active')
        })
    })
    $('.game').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.gameList').addClass('active')
        $('.gameList').mouseover(function() {
            $('.game').addClass('active')
        })
        $('.gameList').mouseleave(function() {
            $('.game').removeClass('active')
        })
    })
    $('.fishbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.fishList').addClass('active')
        $('.fishList').mouseover(function() {
            $('.fishbtn').addClass('active')
        })
        $('.fishList').mouseleave(function() {
            $('.fishbtn').removeClass('active')
        })
    })
    $('.subModuleListColumn .subModule > div:not(.column) button').click(function() {
        $(this).siblings('button').removeClass()
        $(this).addClass('active')
    })
    //舊
    $('.casinobtn').mouseover(function() {
        $('.subMenu-Wrapper').addClass('active')
        $('.subMenu-Wrapper > div').removeClass('active')
        $('.casinoList').addClass('active')
    })
    $('.livecasinobtn').mouseover(function() {
        $('.subMenu-Wrapper > div').removeClass('active')
        $('.livecasinoList').addClass('active')
    })
    $('.game').mouseover(function() {
        $('.subMenu-Wrapper').addClass('active')
        $('.subMenu-Wrapper > div').removeClass('active')
        $('.gameList').addClass('active')
    })
    $('.fishbtn').mouseover(function() {
        $('.subMenu-Wrapper').addClass('active')
        $('.subMenu-Wrapper > div').removeClass('active')
        $('.fishList').addClass('active')
    })
    $('.subMenu-Wrapper').mouseleave(function() {
        $('.subMenu-Wrapper').removeClass('active')
        $('.subMenu-Wrapper > div').removeClass('active')
    })
    $('.listTag > button').click(function() {
        $('.listTag > button').removeClass('active')
        $(this).addClass('active')
    })
    $('.quickLink > div').hover(function() {
        $('.quickLink').toggleClass('active')
        $('#chat-widget-container').toggleClass('active')
        if ($(".icon").hasClass("icon-arrow-up2")) {
            $(".icon-arrow-up2").removeClass("icon-arrow-up2").addClass("icon-cancel-circle")
        }else {
            $(".icon-cancel-circle").removeClass("icon-cancel-circle").addClass("icon-arrow-up2")
        }
    })
    $('.quickLinkNew1').mouseover(function() {
        $('.quickLinkNew1').addClass('active')
        $('.quickLinkNew2').removeClass('active')
        $('.quickLinkNew2').mouseleave(function() {
            $('.quickLinkNew2').addClass('active')
            $('.quickLinkNew1').removeClass('active')
        })
    })
    $('.quickLinkNew2 > a').mouseover(function() {
        $(this).addClass('active')
        $(this).mouseleave(function() {
            $(this).removeClass('active')
        })
    })
    $('#popup').click(function(n) {
        if($(n.target).parents("#popup").length==0) {
            $('#popup,.pop>div').removeClass('active')
		}
    })
    $('.listBody .btnGroup .upload-btn').click(function() {
        $('#popup').addClass('active')
        $('.pop > .upload').addClass('active');
    })
    $('.upload .btnGroup .orange').click(function() {
        $('.pop > .upload').removeClass('active');
        $('.pop > .uploadSuccess').addClass('active');
    })
    $('.listBody .btnGroup .update-btn').click(function() {
        $('#popup').addClass('active')
        $('.pop > .update').addClass('active');
    })    
    $('.update .btnGroup .orange').click(function() {
        $('.pop > .update').removeClass('active');
        $('.pop > .updateSuccess').addClass('active');
    })
    $('.subModuleBody .btnGroup .orange').click(function() {
        $('#popup').addClass('active')
        $('.pop > .Submit').addClass('active');
    })
    $('.subModuleBody .btnGroup .gray').click(function() {
        $('#popup').addClass('active')
        $('.pop > .Cancel').addClass('active');
    })
    $('.Submit .btnGroup .orange').click(function() {
        $('.pop > .Submit').removeClass('active');
        $('.pop > .Success').addClass('active');
    })    
    $('.buttonBox > button').click(function() {
        $('.buttonBox > button').removeClass('active')
        $(this).addClass('active');
    })
    $('.login').click(function() {
        $('#popup').addClass('active')
        $('.pop > .loginpop').addClass('active');
    })
    $('.join').click(function() {
        $('#popup').addClass('active')
        $('.pop > .joinpop').addClass('active');
    })
    $('button.icon-spinner11').click(function() {
        $(this).removeClass('active').addClass('active')
    })
    $('.listHeader > div:nth-child(2),.listHeader > div:nth-child(3)').click(function() {
        $(this).parent('.listHeader').siblings('.listBody').toggleClass('active')
        $(this).parent('.listHeader').addClass('haveRead')
    })
    $('.icon-information').click(function() {
        $(this).toggleClass('active')
    })
    $('.loginAnimation').hover(function() {
        $('.loginAnimation>img').addClass('active').removeClass('active')
    })
    $('.icon-icon32px_Double-arrow').click(function() {
        $('.transferModule > .from').toggleClass('active')
        $('.transferModule > .to').toggleClass('active')
    })
    $('.eventRule .rankTag > .btnGroup > button').click(function() {
        $('.eventRule .rankTag > .btnGroup > button').removeClass('active')
        $(this).addClass('active')
        $('.eventRule .rankList > div').toggleClass('active')
    })
    $('.champion .rankTag > .btnGroup > button').click(function() {
        $('.champion .rankTag > .btnGroup > button').removeClass('active')
        $(this).addClass('active')
        $('.champion .rankList > div').toggleClass('active')
    })
    $('.lastevent .rankTag > .btnGroup > button').click(function() {
        $('.lastevent .rankTag > .btnGroup > button').removeClass('active')
        $(this).addClass('active')
        $('.lastevent .rankList > div').toggleClass('active')
    })
    $('.ranking > .btnGroup > button').click(function() {
        $('.ranking > .btnGroup > button').removeClass()
        $(this).addClass('active')
        $('.ranking > .btnGroup ~ div').removeClass('active')
        $('.ranking > .btnGroup ~ div').eq($(this).index()).addClass('active')
    })
    if ($('html').hasClass('newIndex')) {
        $('.logo > a > img').attr("src","https://image.n88media.com/SiteSkin/img/logo_en_w.png")
    }
    //紅包    
    $('.angpao').click(function() {
        $(this).addClass('active')
        setTimeout(function(){
            $('#popup').addClass('active')
            $('.bigtitle,.time,.box').addClass('active')
        },3000);
    })
    $('.icon-close').click(function() {
        $('#popup,.angpao').removeClass('active')
        $('.eventLink').addClass('active')
    })
    //煙火
    // window.requestAnimFrame = ( function() {
    //     return window.requestAnimationFrame ||
    //                 window.webkitRequestAnimationFrame ||
    //                 window.mozRequestAnimationFrame ||
    //                 function( callback ) {
    //                     window.setTimeout( callback, 1000 / 60 );
    //                 };
    // })();
    // var canvas = document.getElementById( 'canvas' ),
    //         ctx = canvas.getContext( '2d' ),
    //         cw = window.innerWidth,
    //         ch = window.innerHeight,
    //         fireworks = [],
    //         particles = [],
    //         hue = 120,
    //         limiterTotal = 5,
    //         limiterTick = 0,
    //         timerTotal = 50,
    //         timerTick = 50,
    //         mousedown = false,
    //         mx,
    //         my;
    // canvas.width = cw;
    // canvas.height = ch;
    // function random( min, max ) {
    //     return Math.random() * ( max - min ) + min;
    // }
    // function calculateDistance( p1x, p1y, p2x, p2y ) {
    //     var xDistance = p1x - p2x,
    //             yDistance = p1y - p2y;
    //     return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
    // }
    // function Firework( sx, sy, tx, ty ) {
    //     this.x = sx;
    //     this.y = sy;
    //     this.sx = sx;
    //     this.sy = sy;
    //     this.tx = tx;
    //     this.ty = ty;
    //     this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
    //     this.distanceTraveled = 0;
    //     this.coordinates = [];
    //     this.coordinateCount = 3;
    //     while( this.coordinateCount-- ) {
    //         this.coordinates.push( [ this.x, this.y ] );
    //     }
    //     this.angle = Math.atan2( ty - sy, tx - sx );
    //     this.speed = 2;
    //     this.acceleration = 1.05;
    //     this.brightness = random( 50, 70 );
    //     this.targetRadius = 1;
    // }
    // Firework.prototype.update = function( index ) {
    //     this.coordinates.pop();
    //     this.coordinates.unshift( [ this.x, this.y ] );
    //     if( this.targetRadius < 8 ) {
    //         this.targetRadius += 0;
    //     } else {
    //         this.targetRadius = 1;
    //     }
    //     this.speed *= this.acceleration;
    //     var vx = Math.cos( this.angle ) * this.speed,
    //             vy = Math.sin( this.angle ) * this.speed;
    //     this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
    //     if( this.distanceTraveled >= this.distanceToTarget ) {
    //         createParticles( this.tx, this.ty );
    //         fireworks.splice( index, 1 );
    //     } else {
    //         this.x += vx;
    //         this.y += vy;
    //     }
    // }
    // Firework.prototype.draw = function() {
    //     ctx.beginPath();
    //     ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
    //     ctx.lineTo( this.x, this.y );
    //     ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
    //     ctx.stroke();
    // }
    // function Particle( x, y ) {
    //     this.x = x;
    //     this.y = y;
    //     this.coordinates = [];
    //     this.coordinateCount = 5;
    //     while( this.coordinateCount-- ) {
    //         this.coordinates.push( [ this.x, this.y ] );
    //     }
    //     this.angle = random( 0, Math.PI * 2 );
    //     this.speed = random( 1, 10 );
    //     this.friction = 0.95;
    //     this.gravity = 1;
    //     this.hue = random( hue - 20, hue + 20 );
    //     this.brightness = random( 50, 80 );
    //     this.alpha = 1;
    //     this.decay = random( 0.015, 0.03 );
    // }
    // Particle.prototype.update = function( index ) {
    //     this.coordinates.pop();
    //     this.coordinates.unshift( [ this.x, this.y ] );
    //     this.speed *= this.friction;
    //     this.x += Math.cos( this.angle ) * this.speed;
    //     this.y += Math.sin( this.angle ) * this.speed + this.gravity;
    //     this.alpha -= this.decay;
    //     if( this.alpha <= this.decay ) {
    //         particles.splice( index, 1 );
    //     }
    // }
    // Particle.prototype.draw = function() {
    //     ctx. beginPath();
    //     ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
    //     ctx.lineTo( this.x, this.y );
    //     ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    //     ctx.stroke();
    // }
    // function createParticles( x, y ) {
    //     var particleCount = 300;
    //     while( particleCount-- ) {
    //         particles.push( new Particle( x, y ) );
    //     }
    // }
    // function loop() {
    //     requestAnimFrame( loop );
    //     hue += 0.5;
    //     ctx.globalCompositeOperation = 'destination-out';
    //     ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    //     ctx.fillRect( 0, 0, cw, ch );
    //     ctx.globalCompositeOperation = 'lighter';
    //     var i = fireworks.length;
    //     while( i-- ) {
    //         fireworks[ i ].draw();
    //         fireworks[ i ].update( i );
    //     }
    //     var i = particles.length;
    //     while( i-- ) {
    //         particles[ i ].draw();
    //         particles[ i ].update( i );
    //     }
    //     if( timerTick >= timerTotal ) {
    //         if( !mousedown ) {
    //             fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
    //             timerTick = 0;
    //         }
    //     } else {
    //         timerTick++;
    //     }
    //     if( limiterTick >= limiterTotal ) {
    //         if( mousedown ) {
    //             fireworks.push( new Firework( cw / 2, ch, mx, my ) );
    //             limiterTick = 0;
    //         }
    //     } else {
    //         limiterTick++;
    //     }
    // }
    // window.onload = loop;
});