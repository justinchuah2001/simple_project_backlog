function createCard()
{
    //References
    const modal = document.getElementById("modal")
    const saveModal = document.getElementById("saveTask")
    const closeModal = document.getElementById("cancelTask")
    
    modal.showModal(); // Makes the prompt appear
    
    let cards = retrieveLSData();

    saveModal.addEventListener("click", ()=>{
        // Initizalizing tasks(card)
        let card = new Tasks();
        // Retrieving input field values
        card.taskName = document.getElementById("formName").value
        card.assginee = document.getElementById("assignedMembers").value
        card.priority = document.getElementById("priority").value
        card.tags = document.getElementById("tags").value
        card.status = document.getElementById("status").value
        card.storyPoints = document.getElementById("storyPoints").value
        card.details = document.getElementById("details").value
        card.type = document.getElementById("type").value

        //Ensuring no empty fields
        if (checkValidity(card) == true)
        {
            cards.push(card)
            updateLSData(cards)
            modal.close();
            setTimeout(clearFields, 800)
        } 
        
    })
    
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
    let type = document.getElementById("type")
    
    //Resetting values
    taskName.value = ""
    assginee.value = "Justin"
    type.value = "Bugs"
    priority.value = "High"
    status.value = "To-Do"
    storyPoints.value = ""
    details.value = ""
    tags.value = 'Front-end'
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

function checkValidity(card)
{
    if (card.taskName == ""||card.storyPoints == "" || card.details == "")
    {
        alert("One or more fields are empty, please do not leave fields empty!")
        return false
    }
    else
    {
        return true
    }
}