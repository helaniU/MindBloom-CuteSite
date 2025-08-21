//select container & buttons
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const notes = document.querySelector(".input-box");

//function to load saved notes from localstorage
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes"); //display save notes
}
showNotes(); //load notes on page load

//function to save notes to local storage
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML); //save current notes
}

//add new note 
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p"); //create editable paragraph
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true"); //make editable

    img.src = "/images/trashbin.png";

    notesContainer.appendChild(inputBox).appendChild(img); //add note and icon
})

//note interactions
notesContainer.addEventListener("click", function(e){
    //when click the trash remove the note
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove(); 
        updateStorage();
    
    //when click on note can be editable and save eidts
    }else if(e.target.tagName === "P"){
        notesContainer.querySelectorAll(".input-box").forEach(nt => {
        nt.addEventListener("keyup", updateStorage);
        });
    }
})

// Handle Enter key to insert line breaks in notes instead of submitting
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");   // Add new line inside editable paragraph
        event.preventDefault();
    }
})