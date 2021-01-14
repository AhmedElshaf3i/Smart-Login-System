var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPass = document.getElementById("userPass");

var passInput=document.getElementById("passInput");
var emailInput=document.getElementById("emailInput");

var signUpBtn = document.getElementById("signUpBtn");
var signInpBtn = document.getElementById("signInpBtn");

var warning = document.getElementById("warning");
var warningLogin=document.getElementById("warningLogin");

var SigninLink = document.getElementById("SigninLink");
var SignUpLink = document.getElementById("SignUpLink");

var signInSection = document.getElementById("signInSection");
var signUpSection = document.getElementById("signUpSection");

var welcomeSection =document.getElementById("welcomeSection");
var welcome =document.getElementById("welcome");

var fristPage= document.getElementById("fristPage")
var logoutBtn=document.getElementById("logoutBtn");


//check if there are data in local storage 
container = [];
if (localStorage.getItem("myStorage") != null) {
    container = JSON.parse(localStorage.getItem("myStorage"));
}


/*
* create obj of all inputes
* then check if input valid to regex and inputs not empty 
* if there are any in valid print alert message and not save in local storage
*/
function addUser() {
    var userData =
    {
        name: userName.value,
        email: userEmail.value,
        pass: userPass.value
    }


    if (checkInput(userData.name, userData.email, userData.pass) == true) {
        if ( search(userData.name, userData.email)[0]==true ) {
            warning.innerHTML = `<p> this email or pass is exist <p>`;
        }
        else {
            container.push(userData);
            localStorage.setItem("myStorage", JSON.stringify(container));

            warning.innerHTML = `<p class="text-success"> sucess <p>`;
            clearInput();
        }


    }
    /*if not match regex*/
    else if (checkInput(userData.name, userData.email, userData.pass) == -1) {

        warning.innerHTML = `<p> pass should start with capital liter and min length 5 char </p>`;
    }
    /*if ther are any empty input */
    else if (checkInput(userData.name, userData.email, userData.pass) == false) {

        warning.innerHTML = `<p> All input requred </p>`;

    }
}

/******
 * 
 * check inputs and return the state of checking
 * 
 *  -1    : if regex  not match
 *  false : if any empty input
 *  true  : if input match instructions 
 */
function checkInput(name, email, pass) {
    var regex = /^[A-Z][a-z0-9]{5}/;

    if (name != "" && email != "" && pass != "") {

        if (regex.test(pass) == true) {
            return true;
        }
        else {
            return -1;
        }

    }
    else {
        return false;
    }
}

/****
 * 
 * search func check if value exist in storage data or not
 * return arr frist index is status: if found -->true if not -->false
 *            second index is the index of founded elemnt        
 * 
 * 
 */

function search(name=false, email=false,pass=false) {
    var returnStatusInsex=[];
    for (var i = 0; i < container.length; i++) {
        if (container[i].name == name || container[i].email == email || container[i].pass == pass ) {
            returnStatusInsex[0]=true;returnStatusInsex[1]=i;
            return returnStatusInsex;
        }
    }
    returnStatusInsex[0]=false;
    return returnStatusInsex;
}


/****
 * 
 * search func check if value exist in storage data or not
 * return arr true if exist and fase if not    
 * 
 * 
 */
function searchLogin(email,pass) {

    for (var i = 0; i < container.length; i++) {
        if (container[i].email == email && container[i].pass == pass ) {
           
            return true;
        }
    }

    return false;
}



function clearInput()
{
    passInput.value="";
    emailInput.value="";
    userName.value="";
    userEmail.value="";
    userPass.value="";

}
signUpBtn.addEventListener("click", addUser);
/***
 * sign in button event 
 * befor login will check if inbut exist or not 
 * if input match valid display the welcome pag 
 */
signInpBtn.addEventListener("click",function()
{
    if(search(undefined,emailInput.value,undefined)[0]==false)
    {
        warningLogin.innerHTML=`<p> this email doesn't exist</p>`;
    }
    else if((search(undefined,undefined,passInput.value)[0]==false))
    {
        warningLogin.innerHTML=`<p> this pass is incorrect</p>`;
    }
    /*if email and pass exist and the same element have thet pass*/
   else if(searchLogin(emailInput.value,passInput.value )==true )
    {
       
        fristPage.classList.add("d-none");
        welcomeSection.classList.remove("d-none");
        welcome.innerHTML=`<h1> Welcome ${container[search(undefined,emailInput.value,undefined)[1]].name} </h1>`
        warningLogin.innerHTML=``;
        clearInput();

    }
    else 
    {
        warningLogin.innerHTML=`<p> this pass is incorrect</p>`;
    }
});

SigninLink.addEventListener("click", function () {
    fristPage.classList.remove("d-none");
    signInSection.classList.remove("d-none");
    signUpSection.classList.add("d-none");


    welcomeSection.classList.add("d-none");
});

SignUpLink.addEventListener("click", function () {
    fristPage.classList.remove("d-none");
    signUpSection.classList.remove("d-none");
    signInSection.classList.add("d-none");

    welcomeSection.classList.add("d-none");
});


logoutBtn.addEventListener("click",function(){

    fristPage.classList.remove("d-none");
    signInSection.classList.remove("d-none");
    signUpSection.classList.add("d-none");


    welcomeSection.classList.add("d-none");



});