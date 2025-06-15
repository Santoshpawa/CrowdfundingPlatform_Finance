
    import { auth } from "./firebase-config.js";
    import {
        onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


    
    const exploreInvestment = document.getElementById('explore-investment');
    const raiseCapital = document.getElementById('raise-capital');
    
    let currentUser = null;
    
    // replacing signup-login button with logout when the user is login
    const signup_login_btn = document.querySelector('.signup-login-btn');
    onAuthStateChanged(auth, async(user) => {
        if(user){
            currentUser = user;
        }
    })


    // welcome text
    const string = "Start Investing And Retire Early.";
    const welcomeText = document.getElementById('welcomeText');
    let index = 0;
    function typeText() {
        if (index < string.length) {
            setTimeout(() => {
                welcomeText.innerText += string[index];
                ++index;
                typeText();
            }, 100)

        } else {
            setTimeout(() => {
                index = 0;
                welcomeText.textContent = "";
                typeText();
            }, 2000)
        }
    }
    typeText();
    // welcome text ends here

// explore investment   
exploreInvestment.addEventListener('click', ()=>{
    if(currentUser){
        window.location.href = "./invest.html";
    }else{
        alert('User not logged In');
        window.location.href = "./logIn.html";
    }
})

// raise - capital

raiseCapital.addEventListener('click',()=>{
    if(currentUser){
        window.location.href = "./capital.html";
    }else{
        alert('User not logged In');
        window.location.href = "./logIn.html";
    }
})
