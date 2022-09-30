function createCard() {
    //References
    const modal = document.getElementById("modalCreate")
    //const saveModal = document.getElementById("saveTask")
    const cancelModal = document.getElementById("cancelTask")

    modal.showModal(); // Makes the prompt appear

    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.close();
        }
    }

    cancelModal.addEventListener("click", () => {
        modal.close();
        clearFields()
    })
}

// Function to clear fields
function clearFields() {
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
function retrieveLSData() {
    if (localStorage.getItem("cards") != null) {
        return JSON.parse(localStorage.getItem("cards"))
    }
    else {
        intialization = []
        localStorage.setItem("cards", JSON.stringify(intialization))
        return JSON.parse(localStorage.getItem("cards"))
    }
}

function updateLSData(data) {
    localStorage.setItem("cards", JSON.stringify(data))
}

function checkValidity(card) {
    if (card.taskName == "" || card.storyPoints == "" || card.details == "") {
        alert("One or more fields are empty, please do not leave fields empty!")
        return false
    }
    else {
        return true
    }
}

function showCard() {
    //Reference to card holders
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = `` //Temporary measure to be revisited
    for (let id_num = 1; id_num < retrieveLSData().length + 1; id_num += 1) {
        let card = retrieveLSData()[id_num - 1]
        if (card._priority === "High") {
            cardHolderRef.innerHTML += `<div class="card1" id="card${id_num}">
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
            <div class="card-body">
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>`
        }
        if (card._priority === "Medium") {
            cardHolderRef.innerHTML += `<div class="card2" id="card${id_num}">
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
            
            <div class="card-body">
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
                
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>`
        }
        if (card._priority === "Low") {
            cardHolderRef.innerHTML += `<div class="card3" id="card${id_num}">
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
        
            <div class="card-body">
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
                
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>`
        }
    }

}

function saveModal() {
    const modal = document.getElementById("modalCreate")
    let cards = retrieveLSData();
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
    if (checkValidity(card) == true) {
        cards.push(card)
        updateLSData(cards)
        showCard(card)
        modal.close();
        setTimeout(clearFields, 300)
    }
}

function showCardDetails(id) {
    //References
    const modalEdit = document.getElementById("modalEdit")
    const applyModal = document.getElementById("applyTask")
    const closeModal = document.getElementById("closeCard")
    let cards = retrieveLSData()
    let data = cards[id - 1]
    document.getElementById("formNameEdit").value = data._taskName
    document.getElementById("assignedMembersEdit").value = data._assginee
    document.getElementById("priorityEdit").value = data._priority
    document.getElementById("tagsEdit").value = data._tags
    document.getElementById("statusEdit").value = data._status
    document.getElementById("storyPointsEdit").value = data._storyPoints
    document.getElementById("detailsEdit").value = data._details
    document.getElementById("typeEdit").value = data._type
    modalEdit.showModal(); // Makes the prompt appear

    applyModal.addEventListener("click", () => {
        data._taskName = document.getElementById("formNameEdit").value
        data._assginee = document.getElementById("assignedMembersEdit").value
        data._priority = document.getElementById("priorityEdit").value
        data._tags = document.getElementById("tagsEdit").value
        data._status = document.getElementById("statusEdit").value
        data._storyPoints = document.getElementById("storyPointsEdit").value
        data._details = document.getElementById("detailsEdit").value
        data._type = document.getElementById("typeEdit").value
        localStorage.setItem("cards", JSON.stringify(cards))
        modalEdit.close()
        showCard() // Update the changes
    })
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modalEdit) {
            modalEdit.close();
        }
    }

    closeModal.addEventListener("click", () => {
        modalEdit.close();
    })
}

function deleteModal(id) {
    if (confirm("Are you sure you want to delete this task?") == true) {
        let oldData = retrieveLSData()
        if (id - 1 == 0) {
            oldData.splice(0, 1)
        }
        else {
            oldData.splice(id - 1, 1)
        }

        let newData = JSON.stringify(oldData)
        localStorage.setItem("cards", newData)
        showCard() //Reupdate page with new ID
    }
}

/////SPRINT BACKLOG
function createSprint() {
    const modal = document.getElementById("sprintCreate")
    const cancelModal = document.getElementById("cancelTask")

    modal.showModal(); // Makes the prompt appear

    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.close();
        }
    }

    cancelModal.addEventListener("click", () => {
        modal.close();
        clearFields()
    })
}

function sprintCreate()
{
    const modal = document.getElementById("sprintCreate")
    let cards = retrieveLSData();
    // Initizalizing tasks(card)
    let card = new Tasks();
    // Retrieving input field values
    card.sprintName = document.getElementById("formName").value
    card.sprintStatus = document.getElementById("sprintStatus").value
    card.startDate = document.getElementById("startDate").value
    card.endDate = document.getElementById("endDate").value
    card.tasks = document.getElementById("tasks").value

    //Ensuring no empty fields
    if (checkValidity(card) == true) {
        cards.push(card)
        updateLSData(cards)
        showCard(card)
        modal.close();
        setTimeout(clearFields, 300)
    }
}


// Function to clear fields
function clearFields() {
    //Getting references
    let sprintName = document.getElementById("formName").value
    let sprintStatus = document.getElementById("sprintStatus").value
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value
    let tasks = document.getElementById("tasks").value

    //Resetting values
    sprintName.value = ""
    sprintStatus.value = ""
    startDate.value = ""
    endDate.value = ""
    tasks.value = ""
}



function showSprint() {
    //Reference to card holders
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = `` //Temporary measure to be revisited
    for (let id_num = 1; id_num < retrieveLSData().length + 1; id_num += 1) {
        let card = retrieveLSData()[id_num - 1]
    
            cardHolderRef.innerHTML += `<div class="card" id="card${id_num}">
            <div class="card-header">
            
            <span id="formName${id_num}">${card._sprintName}</span></div>

            <div class="card-body">
                <div> Sprint Status: <span id="assignedMember${id_num}">${card._sprintStatus}</span> </div>

                <div>Start Date: <span id="priority${id_num}">${card._startDate}</span> </div>
                <div>End Date: <span id="tags${id_num}">${card._endDate}</span> </div>
                <div>Tasks: <span id="status${id_num}">${card._tasks}</span> </div>

            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>

            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>`
        }
    }



function saveSprint() {
    const modal = document.getElementById("sprintCreate")
    let cards = retrieveLSData();
    // Initizalizing tasks(card)
    let card = new Tasks();
    // Retrieving input field values
    sprintName = document.getElementById("formName").value
    sprintStatus = document.getElementById("sprintStatus").value
    startDate = document.getElementById("startDate").value
    endDate = document.getElementById("endDate").value
    tasks = document.getElementById("tasks").value

    //Ensuring no empty fields
    if (checkValidity(card) == true) {
        cards.push(card)
        updateLSData(cards)
        showCard(card)
        modal.close();
        setTimeout(clearFields, 300)
    }
}

function showSprintDetails(id) {
    //References
    const modalEdit = document.getElementById("modalEdit")
    const applyModal = document.getElementById("applyTask")
    const closeModal = document.getElementById("closeCard")
    let cards = retrieveLSData()
    let data = cards[id - 1]
    document.getElementById("sprintNameEdit").value = data._sprintName
    document.getElementById("sprintStatusEdit").value = data._sprintStatus
    document.getElementById("startDateEdit").value = data._startDate
    document.getElementById("endDateEdit").value = data._endDate
    document.getElementById("tasksEdit").value = data._tasks
    modalEdit.showModal(); // Makes the prompt appear

    applyModal.addEventListener("click", () => {
        data._sprintName = document.getElementById("sprintNameEdit").value
        data._sprintStatus = document.getElementById("sprintStatusEdit").value
        data._startDate = document.getElementById("startDateEdit").value
        data._endDate = document.getElementById("endDateEdit").value
        data._tasks = document.getElementById("tasksEdit").value

        localStorage.setItem("cards", JSON.stringify(cards))
        modalEdit.close()
        showCard() // Update the changes
    })
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modalEdit) {
            modalEdit.close();
        }
    }

    closeModal.addEventListener("click", () => {
        modalEdit.close();
    })
}