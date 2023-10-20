document.addEventListener('DOMContentLoaded', () => {
	let wordODay = "cap";
	const mainH2 = document.querySelector("h2");
	mainH2.innerHTML = mainH2.innerHTML + wordODay;
	const defODay = fetchData(wordODay);
	defODay.then( resp =>{
		addDef(resp);
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

const randWords = ["cap", "rizz", "trash", "free+range+kid"]
let randNum = Math.floor((Math.random()*(randWords.length-1)));

//fetchData(randWords[randNum]);
// const definition = fetchData("cap");
// definition.then(resp => {
// 	console.log(resp[0].definition)	
// })
