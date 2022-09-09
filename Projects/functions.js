function createCard()
{
    //References
    const modal = document.getElementById("modal")
    const saveModal = document.getElementById("saveTask")
    const closeModal = document.getElementById("cancelTask")
    
    
    modal.showModal(); // Makes the prompt appear
    let cards = retrieveLSData()
    saveModal.addEventListener("click", ()=>{
        // Initizalizing tasks(card)
        let card = new Tasks()
        // Retrieving input field values
        card.taskName = document.getElementById("formName").value
        card.assginee = document.getElementById("assignedMembers").value
        card.priority = document.getElementById("priority").value
        card.tags = document.getElementById("tags").value
        card.status = document.getElementById("status").value
        card.storyPoints = document.getElementById("storyPoints").value
        card.details = document.getElementById("details").value
        
        //Ensuring no empty fields
        if (card.taskName == ""|| card.assginee== "" || card.priority == ""|| card.tags == "" || card.status == "" || card.storyPoints == "" || card.details == "")
        {
            alert("One or more fields are empty, please do not leave fields empty!")
        }
        else
        {
            cards.push(card)
            updateLSData(cards)
            modal.close();
            clearFields()
        } 
    })

    //Closes the modal window once anything outside the window is clicked
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.close();
        }
      } 

    closeModal.addEventListener("click", () =>{
        modal.close();
        clearFields()
    })
}

// Function to clear fields
function clearFields(){
    //Getting references
    let taskName = document.getElementById("formName")
    let assginee = document.getElementById("assignedMembers")
    let tags = document.getElementById("tags")
    let status = document.getElementById("status")
    let priority = document.getElementById("priority")
    let storyPoints = document.getElementById("storyPoints")
    let details = document.getElementById("details")
    
    //Resetting values
    taskName.value =""
    assginee.value = "Justin"
    tags.value = "Bugs"
    priority.value = "High"
    status.value = "To-Do"
    storyPoints.value = ""
    details.value = ""
}
function retrieveLSData()
{
    if (localStorage.getItem("cards")!= null)
    {
        return JSON.parse(localStorage.getItem("cards"))
    }
    else
    {
        intialization = []
        localStorage.setItem("cards", JSON.stringify(intialization))
        return JSON.parse(localStorage.getItem("cards"))
    }
}
function updateLSData(data)
{
    localStorage.setItem("cards", JSON.stringify(data))
}

function showCards(){
    document.getElementById("card.taskName").textContent = card.taskName


}
