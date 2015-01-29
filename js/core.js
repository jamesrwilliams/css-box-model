var count = 0;
var breakClause = null;

$(document).ready(function(){
	
	$(".stage").click(function(){
		
		
		animationCounter();
		count++;
		
	});
	
	
	
});

function animationCounter(){
	
	if(breakClause != true){
		
		if(count == 0){
		
		console.log("Count is Zero");
		
			$(".stage").append("<div class='box'></div>").show('slow');
			
		}
		else if(count == 1){
			
			$(".box").toggleClass("step_1");
			$(".box").append("<div class='margin'></div>").show('slow');
			
		}
		else if(count == 2){
			
			$(".box").toggleClass("step_1");
			$(".box").toggleClass("step_2");
			
		}
		else if(count == 3){
			
			console.log("Count is Three");
			
		}
		else if(count == 4){
			
			console.log("Count is Four");
			
		}
		else if(count == 5){
			
			console.log("Count is Five");
			
		}
		else {
			
			console.log("Count is high as fuck");
			breakClause = true;
		}
		
	}
	else {
		
		breakClause = false;
		count = 0;
		console.warn("Well Then");
		
	}
	

}