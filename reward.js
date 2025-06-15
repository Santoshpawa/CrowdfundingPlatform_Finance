import { auth,db } from "./firebase-config.js";

import{
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

let currentUser = null;
const container = document.getElementById('container');
onAuthStateChanged(auth, async(user)=>{
    if(user){
        currentUser = user;
         await fetchingRewards();
    }
})


// fetching rewards of user

async function fetchingRewards(){
    const snapShot =  await getDocs(collection(db,"users",currentUser.uid,"rewards"));
    snapShot.forEach((doc)=>{
        const reward = doc.data();
        displayRewards(reward);
    })
}

function displayRewards(reward){
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    if(reward.amount>=10000){
        h3.innerText = "🥇 "+reward.note;
    }else if(reward.amount>=5000){
       h3.innerText = "🥈 "+reward.note; 
    }else{
        h3.innerText = "🥉 "+reward.note; 
    }
    div.append(h3);
    container.append(div);
}