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

var data, editor, passed, CodeMirror, answer, console;

var chapter_number = 0;
var attempts = 0;

try {
   Typekit.load({
     loading: function() {
       // Javascript to execute when fonts start loading
     },
     active: function() {
       // Javascript to execute when fonts become active
       
       init();
       
     },
     inactive: function() {
       // Javascript to execute when fonts become inactive
     }
   })
 } catch(e) {}

function hide_result(){
	
	$("#result").animate({"height":"0px"}, function(){
		
		$("#result").css("display","none");
		
	});
	
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

/**
 *	
 * 
 */		

function next(){
	
	console.log("Next has Fired");
	
	$("#result").animate({
		
		"max-height":"0",
		"width":"100%",
		
	});
		
	
	if(chapter_number !== 5){
		
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

function check_input(){
	
	answer = editor.getValue();
	
	console.log(chapter_number);
	
	passed = false;
	
	$.each(data.chapters[chapter_number].answers, function(index, value) {
    
    	if(answer.indexOf(value) > -1){
	    	
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
		
		attempts++;
		
		setTimeout(function() { hide_result(); }, 5000);
		
		console.log("Attempt #" + attempts); 
		
	}else{
		
		// PASS
		
		$("#result").css({"display":"block","background":"#1EBBA6"});
		$("#result").text("Passed");
		$("#result").animate({
			
			"height":"60px",
			"width":"100%",
			
		});
		
		attempts = 0;
		
		setTimeout(function() { next(); }, 5000);
		
	}
	
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

function init(){
	
	
	console.warn("Hello");
	$('.page_1 .inner h1').toggle().addClass('animated bounceInDown');
	$(".page_1 .inner a.btn").toggle().addClass('animated bounceInUp');
	
}


/**
 *	Init CodeMirror and Fetch App Data json
 * 
 */	
 

function change_page(page){
	
	switch(page){
	
		case "home":
		
			console.log("Home fired");
		
		break  	
		
	} 
	
}

$(document).ready(function(){
	
	$("#menu_release").click(function(){
		
		console.log("Hello World");
		
		$("nav ol").slideToggle();
		
	});
	
	editor = CodeMirror.fromTextArea(document.getElementById("textarea"), {
			lineNumbers: false,
			mode: "text/x-scss"
	});	
	
	// Disable the CMD-S key default - Habbit of saving after editing code area :/
	document.addEventListener("keydown", function(e) {
	if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
	    e.preventDefault();
	    
	  }
	}, false);
	
	editor.on("focus", function(){ hide_result();	});
	
	get_system_data();
	
	$("#submit").click(function(){	check_input(); 	});
	
	$("#next").click(function(){	next();			});
	
	$("#reset").click(function(){
		
		
		$(".CodeMirror").animate({"opacity":"0"}, 500, function(){
			
			draw();
			
		});

		
	});
	
	$("#credits").click(function(){
		
		console.log("fired");
		
		$(".credits_box").addClass('animated bounceOutLeft');
		
	});
	
	change_page(home);
	
});

