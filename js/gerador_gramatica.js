var blocoHtml;
var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

window.onload = function(){
	var btn_novo_input = document.querySelector(".btn_novo");
	btn_novo_input.addEventListener("click",function(){
		if(blocoHtml == null){
			blocoHtml = document.getElementsByClassName("inputs")[0];
		}
		var clone = blocoHtml.cloneNode(true);

		clone.querySelector(".question").value = "";

		clone.querySelector(".text1").value = "";
		clone.querySelector(".text2").value = "";
		clone.querySelector(".text3").value = "";
		clone.querySelector(".text4").value = "";

		var radios = clone.querySelector(".radios");
		var name = textoAleatorio(8);

		radios.querySelector(".radio1").name = name;
		radios.querySelector(".radio2").name = name;
		radios.querySelector(".radio3").name = name;
		radios.querySelector(".radio4").name = name;
		console.log(radios.querySelector(".radio4").name);

		document.querySelector(".content").appendChild(clone);

	});

	var btn_gera_json = document.querySelector(".btn_gera");
	btn_gera_json.addEventListener("click",function(){
		
		var inputs = document.getElementsByClassName("inputs");
		
		var bloco = "[\n";
		
		for( var i = 0 ; i < inputs.length; i++ ) {
			
			var elm = inputs[i];
			var radios = elm.querySelector(".radios");
			
			var question = elm.querySelector(".question").value;
			
			var existCorrect = false;

			var text1 = elm.querySelector(".text1").value;
			var radio1 = radios.querySelector(".radio1");
			var option1 = verifyChecked(radio1);
			
			if( option1 == 'correct'){
				existCorrect = true;
			}

			var text2 = elm.querySelector(".text2").value;
			var radio2 = radios.querySelector(".radio2");
			var option2 = verifyChecked(radio2);
			
			if( option2 == 'correct'){
				existCorrect = true;
			}

			var text3 = elm.querySelector(".text3").value;
			var radio3 = radios.querySelector(".radio3");
			var option3 = verifyChecked(radio3);

			if( option3 == 'correct'){
				existCorrect = true;
			}

			var text4 = elm.querySelector(".text4").value;
			var radio4 = radios.querySelector(".radio4");
			var option4 = verifyChecked(radio4);

			if( option4 == 'correct'){
				existCorrect = true;
			}

			if(!existCorrect){
				elm.style.borderColor = "red";
				return;
			} else {
				elm.style.borderColor = "grey";
			}
			
			bloco += "\t{\n";
			
			bloco += "\t\t\"question\"" + ":\""+question+"\",\n"
			
			bloco += "\t\t\"text1\"" + ":\""+text1+"\",\n"
			bloco += "\t\t\"option1\"" + ":\""+option1+"\",\n"
			
			bloco += "\t\t\"text2\"" + ":\""+text2+"\",\n"
			bloco += "\t\t\"option2\"" + ":\""+option2+"\",\n"

			bloco += "\t\t\"text3\"" + ":\""+text3+"\",\n"
			bloco += "\t\t\"option3\"" + ":\""+option3+"\",\n"
			
			bloco += "\t\t\"text4\"" + ":\""+text4+"\",\n"
			bloco += "\t\t\"option4\"" + ":\""+option4+"\",\n"

			bloco += "\t},\n"
		}
		bloco += "]"
		var jsonText = document.querySelector(".tx_json");
		jsonText.innerHTML = bloco;
	});
}

function download() {
	var fileName = document.getElementById("fileNameId").value;

	if( fileName.trim() == ""){
		fileName = "default.json"
	}

	var jsonValue = document.querySelector(".tx_json").innerHTML;

  	var element = document.createElement('a');

  	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonValue));
  	element.setAttribute('download', fileName);

  	element.style.display = 'none';
  	document.body.appendChild(element);

  	element.click();

  	document.body.removeChild(element);
}

function verifyChecked(elm){
	if(elm.checked){
		return 'correct';
	} else {
		return 'wrong';
	}
}

function textoAleatorio(tamanho)
{
    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyzfjewiahdkadkeiqandhaifieEUCEIG';
    var aleatorio = '';
    for (var i = 0; i < tamanho; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        aleatorio += letras.substring(rnum, rnum + 1);
    }
    return aleatorio;
}