/*
 * SCSS is Awesome
 * 
 * @version		0.1
 * @package		com.jamesrwilliams.scss-is-awesome
 * @description	Interactive visuilaisation project for SCSS		
 * @author 		James Williams (@James_RWilliams)
 * @copyright 	Copyright (c) 19/03/2015
 *
 */

var data, editor, passed;

var chapter_number = 0;

/**
 *	
 * 
 */			

function check_input(){
	
	answer = editor.getValue();
	
	passed = false;
	
	$.each(data.chapters[0].answers, function(index, value) {
    
    	if(answer.search(value) != -1){
	    	
	    	passed = true;
	    	
    	}
	
	});
	
	if(passed != true){
		
		
		// FAILED
		
		$("#result").css({"display":"block","background":"#F75229"});
		$("#result").text("Try Again");
		$("#result").animate({
		
			"height":"60px",
			"width":"100%",
			
		});
		
		setTimeout(function() { hide_result(); }, 5000);
		
	}else{
		
		// PASS
		
		$("#result").css({"display":"block","background":"#1EBBA6"});
		$("#result").text("Passed");
		$("#result").animate({
			
			"height":"60px",
			"width":"100%",
			
		});
		
		change_btn();
		
	}
	
}

function change_btn(){
	
	$(".chapter_nav").toggleClass("shake");
	
}

/**
 *	
 * 
 */		

function draw(){
	
	hide_result();
	
	editor.setValue(data.chapters[chapter_number].question);
	$("#chapter_content").text(data.chapters[chapter_number].desc);
	$(".chapter h3").text(data.chapters[chapter_number].title);
	$(".CodeMirror").animate({"opacity":"1"},500);
	
	
}

function hide_result(){
	
	$("#result").animate({"height":"0px"}, function(){
		
		$("#result").css("display","none");
		
	});
	
}

/**
 *	
 * 
 */		

function next(){
	
	
		$("#result").animate({
			
			"max-height":"0",
			"width":"100%",
			
		});
		
	
	if(chapter_number != 6){
		
		chapter_number++;
		draw();
		
	}else{
		
		chapter_number = 0;
		draw();
		
	}
	
	$("#result").animate("max-height","0px");
	
}

/**
 *	
 * 
 */		

function get_system_data(){
		
		$.ajax({
		    
		    /* 2 */   
	        type: "get",
	        url: "data.json",
	        dataType: "json",
	        success: function(_data) {
	           
	          	data = _data;
			  	draw();
	          	
	        },
		    error: function(){ 
			
				console.warn("ajax error");
			    
			}    
		});	
		
	}

/**
 *	Init CodeMirror and Fetch App Data json
 * 
 */		

$(document).ready(function(){
	
	
	editor = CodeMirror.fromTextArea(document.getElementById("textarea"), {
			lineNumbers: false,
			mode: "text/x-scss"
	});	
	
	$("#type").typed({
        strings: ["$variables ","@imports", "@mixins", "_partials", "h1 { span { nesting } }"],
        typeSpeed: 60,
        loop: true,
        backSpeed: 60,
      });
	
	// Disable the CMD-S key default - Habbit of saving after editing code area :/
	document.addEventListener("keydown", function(e) {
	if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
	    e.preventDefault();
	    
	    console.log("[SCSS Is Awesome] Save Function Is Disabled for the mental health of James.");
	    
	  }
	}, false);
	
	editor.on("focus", function(){
		
		hide_result();
		
	});
	
	get_system_data();
	
	$("#submit").click(function(){
		
		check_input();
		
	});

	$("a#START").click(function(){
		
		$(".filler h2, .filler a").toggleClass("fadeOutDown");
		$(".filler").delay().fadeToggle(1000);
		
	});
	
	$("#next").click(function(){
		
		next();
		
	});
	
	$("#reset").click(function(){
		
		
		$(".CodeMirror").animate({"opacity":"0"}, 1000, function(){
			
			draw();
			
		});

		
	});
	
});

