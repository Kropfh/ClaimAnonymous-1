/** 
* @author Deborah Vanzin
* Das Formular erhält einen EventListener, um das Default-Verhalten zu unterbinden,
* damit das Formular nicht über den Standardmechanismus von HTML abgeschickt wird. 
*/


let form = document.querySelector('form');
let accessToken;

form.addEventListener('submit', (e) => {
  console.log("Preventing default!");
  e.preventDefault();
  return false;
});

/**
Author Lorenzo (für Captcha)
 */
 
//Variablen für Captcha definieren

const captcha = document.querySelector(".captcha"),
reloadBtn = document.querySelector(".reload-btn"),
captchaText = document.getElementById("captchaText"),
statusTxt = document.querySelector(".status-text");



//Captcha Symbole werden im einem Array gespeichert

let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                     
     
 //Captcha funktion generiert zufällige ausgabe und gibt diese weiter an captchaText.innerText                
function getCaptcha(){
	
  for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captchaText.innerText += ` ${randomCharacter}`; 
  }
}

//Funktionsaufruf
getCaptcha(); 

//Reload Button setzt zuerst inhalt auf null und generiert danach ein neues
function reloadCaptcha(){
	//calling getCaptcha & removeContent on the reload btn click
 captchaText.innerText = "";
  getCaptcha();
  
};

 // Captcha-Validierungsfunktion Eingabe wird mit leerzeichen versehen da wir oben die Charakter inkl leerzeichen übermitteln
 function validateCaptcha(){
	
	  let inputVal = captchaField.value.split('').join(' ');
	  return inputVal === captchaText.innerText; //in js ist es möglich mit === gleich die eingabe zu validieren
	  

}

//Diese Funktion schickt die Daten des Formulars über AJAX zur API
function register(username, email, password, birthDate) {
if(!validateCaptcha()){
	    statusTxt.style.color = "#ff0000";
    statusTxt.innerText = "Captcha not matched. Please try again!";
    return;
}
statusTxt.innerText="";

// ab hier ist der Code von Deborah Vanzin

  const data = {
      username: username,
      password: password,
      email: email,
      birthDate: birthDate
  }
  const url ='/account';
  console.log("Fetching from " + url);
  const json = JSON.stringify(data);

  var request = new Request(url, {
      method: 'POST',
      body: json,
      headers: new Headers({
          'Content-Type': 'application/json',
        })
  }); 
 
  fetch(request).
    then((response) => {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json
      })));
  }).then(({ status, ok, json }) => {
    if(ok) {
      window.location.href='login-DE.html'
      return
    }
    const message = json;
    let color = 'black';
    switch (status) {
      case 400:
        console.log("Bad Request: " + JSON.stringify(message));
        break;
      case 201:
      case 200:
        console.log("Registration OK: " + message);
        break;
      case 500:
      default:
        console.log("Error 500: " + message);
    }
  })
}
//Diese Funktion schickt E-Mail und Password an die API um ein Access-Token zu bekommen
function login(email, password) {
  const data = {
      email: email,
      password: password,
  }

  //const url ='http://localhost:8080/authenticate';
  const url ='/authenticate';
  
  console.log("Fetching from " + url);
  const json = JSON.stringify(data);
	console.log("Senting data to login: " + json);
  var request = new Request(url, {
      method: 'POST',
      body: json,
      headers: new Headers({
          'Content-Type': 'application/json',
          
        })
  }); 

  fetch(request).
    then((response) => {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json
      })));
    })
    .then(({ status, json, ok }) => {
      const message = json;
      let color = 'black';
      switch (status) {
        case 400:
          console.log("Bad Request: " + JSON.stringify(message));
          break;
        case 201:
        case 200:
          console.log("JWT: " + JSON.stringify(message));
          accessToken = json.token;
          localStorage.setItem("accessToken", accessToken);
          window.location.href='lobby-DE.html';
          break;
        case 500:
        default:
          console.log("Error 500: " + message);
    }
  })
}
// Diese Funktion schickt einen GET-Request an die API um eine Liste der Spiele zu erhalten
function getGames() {

  const url ='/games';
  console.log("Fetching from " + url);

  var request = {
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + accessToken
        }
  }; 

  fetch(url, request).
    then((response) => {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json
      })));
    })
    .then(({ status, json, ok }) => {
      const message = json;
      let color = 'black';
      switch (status) {
        case 400:
          console.log("Bad Request: " + JSON.stringify(message));
          break;
        case 201:
        case 200:
          console.log("games: ", json);
          
          break;
        case 500:
        default:
          console.log("Error 500: " + message);
    }
  })
}

function abort() {
  console.log("Registrierung abgebrochen!");
}




