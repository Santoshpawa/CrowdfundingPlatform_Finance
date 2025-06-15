import {auth, db } from "./firebase-config.js";

import {
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const submitBtn = document.getElementById('submit-btn');
const title = document.getElementById('title');
const description = document.getElementById('description');
const netWorth = document.getElementById('net-worth');
const capitalRequired = document.getElementById('capital-required');
const imageURL = document.getElementById('image');

//  onAuthstatechanged for getting user id who is making the project

let currentUser = null;

//welcome greeting 
onAuthStateChanged(auth , async(user)=>{

    if(user){
        currentUser = user;
        
    }
})

submitBtn.addEventListener('click', async(e)=>{
    e.preventDefault();
    const project = {
        title: title.value,
        description : description.value,
        capitalRequired : capitalRequired.value,
        netWorth : netWorth.value,
        capitalRaised : 0,
        imageURL : imageURL.value,
        userID : currentUser.uid
    }
    await addDoc(collection( db,"projects"),project);
    alert('Project Details Submitted');
    window.location.href = "./invest.html";
})