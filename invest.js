import {
    doc,
    getDocs,
    updateDoc,
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import { auth,db } from "./firebase-config.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



const  container = document.getElementById('project-container');

const searchBar = document.getElementById('search-bar');
let projects = [];
let currentUser = null;
//  on window loading  
window.onload = async()=>{
    await fetchProjects();
}

//  getting userid for storing rewards
onAuthStateChanged(auth, (user)=>{
    if(user){
        currentUser = user;
    }
})



//   Displaying projects from database



// fetching projects from database

async function fetchProjects(){
    try {
        const snapshot = await getDocs(collection(db, "projects")); 
        
        
        container.innerHTML = "";
        projects = [];
        snapshot.forEach((data)=>{
            let project = data.data();
            project.id = data.id;
            projects.push(project);
            displayProjects(project);
        })
    } catch (error) {
        alert(error);
    }
}

// displaying projects 

function displayProjects(project){
    
    const div = document.createElement('div');
    const imageWrapper = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('h3');
    const description = document.createElement('h5');
    const capitalRaised = document.createElement('h4');
    const addFund = document.createElement('button');
    div.classList.add('project-card');
    imageWrapper.classList.add('imagewrapper');
    image.classList.add('image');
    description.classList.add('describe');
    image.src = project.imageURL;
    title.innerText = project.title;
    capitalRaised.innerText = `Capital Raised: ${((project.capitalRaised/project.capitalRequired)*100).toFixed(2)} %`;
    description.innerText = project.description;
    addFund.innerText = "Add Funds";
    imageWrapper.append(image);
    div.append(imageWrapper,title,description,capitalRaised,addFund);
    container.append(div);
    addFund.addEventListener('click',async(event)=>{
        event.stopPropagation();
        const amount = prompt("Enter amount to fund: ");
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        try {
            const string = `Purchased shares of ${project.title} worth : ₹${numAmount}`;
            await addDoc(collection(db,"users",currentUser.uid,"rewards"),{
                title: project.title,
                amount: numAmount,
                timeStamp: new Date(),
                note: string});
            const snapShot = doc(db,'projects',project.id);
            const updatedCapital = project.capitalRaised+numAmount;
            await updateDoc(snapShot,{
                capitalRaised : updatedCapital
            })
            if(updatedCapital>=project.capitalRequired){
                alert('Project Funding Completed 100% ')
               
            }else{
                alert('Funding Successful')
            }
            
        } catch (error) {
            alert(error)
        }
        await fetchProjects();
    })

    div.addEventListener('click',()=>{
        localStorage.setItem("projectId",project.id);
        window.location.href = "./project-details.html";
    })

}

//  search button
let timer = null;
let searchProjects = [];
searchBar.addEventListener('input', async()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
        searchProjects = projects.filter((project)=> project.title.toLowerCase().includes(searchBar.value.toLowerCase()));
        if(searchProjects.length>0){
        container.innerHTML = "";
        searchProjects.forEach((project)=>{
            displayProjects(project)
        })
        }else{
        alert('No projects found!!')
    }
    },1000)
    
})
