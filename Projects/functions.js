function createCard() {
    //References
    const modal = document.getElementById("modalCreate")
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
function retrieveLSDataCards() {
    if (localStorage.getItem("cards") != null) {
        return JSON.parse(localStorage.getItem("cards"))
    }
    else {
        intialization = []
        localStorage.setItem("cards", JSON.stringify(intialization))
        return JSON.parse(localStorage.getItem("cards"))
    }
}

function updateLSDataCards(data) {
    localStorage.setItem("cards", JSON.stringify(data))
}

function retrieveLSDataSprints() {
    if (localStorage.getItem("sprints") != null) {
        return JSON.parse(localStorage.getItem("sprints"))
    }
    else {
        intialization = []
        localStorage.setItem("sprints", JSON.stringify(intialization))
        return JSON.parse(localStorage.getItem("sprints"))
    }
}

function updateLSDataSprints(data) {
    localStorage.setItem("sprints", JSON.stringify(data))
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
function checkValidity_Sprint(sprint) {
    if (sprint.sprintNumber == "" || sprint.sprintStatus == "" || sprint.startDate == "" || sprint.endDate == "") {
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
    for (let id_num = 1; id_num < retrieveLSDataCards().length + 1; id_num += 1) {
        let card = retrieveLSDataCards()[id_num - 1]
        if (card._inSprint == true)
        {
            continue
        }
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
    let cards = retrieveLSDataCards();
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
        updateLSDataCards(cards)
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
    let cards = retrieveLSDataCards()
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
function filter(){
    x = document.getElementById("filterOptions")
    x.showModal();

    window.onclick = function (event) {
        if (event.target == x) {
            x.close();
        }
    }
    cancelModal.addEventListener("click", () => {
        x.close();
        clearFields()
    })
}

function filterObjects(c){
    var x,i;
    x = retrieveLSDataCards()
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = ``
    if(c != "all"){
        for (i = 0; i<x.length; i++)
        {
            if (x[i]._priority == c) {
                if(c == "High"){
                    cardHolderRef.innerHTML += `<div class="card1" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
                if(c == "Medium"){
                    cardHolderRef.innerHTML += `<div class="card2" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
                if(c == "Low"){
                    cardHolderRef.innerHTML += `<div class="card3" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
            }
        }
    }
    else{
        for (i = 0; i<x.length; i++)
        {
                if(x[i]._priority == "High"){
                    cardHolderRef.innerHTML += `<div class="card1" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
                if(x[i]._priority == "Medium"){
                    cardHolderRef.innerHTML += `<div class="card2" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
                if(x[i]._priority == "Low"){
                    cardHolderRef.innerHTML += `<div class="card3" id="card${i}">
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "showCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                    </div>
                </div>`
                }
            
        }
    }
}

function sort(){
    x = document.getElementById("sortOptions")
    x.showModal();

    window.onclick = function (event) {
        if (event.target == x) {
            x.close();
        }
    }
    cancelModal.addEventListener("click", () => {
        x.close();
        clearFields()
    })
}

function sortObjects(c){
    var x;
    x = retrieveLSDataCards()
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = ``
    console.log(x.length);
    let newlst = []
    console.log(newlst.length)
    x.sort(function(a, b){
        if(a._taskName.toLowerCase() < b._taskName.toLowerCase()) { return -1; }
        if(a._taskName.toLowerCase() > b._taskName.toLowerCase()) { return 1; }
        return 0;
    })      
    if (c == "desc"){
        x.reverse();
        console.log(c)
    }    
    console.log(x)
    let sortedData = JSON.stringify(x)
    localStorage.setItem("cards", sortedData)
    showCard()
}
function deleteModal(id) { 
    if (confirm("Are you sure you want to delete this task?") == true) {
        let oldData = retrieveLSDataCards()
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
    let sprints = retrieveLSDataSprints()
    modal = document.getElementById("sprintCreate")

    modal.showModal(); // Makes the prompt appear

    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.close();
        }
    }
}

function closeModalSprint(){
    document.getElementById("sprintCreate").close()
    document.getElementById("sprintCreate").innerHTML = `<h3>Sprint Details</h3>
    <form>
        <label class="inputFields">Sprint: <input type="text" id="sprintNumber" placeholder="sprintNumber"></label>
        <br>
        
        <label class="inputFields">Status: </label>
        <select id="sprintStatus" name="" style="width: 100px;">
            <option style='background-color:red;'>Inactive</option>
            <option style='background-color:yellow;'>Active</option>
            <option style='background-color:green;'>Completed</option>
        </select>
        <br>

        <label class="inputFields">Start date:</label>
        <input type="date" id="startDate" name="">
        <br>

        <label class="inputFields">End date:</label>
        <input type="date" id="endDate" name="">
        <br>


    </form>
    <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 20px;" id="saveSprint"
        onclick="sprintCreate()">Save </button>
    <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 20px;"
        id="cancelSprint" onclick="closeModalSprint()">Cancel</button>
    <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 20px;"
        id="showTasks" onclick="availableTasks()">Show Tasks</button>
    <br>`
}

function availableTasks(){
    let currentData = retrieveLSDataCards()
    let availableTask = false
    temp = `   <label class="inputFields">Tasks:</label> <br>
    <form action="/action_page.php" id ="availableTasks">`
    for (let i=0; i<currentData.length; i++)
    {
        if (currentData[i]._inSprint == false){
            temp+=`<input type="checkbox" id="task${i}" name="task" value="${i}">
            <label for="task${i}"> ${currentData[i]._taskName}</label><br>`
            availableTask = true
        }
    }
    temp+= `</form>`
    if (availableTask == true){
        document.getElementById("sprintCreate").innerHTML += temp
        }
    }
    
function sprintCreate()
{
    const modal = document.getElementById("sprintCreate")
    let cards = retrieveLSDataCards();
    let sprints = retrieveLSDataSprints()
    // Initizalizing Sprints
    let sprint = new Sprints();
    // Retrieving input field values
    sprint._sprintNumber = document.getElementById("sprintNumber").value
    sprint._sprintStatus = document.getElementById("sprintStatus").value
    sprint._sprintStart = document.getElementById("startDate").value
    sprint._sprintEnd = document.getElementById("endDate").value
    let tasks = document.getElementsByName("task")
    let sprintTasksId = []
    for ( let i=0; i<tasks.length;i++)
    {
        if (tasks[i].checked)
        {
            sprintTasksId.push(tasks[i].value)
        }
    }
    sprint._sprintTasksId = sprintTasksId
    let sprintTasks =[]
    for (let i=0; i<sprintTasksId.length; i++)
    {
        sprintTasks.push(cards[sprintTasksId[i]])
        cards[sprintTasksId[i]]._inSprint = true
    }
    sprint._sprintTasks = sprintTasks

    //Ensuring no empty fields
    if (checkValidity_Sprint(sprint) == true) {
        sprints.push(sprint)
        updateLSDataCards(cards)
        updateLSDataSprints(sprints)
        showSprint()
        closeModalSprint()
    }
}


function showSprint() {

    for (let id_num = 1; id_num < retrieveLSDataSprints().length + 1; id_num += 1) {
        let sprint = retrieveLSDataSprints()[id_num - 1]
        let sprintHolderRef = document.getElementById(sprint._sprintStatus)
            sprintHolderRef.innerHTML += `<div class="card" id="card${id_num}">
            <div class="card-header">
            
            <span id="formName${id_num}">${sprint._sprintNumber}</span></div>

            <div class="card-body">
                <div> Sprint Status: <span id="assignedMember${id_num}">${sprint._sprintStatus}</span> </div>

                <div>Start Date: <span id="priority${id_num}">${sprint._sprintStart}</span> </div>
                <div>End Date: <span id="tags${id_num}">${sprint._sprintEnd}</span> </div>

            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "showSprintDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
            </div>
        </div>`
        }
    }



function saveSprint() {
    const modal = document.getElementById("sprintCreate")
    let cards = retrieveLSDataCards();
    // Initizalizing tasks(card)
    let card = new Tasks();
    // Retrieving input field values
    sprintNumber = document.getElementById("sprintNumber").value
    sprintStatus = document.getElementById("sprintStatus").value
    startDate = document.getElementById("startDate").value
    endDate = document.getElementById("endDate").value
    //tasks = document.getElementById("tasks").value

    //Ensuring no empty fields
    // if (checkValidity(card) == true) {
    //     cards.push(card)
    //     updateLSData(cards)
    //     showSprint(card)
    //     modal.close();
    //     setTimeout(clearFields, 300)
    // }

    cards.push(card)
    updateLSDataCards(cards)
    showSprint(card)        
    modal.close()

}

function showSprintDetails(id) {
    //References
    const sprintEdit = document.getElementById("sprintEdit")
    const applyModal = document.getElementById("applyTask")
    const closeModal = document.getElementById("closeCard")
    let cards = retrieveLSDataCards()
    let data = cards[id - 1]
    document.getElementById("sprintNumberEdit").value = data._sprintNumber
    document.getElementById("sprintStatusEdit").value = data._sprintStatus
    document.getElementById("startDateEdit").value = data._startDate
    document.getElementById("endDateEdit").value = data._endDate
    document.getElementById("tasksEdit").value = data._tasks
    sprintEdit.showModal(); // Makes the prompt appear

    applyModal.addEventListener("click", () => {
        data._sprintNumber = document.getElementById("sprintNumberEdit").value
        data._sprintStatus = document.getElementById("sprintStatusEdit").value
        data._startDate = document.getElementById("startDateEdit").value
        data._endDate = document.getElementById("endDateEdit").value
        data._tasks = document.getElementById("tasksEdit").value

        localStorage.setItem("cards", JSON.stringify(cards))
        sprintEdit.close()
        showSprint() // Update the changes
    })
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == sprintEdit) {
            sprintEdit.close();
        }
    }

    closeModal.addEventListener("click", () => {
        sprintEdit.close();
    })
}