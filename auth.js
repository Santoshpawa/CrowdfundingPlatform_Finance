import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import{
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const signUpBtn = document.getElementById('signup-btn');
const logInBtn = document.getElementById('login-btn');
const logOutBtn = document.querySelector('.logout-btn');


// signUp
if(signUpBtn){
    signUpBtn.addEventListener('click', async()=>{
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        const id = userCredentials.user.uid;
        await setDoc(doc(db,"users",id),{email});
        window.location.href = "./login.html";
    } catch (error) {
        alert(error);
    }
})
}

// login
if(logInBtn){
    logInBtn.addEventListener('click', async()=>{
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth,email,password);
        window.location.href = "./index.html";
    } catch (error) {
        alert(error);
    }
})
}

//logout
if(logOutBtn){
    logOutBtn.addEventListener('click', async()=>{
        await signOut(auth);
        window.location.href = "./logIn.html";

    })
}