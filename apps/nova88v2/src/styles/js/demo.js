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
    $('.homebtn').hover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.homeList').addClass('active')
        $('.homeList').mouseover(function() {
            $('.homebtn').addClass('active')
        })
        $('.homeList').mouseleave(function() {
            $('.homebtn').removeClass('active')
        })
    })
    $('.sportsbtn').hover(function() {
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
    $('.menu .icon-mobile').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.appList').addClass('active')
        $('.appList').mouseover(function() {
            $('.pokerbtn').addClass('active')
        })
        $('.appList').mouseleave(function() {
            $('.pokerbtn').removeClass('active')
        })
    })
    $('.pokerbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.pokerList').addClass('active')
        $('.pokerList').mouseover(function() {
            $('.pokerbtn').addClass('active')
        })
        $('.pokerList').mouseleave(function() {
            $('.pokerbtn').removeClass('active')
        })
    })
    $('.gamebtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.tableList').addClass('active')
        $('.tableList').mouseover(function() {
            $('.gamebtn').addClass('active')
        })
        $('.tableList').mouseleave(function() {
            $('.gamebtn').removeClass('active')
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
    $('.promobtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.promoList').addClass('active')
        $('.promoList').mouseover(function() {
            $('.promobtn').addClass('active')
        })
        $('.promoList').mouseleave(function() {
            $('.promobtn').removeClass('active')
        })
    })
    $('.tvbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.tvList').addClass('active')
        $('.tvList').mouseover(function() {
            $('.tvbtn').addClass('active')
        })
        $('.tvList').mouseleave(function() {
            $('.tvbtn').removeClass('active')
        })
    })
    $('.VIP').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.vipList').addClass('active')
        $('.vipList').mouseover(function() {
            $('.VIP').addClass('active')
        })
        $('.vipList').mouseleave(function() {
            $('.VIP').removeClass('active')
        })
    })
    $('.rankingbtn').mouseover(function() {
        $('.subMenu-Wrapper-new > div').removeClass('active')
        $('.rankingList').addClass('active')
        $('.rankingList').mouseover(function() {
            $('.rankingbtn').addClass('active')
        })
        $('.rankingList').mouseleave(function() {
            $('.rankingbtn').removeClass('active')
        })
    })
    $('.subMenu-Wrapper-new').mouseleave(function() {
        $(this).children('div').removeClass('active')
    })
    $('.subModuleListColumn .subModule > div:not(.column) button').click(function() {
        $(this).siblings('button').removeClass('active')
        $(this).addClass('active')
    })
    $('.switchBtn').click(function() {
        $(this).toggleClass('active')
        $('.switchBtn > div').toggleClass('active')
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
    $('.quickLinkNew3').mouseover(function() {
        $('.quickLinkNew3').addClass('active')
        $('.quickLinkNew4').removeClass('active')
        $('.quickLinkNew4').mouseleave(function() {
            $('.quickLinkNew4').addClass('active')
            $('.quickLinkNew3').removeClass('active')
            $('.quickLinkNew4 > button').removeClass('active')
        })
    })
    $('.quickLinkNew4 > button').click(function() {
        $('.quickLinkNew4 > button').removeClass('active')
        $(this).addClass('active')
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
    $('#streamingMenu .menuModule button').click(function() {
        $(".subModuleListColumn .liveTv").removeClass("active")
        $("#streamingMenu .menuModule button").removeClass("active")
        $(this).addClass('active')
        $(".subModuleListColumn .liveTv").eq($(this).index()).addClass('active')
    })
    $('.walletModule .addBank .addBankName label').click(function() {
        $(this).parent('.checkbox').parent('.addBankInfo').parent('.addBankName').toggleClass('active')
    })
    $('.historyTag button').click(function() {
        $('.historyTag button').removeClass('active')
        $(this).addClass('active')
        $('.historyModule').removeClass('active')
        $('.historyModule').eq($(this).index()).addClass('active')
    })
    $('.subModuleTitle button.icon-question').click(function() {
        $(this).siblings('.inputInfo').toggleClass('active')
    })
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
    //jpot
    //預設top:0
    $('.jpot .number .numberRow > div.active').animate({top:"0"},function(){
        $(this).animate({top:"-540px"},2000)
        //抓到9的時候
        // .animate({top:"-570px"},2000)
        //抓到8的時候
        // .animate({top:"-540px"},2000)
        //抓到7的時候
        // .animate({top:"-510px"},2000)
        // 以此類推.....固定跑30px
    })
    $(".partnerSelect button").hover(function() {
        $(this).children('img').attr("src",$(this).children('img').attr('src').substr(0,47) + "a" + ".png")
    },
        function(){
        $(this).children('img').attr("src",$(this).children('img').attr('src').substr(0,47) + ".png")
    })
    $(".partnerSelect button >img[src='https://image.n88media.com/SiteSkin/img/logo/cq9.png'").parent('button').hover(function() {
        $(this).children('img').attr("src","https://image.n88media.com/SiteSkin/img/logo/cq9a.png")
    },
        function(){
        $(this).children('img').attr("src","https://image.n88media.com/SiteSkin/img/logo/cq9.png")
    })
    $(".partnerSelect button >img[src='https://image.n88media.com/SiteSkin/img/logo/icg.png'").parent('button').hover(function() {
        $(this).children('img').attr("src","https://image.n88media.com/SiteSkin/img/logo/icg.png")
    })
    $(".livecasino > div > img").hover(function() {
        $(this).attr("src",$(this).attr('src').substr(0,56) + "a" + ".jpg")
    },
        function(){
        $(this).attr("src",$(this).attr('src').substr(0,56) + ".jpg")
    })
    $(".livecasino > div > img[src='https://banner.n88media.com/img/livecasino/comingsoon.jpg'").hover(function() {
        $(this).attr("src","https://banner.n88media.com/img/livecasino/comingsoon.jpg")
    })
    $(".fishingList > div").hover(function() {
        $(this).children('img').attr("src",$(this).children('img').attr('src').substr(0,46) + "a" + ".png")
    },
        function(){
        $(this).children('img').attr("src",$(this).children('img').attr('src').substr(0,46) + ".png")
    })
    //泡泡
    function __ShowSnow(settings){

	var snowsrc = settings.SnowImage;
	var no = settings.Quantity;

	var dx, xp, yp;    // coordinate and position variables
	var am, stx, sty;  // amplitude and step variables
	var i;
	var flakes;

	// var stageW = $(window).width() - 10;
	// var stageH = $(window).height();

	var stageW = $('.' + settings.stage).width() - 10;
	var stageH = $('.' + settings.stage).height() + 800;

	dx = [];
	xp = [];
	yp = [];
	am = [];
	stx = [];
	sty = [];
	flakes = [];
	for (i = 0; i < no; ++i){
		dx[i] = 0;                        // set coordinate variables
		xp[i] = Math.random()*(stageW-50);  // set position variables
		yp[i] = Math.random()*stageH;
		am[i] = Math.random()*20;         // set amplitude variables
		stx[i] = 0.02 + Math.random()/1000; // set step variables
		sty[i] = 0.05 + Math.random();     // set step variables

		var flake = $("<div />");

		var cls = ("dot" + i);
		flake.attr("class", cls);
		flake.css({
					position: "absolute",
					zIndex: i,
					bottom: "15px",
					left: "15px"
				});

		var idx = Math.floor(Math.random() * (snowsrc.length));
		flake.append("<img src='" + snowsrc[idx] + "'>");
		// flake.appendTo('.' + 'stage1');
		// flake.appendTo('.' + 'stage2');
		$('.' + settings.stage).append(flake);
		// $('.elin').append(flake);
		// var clone = flake.clone();
		// $('.' + 'r').append(clone);

		flakes[i] = $("." + cls);
	}

	var animateSnow;
	animateSnow = function(){
		for (i = 0; i < no; ++ i){
			yp[i] += sty[i];
			if (yp[i] > stageH - 50){
				xp[i] = Math.random() * (stageW - am[i] - 30);
				yp[i] = 0;
				stx[i] = 0.02 + Math.random() / 10;
				sty[i] = 0.05 + Math.random();
			}
			dx[i] += stx[i];
			flakes[i].css("bottom", yp[i] + "px");
			flakes[i].css("left", (xp[i] + am[i] * Math.sin(dx[i])) + "px");
		}
		snowtimer = setTimeout(animateSnow, 30);
	};

	jQuery.fn.hidesnow = function(){
		if(window.snowtimer) clearTimeout(snowtimer);
		for (i = 0; i < no; i++) flakes[i].remove();
	};
	animateSnow();
	// if (settings.HideSnowTime > 0) setTimeout(hidesnow, settings.HideSnowTime * 1000);
}

(function($) {
	$.fn.snow = function(options){
		var settings = $.extend({
			SnowImage:      undefined,
			Quantity:       20,
			HideSnowTime:   0,
			stage: null
		}, options);
		__ShowSnow(settings);
		return this;
	};

})(jQuery);

(function($,$doc){
	$doc.ready(function(){
		var article;		
		article = $('#article');
		container = $('#container');
		function actionLight(_obj_, _speed_){
			_obj_.animate({'opacity' : '1'}, _speed_, function(){
				_obj_.animate({'opacity' : '0.3'}, _speed_, function(){
					actionLight(_obj_, _speed_);
				});
			});
		}
		var isIE8 = false;
		var isLowIE7 = false;
		var isLowIE8 = false;
		var deviceAgent = {
		    version : navigator.userAgent.toLowerCase()
		};
		deviceAgent.ie = deviceAgent.version.indexOf('msie') != -1;
		if( deviceAgent.ie ) {
		    if(window.navigator.userAgent.search(/trident/i) != -1) {
		        if( parseInt(deviceAgent.version.match(/trident\/(\d.\d)/i)[1], 10) < 5 ) isIE8 = true; // ie8 
		    }else{
		        isLowIE7 = true; // ie7 
		    }
		    if( isIE8 || isLowIE7 || deviceAgent.version.indexOf('msie 8.0') > -1 ) isLowIE8 = true; // ie8 
		}
		if(!isLowIE8){
			actionLight($('#intro .inner .title .light0'), 2000);
			actionLight($('#intro .inner .title .light1'), 1500);
		}
		actionSnow = function(){
			if(typeof $(document).hidesnow === 'function') $(document).hidesnow();
			$(document).snow({
				SnowImage: [
					'https://banner.n88media.com/img/fishing/bon/bg_light0.png',
					'https://banner.n88media.com/img/fishing/bon/bg_light1.png',
					'https://banner.n88media.com/img/fishing/bon/bg_light2.png',
					'https://banner.n88media.com/img/fishing/bon/bg_light3.png'
				],
				stage : 'elin'
			});
		};
		actionSnow();		
	});
})(jQuery, jQuery(window), jQuery(document));
});