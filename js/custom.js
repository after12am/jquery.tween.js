// Jquery with no conflict
jQuery(document).ready(function($) {
	    
    //##########################################
	// Widgets
	//##########################################

	var container = $(".widget-cols");
	var trigger = $("#widget-trigger");
	
	trigger.click(function(){		
		container.animate({
			height: 'toggle'
			}, 500
		);
		
		if( trigger.hasClass('tab-closed')){
			trigger.removeClass('tab-closed');
		}else{
			trigger.addClass('tab-closed');
		}
		
		return false;
		
	});
	
	//##########################################
	// Tool tips
	//##########################################
	
	
	$('.poshytip').poshytip({
    	className: 'tip-yellowsimple',
		showTimeout: 1,
		alignTo: 'target',
		alignX: 'center',
		offsetY: 5,
		allowTipHover: false
    });
    
    //##########################################
	// Superfish
	//##########################################
	
	$(".sf-menu").superfish({ 
        animation: {height:'show'},   // slide-down effect without fade-in 
        delay:     800 ,              // 1.2 second delay on mouseout 
        autoArrows:  false,
        speed: 100
    });
    
    
    //##########################################
	// Slider
	//##########################################
	
	$('#slider').nivoSlider({
		effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
		animSpeed: 500, // Slide transition speed
        pauseTime: 3000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        controlNav: true // 1,2,3... navigation
	});
	
	
	
	
	

    
    //##########################################
	// Accordion box
	//##########################################

	$('.accordion-container').hide(); 
	$('.accordion-trigger:first').addClass('active').next().show();
	$('.accordion-trigger').click(function(){
		if( $(this).next().is(':hidden') ) { 
			$('.accordion-trigger').removeClass('active').next().slideUp();
			$(this).toggleClass('active').next().slideDown();
		}
		return false;
	});
	
	//##########################################
	// Toggle box
	//##########################################
	
	$('.toggle-trigger').click(function() {
		$(this).next().toggle('slow');
		$(this).toggleClass("active");
		return false;
	}).next().hide();
    
    //##########################################
	// Tabs
	//##########################################

    $(".tabs").tabs("div.panes > div", {
    	// remove effect to prvent issues on ie
    });
    

	
	//##########################################
	// Create Combo Navi
	//##########################################	
		
	// Create the dropdown base
	$("<select id='comboNav' />").appendTo("#combo-holder");
	
	// Create default option "Go to..."
	$("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : "Navigation"
	}).appendTo("#combo-holder select");
	
	// Populate dropdown with menu items
	$("#nav a").each(function() {
		var el = $(this);		
		var label = $(this).parent().parent().attr('id');
		var sub = (label == 'nav') ? '' : '- ';
		
		$("<option />", {
		 "value"   : el.attr("href"),
		 "text"    :  sub + el.text()
		}).appendTo("#combo-holder select");
	});

	
	//##########################################
	// Combo Navigation action
	//##########################################
	
	$("#comboNav").change(function() {
	  location = this.options[this.selectedIndex].value;
	});
	
	
	//##########################################
	// Get Commit Log
	//##########################################
	
	var niceTime = (function() {

        var ints = {
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            month: 2592000,
            year: 31536000
        };

        return function(time) {

            time = +new Date(time);

            var gap = ((+new Date()) - time) / 1000,
                amount, measure;

            for (var i in ints) {
                if (gap > ints[i]) { measure = i; }
            }

            amount = gap / ints[measure];
            amount = 'about ' + Math.round(amount);//gap > ints.day ? (Math.round(amount * 100) / 100) : Math.round(amount);
            amount += ' ' + measure + (amount > 1 ? 's' : '') + ' ago';

            return amount;
        };

    })();

    var sha = '';
    $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/after12am/jquery.cssanimate.js/git/refs/heads/master",
        async: false,
        success: function(data) {
            sha = data.object.sha;
        },
        error: function(data) {
            console.log(data)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/after12am/jquery.cssanimate.js/commits/" + sha,
        async: false,
        success: function(data) {
            // console.log(data.commit.committer)
            // console.log(data.commit.message)
            $('.tweet_time .date').append(niceTime(data.commit.committer.date));
            $('.tweet_time .date').attr('href', 'https://github.com/after12am/jquery.cssanimate.js/commit/' + sha);
            $('.tweet_text .committer').append(data.committer.login);
            $('.tweet_text .committer').attr('href', data.committer.html_url);
            $('.tweet_text .message').append(data.commit.message);
            $('.tweet_text .message').attr('href', 'https://github.com/after12am/jquery.cssanimate.js/commit/' + sha);
        },
        error: function(data) {
            console.log(data)
        }
    });
});