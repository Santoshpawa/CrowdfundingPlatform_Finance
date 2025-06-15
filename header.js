import { auth} from "./firebase-config.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



//  on clicking nav bar buttons  
const home = document.querySelector('.home-btn');
const invest = document.querySelector('.invest-btn');
const addProjects = document.querySelector('.project-btn');
const rewards = document.querySelector('.reward-btn');
const learn = document.querySelector('.learn-btn');
const connect = document.querySelector('.connect-btn');
const logoutBtn = document.querySelector('.logout-btn');
const loginBtn = document.querySelector('.login-btn');
  
    

home.addEventListener('click',()=>{
    window.location.href='./index.html';
})
onAuthStateChanged(auth , (user)=>{
    if(user){
        invest.addEventListener('click',()=>{
            window.location.href = "./invest.html";
        })
        addProjects.addEventListener('click',()=>{
            window.location.href = "./capital.html";
        })
        rewards.addEventListener('click',()=>{
            window.location.href = "./reward.html";
        })
        
        loginBtn.replaceWith(logoutBtn);
        logoutBtn.classList.remove('hidden');
        
    }
})

loginBtn.addEventListener('click', () => {
        window.location.href = "./logIn.html";
})