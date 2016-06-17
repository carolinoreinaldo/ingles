window.onload = function(){
	Ajax.buildSelectValues();
	Ajax.initGame("json/meses-dias.json");
}

//criação do objeto Game
var Game = function(){
    var ask;
    var option1;
    var option2;
    var explanation;
}

//Criação do objeto Exercise
var Exercise = function(){
	var value;
	var title;
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
		ajax.open("GET", "json/options.json"); 
		ajax.send(null);
	},

	initGame: function(fileName){
		var gameArray = [];

		var ajax = new XMLHttpRequest(); 
		ajax.onreadystatechange = function(){ 
			if(ajax.readyState == 4 ){
				var json = JSON.parse(ajax.responseText);
				json.forEach((item)=>{
					gameArray.push(createGame(item.ask,item.option1,item.option2,item.explanation));
				});
				generateHTMLCode(gameArray);
			} 
		}
		ajax.open("GET", fileName); 
		ajax.send(null);
	}
}

function replace(element){
	return element.split("'").join("&#39;");
}

function createGame(ask,option1,option2,explanation){
	var game = new Game();
	game.ask = replace(ask);
	game.option1 = replace(option1);
	game.option2 = replace(option2);
	game.explanation = replace(explanation);
	return game;
}

function generateHTMLCode(elements){
	var html_code = "";
	for (elm in elements){
		var question = elements[elm].ask;
		var option1 = elements[elm].option1;
		var option2 = elements[elm].option2;
		var explanation = elements[elm].explanation;
		html_code += HtmlCode.html_block(question,option1,option2,explanation)
	}
	document.getElementById("container").innerHTML = html_code;
}

var HtmlCode = {
	html_block: function(question,option1,option2,explanation){
		var block = "<div class=\"bloco\">"
			+"<span class=\"question\">{0}</span><br/>"
			+"<input type=\"hidden\" class=\"option1\" value='{1}'>"
			+"<input type=\"hidden\" class=\"option2\" value='{2}'>"
			+"<input type=\"hidden\" class=\"explanation_hide\" value='{3}'>"
			+"<label>Write Here: </label><input type=\"text\" class='answer'>"
			+"<button onclick=\"verify(this.parentNode)\">verify</button><br/>"
			+"<span class=\"result\"></span>"
			+"</div>";
			block = block.replace("{0}",question);
			block = block.replace("{1}",option1);
			block = block.replace("{2}",option2);
			block = block.replace("{3}",explanation);
			return block;
	},
	
	str_wrong: function(answer,option1,option2,explanation){
		var html = '<b>WRONG! See the options :</b>';
		html += '<br/><label>Your resp....: </label><span style="color:blue"><b> '+ answer +'</b></span>';
		html += '<br/><label>Correct 1....: </label><span><b> '+ option1 +'</b></span>';
		console.log("lenght = " + option2);
		if( option2 != null && option2.trim() != ""){
			html += '<br/><label>Correct 2....: </label><span><b> '+ option2 +'</b></span>';
		}
		if( explanation != null && explanation.trim() != ""){
			html += '<br/><label>Explanation:</label><span style="color:#2E8B57"><b> '+ explanation +'</b></span>';
		}
		return html;
	},

	str_correct: '<b>Correct</b>'
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

function verify(elm){
	var option1 = elm.querySelector('.option1').value;
	var option2 = elm.querySelector('.option2').value;
	var explanation = elm.querySelector('.explanation_hide').value
	var answer = elm.querySelector('.answer').value;

	if( answer.toUpperCase() == option1.toUpperCase()){
		elm.querySelector('.result').innerHTML = HtmlCode.str_correct;
	}else if( answer.toUpperCase() == option2.toUpperCase()){
		elm.querySelector('.result').innerHTML = HtmlCode.str_correct;
	}else{
		elm.querySelector('.result').innerHTML = HtmlCode.str_wrong(answer,option1,option2,explanation);
	}
}


