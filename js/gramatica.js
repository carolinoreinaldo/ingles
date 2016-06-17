window.onload = function(){
	Ajax.buildSelectValues();
	Ajax.initGame("json/gramatica_the.json");
}

//criação do objeto Game
var Game = function(){
    var question;
    var text1;
    var option1;
    var text2;
    var option2;
    var text3;
    var option3;
    var text4;
    var option4;
}

var Ajax = {

	buildSelectValues: function (){

		var ajax = new XMLHttpRequest(); 
		ajax.onreadystatechange = function(){ 
			if(ajax.readyState == 4 ){
				var json = JSON.parse(ajax.responseText);
				json.forEach((item)=>{
					putOption(item.value, item.title)
				});
				addEventToSelect();
			} 
		}
		ajax.open("GET", "json/gramatica_options.json"); 
		ajax.send(null);
	},

	initGame: function(fileName){
		var gameArray = [];

		var ajax = new XMLHttpRequest(); 
		ajax.onreadystatechange = function(){ 
			if(ajax.readyState == 4 ){
				var json = JSON.parse(ajax.responseText);
				json.forEach((item)=>{
					gameArray.push(createGame(item));
				});
				gameArray = shuffleArray(gameArray);
				generateHTMLCode(gameArray);
			} 
		}
		ajax.open("GET", fileName); 
		ajax.send(null);
	}
}

function createGame(item){
	var game = new Game();
	game.question = replaceText(item.question);
	game.text1 = replaceText(item.text1);
	game.option1 = replaceText(item.option1);
	game.text2 = replaceText(item.text2);
	game.option2 = replaceText(item.option2);
	game.text3 = replaceText(item.text3);
	game.option3 = replaceText(item.option3);
	game.text4 = replaceText(item.text4);
	game.option4 = replaceText(item.option4);
	return game;
}

function replaceText(text){
	return text.replace("'","&#39;");
}

function generateHTMLCode(gameArray){
	var html_code = "";
	for (index in gameArray){
		html_code += HtmlCode.html_block(gameArray[index]);
	}
	document.getElementById("container").innerHTML = html_code;
}

var HtmlCode = {
	html_block: function(game){
		var block = ""
			+"<div class=\"task\">"

				+"<span class=\"question\">{question}</span><br/>"

				+"<div>"
				+"	<input type=\"radio\" name=\"task\" value=\"{option1}\" onclick=\"verify(this.parentNode.parentNode)\">"
				+"	<label>&nbsp; {text1} &nbsp;</label><br/>"
				+"</div>"

				+"<div>"					
				+"	<input type=\"radio\" name=\"task\" value=\"{option2}\" onclick=\"verify(this.parentNode.parentNode)\">"
				+"	<label>&nbsp; {text2} &nbsp;</label><br/>"
				+"</div>"

				+"<div>"
				+"	<input type=\"radio\" name=\"task\" value=\"{option3}\" onclick=\"verify(this.parentNode.parentNode)\">"
				+"	<label>&nbsp; {text3} &nbsp;</label><br/>"
				+"</div>"

				+"<div>"
				+"	<input type=\"radio\" name=\"task\" value=\"{option4}\" onclick=\"verify(this.parentNode.parentNode)\">"
				+"	<label>&nbsp; {text4} &nbsp;</label><br/><br/>"
				+"</div>"

			+"</div>";
			
			return shuffleHtmlBlock(game,block);
	}
}

function putOption(value,title){
	var opt = document.createElement("option");
   	opt.value = value;
   	opt.innerHTML = title;
   	var select = document.getElementById("selectId");
   	select.appendChild(opt);
}

function change(fileName){
	fileName += ".json";
	fileName = "json/" + fileName
	Ajax.initGame(fileName);
}

function addEventToSelect(){
	var select = document.getElementById("selectId");
	select.addEventListener("change", function(){
		 change(select.options[select.selectedIndex].value)
	}); 
}

function verify(htmlElement){
	var divs = htmlElement.getElementsByTagName('div');
	for( var i = 0 ; i < divs.length ; i++){
		div = divs[i];
		
		var input = div.querySelector("input");
		var label = div.getElementsByTagName("label")[0];
		
		label.style.color = "black";
		label.style.background = "white";

		if( input.checked ){
			if( input.value == 'correct'){
				label.style.color = "write";
				label.style.background = "green";
			} else {
				label.style.color = "write";
				label.style.background = "red";
			}
		} else if (input.value == 'correct'){
			label.style.color = "write";
			label.style.background = "green";
		}
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffleHtmlBlock(game,block){

	var shuffle = Math.floor((Math.random() * 3) + 1);

	if( shuffle == 1){
		
		block = block.replace("{question}",game.question);

		block = block.replace("{option1}",game.option2);
		block = block.replace("{text1}",game.text2);

		block = block.replace("{option2}",game.option1);
		block = block.replace("{text2}",game.text1);

		block = block.replace("{option3}",game.option4);
		block = block.replace("{text3}",game.text4);

		block = block.replace("{option4}",game.option3);
		block = block.replace("{text4}",game.text3);

	return block;
	} else if ( shuffle == 2 ){

		block = block.replace("{question}",game.question);

		block = block.replace("{option1}",game.option4);
		block = block.replace("{text1}",game.text4);

		block = block.replace("{option2}",game.option3);
		block = block.replace("{text2}",game.text3);

		block = block.replace("{option3}",game.option1);
		block = block.replace("{text3}",game.text1);

		block = block.replace("{option4}",game.option2);
		block = block.replace("{text4}",game.text2);
		return block;

	} else if ( shuffle == 3 ){

		block = block.replace("{question}",game.question);

		block = block.replace("{option1}",game.option3);
		block = block.replace("{text1}",game.text3);

		block = block.replace("{option2}",game.option4);
		block = block.replace("{text2}",game.text4);

		block = block.replace("{option3}",game.option2);
		block = block.replace("{text3}",game.text2);

		block = block.replace("{option4}",game.option1);
		block = block.replace("{text4}",game.text1);
		return block;	
	
	} else {

		block = block.replace("{question}",game.question);

		block = block.replace("{option1}",game.option3);
		block = block.replace("{text1}",game.text3);

		block = block.replace("{option2}",game.option4);
		block = block.replace("{text2}",game.text4);

		block = block.replace("{option3}",game.option1);
		block = block.replace("{text3}",game.text1);

		block = block.replace("{option4}",game.option2);
		block = block.replace("{text4}",game.text2);
		return block;

	}
}