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
	    const result = await response.text();
	    console.log(result);
    } catch (error) {
	    console.error(error);
    }
}

const randWords = ["cap", "rizz", "trash", "free+range+kid"]
let randNum = Math.floor((Math.random()*(randWords.length-1)));

fetchData(randWords[randNum]);