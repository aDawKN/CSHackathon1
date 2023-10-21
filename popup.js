document.addEventListener('DOMContentLoaded', () => {
	document.body.style.width="600px";
	document.getElementsByTagName("html")[0].style.width="600px";
	let wordODay = "cap";
	const mainH2 = document.querySelector("h2");
	mainH2.innerHTML = mainH2.innerHTML + wordODay;
	const defODay = fetchData(wordODay);
	defODay.then( resp =>{
		addDef(resp);
	})
	//Creating a text box
	const mainH3 = document.querySelector("h3")
	const textInput = document.createElement('input');
	mainH3.appendChild(textInput)

	//Creating a Button
	const button = document.createElement('button');
	button.innerHTML = 'Submit'
	mainH3.appendChild(button)

	let messageInput

	//Button Logic
	button.addEventListener('click', () => {
		messageInput = textInput.value
		textInput.value = ''
		//Clearing Urban Dictionary Word of the Day
		const clearHead = document.querySelector("h2")
		while (clearHead.hasChildNodes()){
			clearHead.removeChild(clearHead.firstChild)
		}
		//Clearing Definition of Word of the Day
		const clearDef = document.querySelector("#defHolder")
		while (clearDef.hasChildNodes()){
			clearDef.removeChild(clearDef.firstChild)
		}
		//Setting Header as User's Search Result
		const userWord = document.querySelector("h2")
		userWord.innerHTML = "Search Result: " + messageInput
		messageInput = messageInput.replaceAll(" ","+")
		const userDef = fetchData(messageInput)
		userDef.then(resp1 => {
			addSearchDef(resp1)
		})
	})

});

//FetchData() function returns an array of Objects... each Obj has a "definition" property that holds the definition but certain words have brackets around them for some reason
async function fetchData(word){
    const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + word;
    const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': 'a048c41f45msh1746628f3b6ed2cp195beejsnc00ae02b3db1',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    //const result = await response.text();
		 const result = await response.json();
		 return result.list;
	   /// console.log(result);
    } catch (error) {
	    console.error(error);
    }
}


function removeBracket(str){
	return str.replaceAll(/\[|\]/ig, "")
}

//function can be used to push an array of definition to HTML body
function addDef(arr){
	//const pgBody = document.querySelector("#mainHolder");
	const defHolder = document.querySelector("#defHolder");
	arr.forEach((defObj) => {
		let defItem = document.createElement('li');
		defItem.innerHTML = removeBracket(defObj.definition);
		defHolder.appendChild(defItem);
	});
}

function addSearchDef(arr){
	const userdefHolder = document.querySelector("#defHolder");
	arr.forEach((defObj) => {
		let defItem1 = document.createElement('li');
		defItem1.innerHTML = removeBracket(defObj.definition);
		userdefHolder.appendChild(defItem1);
	});
}

const randWords = ["cap", "rizz", "trash", "free+range+kid"]
let randNum = Math.floor((Math.random()*(randWords.length-1)));

//fetchData(randWords[randNum]);
// const definition = fetchData("cap");
// definition.then(resp => {
// 	console.log(resp[0].definition)	
// })
