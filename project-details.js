import {auth , db} from "./firebase-config.js";
import {
    doc,
    getDoc,
    addDoc,
    getDocs,
    collection
}  from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import{
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const projectContainer = document.getElementById('project-container');
const commentsContainer = document.getElementById('comments-container');
const addBtn = document.getElementById('add-btn');
const title = document.createElement('h1');
const imageWrapper = document.createElement('div');
imageWrapper.classList.add('.imageWrapper');
const image = document.createElement('img');
const description = document.createElement('p');
const capitalRequired = document.createElement('p')
const capitalRaised = document.createElement('p');


const projectId = localStorage.getItem("projectId");
let project = null;
let currentUser = null;

onAuthStateChanged(auth, (user)=>{
    if(user){
        currentUser = user;
    }
})


// fetching project details from database

async function fetchProject(){
    const snapShot = await getDoc(doc(db,"projects",projectId));
    project = snapShot.data();
    title.innerText = project.title;
    image.src = project.imageURL;
    description.innerText = project.description;
    capitalRequired.innerText = `Capital Required : ₹ ${project.capitalRequired}`;
    capitalRaised.innerText = `Capital Raised : ₹ ${project.capitalRaised} (${((project.capitalRaised/project.capitalRequired)*100).toFixed(2)} %)`;
    imageWrapper.append(image);
    projectContainer.append(title,imageWrapper,description,capitalRequired,capitalRaised);
    
}


const commentSnapshot = collection(db,"projects",projectId,"comments");
console.log(projectId);

// adding comments to database

addBtn.addEventListener('click', async()=>{
    const comment = document.querySelector('textarea').value;
    if(comment == "" || comment == null){
        alert('Enter Proper Comment');
        return;
    }
    await addDoc(commentSnapshot,{
        comment : comment,
        userEmail: currentUser.email });
        document.querySelector('textarea').value = "";
    await fetchComments();
})


// fetching comments
async function fetchComments() {
    let comments = await getDocs(commentSnapshot);
    comments.forEach((comSnap)=>{
        const comment = comSnap.data();
        displayComment(comment.comment,comment.userEmail)
    })
}

function displayComment(comment,email){
    const div = document.createElement('div');
    const text = document.createElement('p');
    const h5 = document.createElement('h5');
    text.innerText = comment;
    h5.innerText = email;
    div.append(text,h5);
    commentsContainer.append(div);
}

// on window loading

window.onload = async()=>{
    await fetchProject();
    await fetchComments();
}

