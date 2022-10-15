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
            cardHolderRef.innerHTML += `<div class="card1" id="card${id_num}" ">
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
            <div class="card-body" >
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "editCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
                <button class="btn" onclick = "viewCardDetails(${id_num})">View</button>
            </div>
        </div>`
        }
        if (card._priority === "Medium") {
            cardHolderRef.innerHTML += `<div class="card2" id="card${id_num}" >
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
            
            <div class="card-body">
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
                
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "editCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
                <button class="btn" onclick = "viewCardDetails(${id_num})">View</button>
            </div>
        </div>`
        }
        if (card._priority === "Low") {
            cardHolderRef.innerHTML += `<div class="card3" id="card${id_num}" >
            <div class="card-header"><span id="formName${id_num}">${card._taskName}</span></div>
        
            <div class="card-body">
                <div> Team member: <span id="assignedMember${id_num}">${card._assginee}</span> </div>
                <div>Priority: <span id="priority${id_num}">${card._priority}</span> </div>
                <div>Tags: <span id="tags${id_num}">${card._tags}</span> </div>
                <div>Status: <span id="status${id_num}">${card._status}</span> </div>
                <div>Story Points: <span id="storyPoints${id_num}">${card._storyPoints}</span> </div>
                
            </div>
            <div class="card-footer">
                <button class="btn btn-outline" onclick = "editCardDetails(${id_num})">Edit</button>
                <button class="btn" onclick = "deleteModal(${id_num})">Delete</button>
                <button class="btn" onclick = "viewCardDetails(${id_num})">View</button>
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

function editCardDetails(id) {
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
function viewCardDetails(id, isDone = false){
    //References
    const modalView = document.getElementById("modalView")
    const closeModalView = document.getElementById("closeCardView")
    const editModalView = document.getElementById("editTask")
    let cards = retrieveLSDataCards()
    let data = cards[id - 1]
    document.getElementById("formNameView").value = data._taskName
    document.getElementById("assignedMembersView").value = data._assginee
    document.getElementById("priorityView").value = data._priority
    document.getElementById("tagsView").value = data._tags
    document.getElementById("statusView").value = data._status
    document.getElementById("storyPointsView").value = data._storyPoints
    document.getElementById("detailsView").value = data._details
    document.getElementById("typeView").value = data._type
    modalView.showModal(); // Makes the prompt appear
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modalEdit) {
            modalView.close();
        }
    }
    
    editModalView.addEventListener("click", () => {
        modalView.close()
        editCardDetails(id)
    } ,{once:true})
    
    if (isDone == true)
    {
        editModalView.disabled = true
    }
    
    closeModalView.addEventListener("click", () => {
        modalView.close();
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
}

function filterObjects(c){
    var x,i;
    x = retrieveLSDataCards()
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = ``
    if(c != "all"){
        for (i = 0; i<x.length; i++)
        {
            if (x[i]._inSprint == true)
            {
                continue
            }
            if (x[i]._priority == c) {
                if(c == "High"){
                    cardHolderRef.innerHTML += `<div class="card1" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
                    </div>
                </div>`
                }
                if(c == "Medium"){
                    cardHolderRef.innerHTML += `<div class="card2" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
                    </div>
                </div>`
                }
                if(c == "Low"){
                    cardHolderRef.innerHTML += `<div class="card3" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
                    </div>
                </div>`
                }
            }
        }
    }
    else{
        for (i = 0; i<x.length; i++)
        {
            if (x[i]._inSprint == true)
            {
                continue
            }
                if(x[i]._priority == "High"){
                    cardHolderRef.innerHTML += `<div class="card1" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
                    </div>
                </div>`
                }
                if(x[i]._priority == "Medium"){
                    cardHolderRef.innerHTML += `<div class="card2" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                    
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
                    </div>
                </div>`
                }
                if(x[i]._priority == "Low"){
                    cardHolderRef.innerHTML += `<div class="card3" id="card${i}" >
                    <div class="card-header"><span id="formName${i}">${x[i]._taskName}</span></div>
                
                    <div class="card-body">
                        <div> Team member: <span id="assignedMember${i}">${x[i]._assginee}</span> </div>
                        <div>Priority: <span id="priority${i}">${x[i]._priority}</span> </div>
                        <div>Tags: <span id="tags${i}">${x[i]._tags}</span> </div>
                        <div>Status: <span id="status${i}">${x[i]._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${i}">${x[i]._storyPoints}</span> </div>
                        
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${i})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${i})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${i})">View</button>
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
}

var desc = false;
function sortObjects(c){
    var x;
    x = retrieveLSDataCards()
    let cardHolderRef = document.getElementById("cards")
    cardHolderRef.innerHTML = ``
    console.log(x.length);
    let newlst = []
    console.log(newlst.length)
    // x.sort(function(a, b){
    //     if(a < b) { return -1; }
    //     if(a > b) { return 1; }
    //     return 0;
    // })      
    if (c == "asc" && desc == true){
        x.reverse()
        desc = false;
    }
    if (c == "desc" && desc == false){
        x.reverse();
        console.log(c)
        desc = true;
    }    
    console.log(x)
    console.log(desc)
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
    availableTasks()
    modal.showModal(); // Makes the prompt appear
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModalSprint()
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
    // Getting current date to validate date
    let current = new Date()
    let currentYear = current.toLocaleString("default", {year: "numeric"})
    let currentMonth = current.toLocaleString("default",{month :"2-digit"})
    let currentDay = current.toLocaleString("default",{day: "2-digit"})
    let formattedDay = currentYear + "-" + currentMonth + '-' + currentDay
    
    if (document.getElementById("startDate").value < formattedDay) //Check if start date >= current date
    {
        alert("Start date has to be greater or equal to current date!")
        closeModalSprint()
        window.location.reload()
        return
    }
    
    if (document.getElementById("endDate").value < document.getElementById("startDate").value) //Check if end date >= start date
    {
        alert("End date has to be greater or equal to start date!")
        closeModalSprint()
        window.location.reload()
        return
    }
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
        window.location.reload()
    }
}


function showSprint() {

    for (let id_num = 1; id_num < retrieveLSDataSprints().length + 1; id_num += 1) {
        let sprint = retrieveLSDataSprints()[id_num - 1]
        let sprintHolderRef = document.getElementById(sprint._sprintStatus)
        if (sprint._sprintStatus == "Inactive")
        {
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
                <button class="btn" onclick = "deleteSprint(${id_num})">Delete</button>
                <button class="btn" onclick = "viewSprint(${id_num})">View</button>
            </div>
            </div>`
        }else if (sprint._sprintStatus == "Active")
        {
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
                <button class="btn" onclick = "viewSprint(${id_num})">View</button>
                <button class="btn" onclick = "finishSprint()">Finish</button>
            </div>
        </div>`
        }else if (sprint._sprintStatus == "Completed")
        {
            sprintHolderRef.innerHTML += `<div class="card" id="card${id_num}">
            <div class="card-header">
            
            <span id="formName${id_num}">${sprint._sprintNumber}</span></div>

            <div class="card-body">
                <div> Sprint Status: <span id="assignedMember${id_num}">${sprint._sprintStatus}</span> </div>

                <div>Start Date: <span id="priority${id_num}">${sprint._sprintStart}</span> </div>
                <div>End Date: <span id="tags${id_num}">${sprint._sprintEnd}</span> </div>

            </div>
            <div class="card-footer">
            <button class="btn" onclick = "viewSprint(${id_num})">View</button>
            <br>
            </div>
        </div>`
        }
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
    const sprintEdit = document.getElementById("sprintDetailsEdit")
    const applyModal = document.getElementById("applySprintDetails")
    const closeModal = document.getElementById("closeEditSprint")
    let sprints = retrieveLSDataSprints()

    let data = sprints[id-1]
    document.getElementById("sprintNumberEdit").value = data._sprintNumber
    document.getElementById("sprintStatusEdit").value = data._sprintStatus
    document.getElementById("startDateEdit").value = data._sprintStart
    document.getElementById("endDateEdit").value = data._sprintEnd
    if (data._sprintStatus == "Active")
    {
        document.getElementById("sprintStatusEdit").disabled =true
        document.getElementById("startDateEdit").disabled = true
    }
    else
    {
        document.getElementById("sprintStatusEdit").disabled =false
        document.getElementById("startDateEdit").disabled = false
    }
    sprintEdit.showModal(); // Makes the prompt appear

    applyModal.addEventListener("click", () => {
        data._sprintNumber = document.getElementById("sprintNumberEdit").value
        data._sprintStatus = document.getElementById("sprintStatusEdit").value
        data._sprintEnd = document.getElementById("startDateEdit").value
        data._sprintStart = document.getElementById("endDateEdit").value

        localStorage.setItem("sprints", JSON.stringify(sprints))
        sprintEdit.close()

        showSprint() // Update the changes
        window.location.reload()
    })
    //Closes the modal window once anything outside the window is clicked
    window.onclick = function (event) {
        if (event.target == sprintEdit) {
            sprintEdit.close();
        }
    }

    closeModal.addEventListener("click", () => {
        sprintEdit.close()
    })
}

function deleteSprint(id) { 
    if (confirm("Are you sure you want to delete this sprint?") == true) {
        let oldData = retrieveLSDataSprints()
        let oldData_cards = retrieveLSDataCards()

        for (let i=0; i<oldData[id-1]._sprintTasksId.length; i++)
        {
            oldData_cards[oldData[id-1]._sprintTasksId[i]]._inSprint = false
        }
        if (id - 1 == 0) {
            oldData.splice(0, 1)
        }
        else {
            oldData.splice(id - 1, 1)
        }

        let newData = JSON.stringify(oldData)
        let newData_cards = JSON.stringify(oldData_cards)
        localStorage.setItem("sprints", newData)
        localStorage.setItem("cards",newData_cards)
        showSprint() //Reupdate page with new ID
        window.location.reload()
    }
}

function viewSprint(id){
    localStorage.setItem("key", JSON.stringify(id))
    window.location.href= "Sprint_Status.html"
}

function finishSprint() {
    let sprintStatus = document.getElementById("sprintStatusEdit")

    sprintStatus.value = "Completed"
}
function addTime() {
    var hour,min,hres,mres
    hour = Number(document.getElementById('num1').value);
    min = Number(document.getElementById('num2').value);
    mres = mres + min
    if (mres > 59) {
        hres = hres + Math.floor(mres/60);
        mres = mres - Math.floor(mres/60) * 60;
        }
    hres = hres + hour;
  }    
function backButton()
{
    let check = confirm("Are you sure you want to return? ")
    
    if (check)
    {
        window.location.href = "Sprint_Backlog.html"
    }
    
}
function showCardStatus(){
    let id = JSON.parse(localStorage.getItem("key")) 
    let sprints = retrieveLSDataSprints()
    let cards = retrieveLSDataCards()
    let sprintData = sprints[id-1]

    if (sprintData._sprintStatus =="Inactive")
    {
        document.getElementById("startSprint").disabled == false
        document.getElementById("finishSprint").disabled == true
        document.getElementById("viewChart").disabled == true
    }
    else if (sprintData._sprintStatus == "Active")
    {
        document.getElementById("startSprint").disabled == true
        document.getElementById("finishSprint").disabled == false
        document.getElementById("viewChart").disabled == true
    }
    else if (sprintData._sprintStatus == "Completed")
    {
        document.getElementById("startSprint").disabled == true
        document.getElementById("finishSprint").disabled == true
        document.getElementById("viewChart").disabled == false
    }

    for (let id_task =0; id_task < sprintData._sprintTasksId.length; id_task++)
        {
            let card = cards[sprintData._sprintTasksId[id_task]]
            if (sprintData._sprintStatus =="Inactive")
            {
                if (card._status == "To-Do")
                {
                    let cardHolderRef = document.getElementById("toDoInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                        
                        <label class = "hours"><input type="number" id = "hour" min="0" style="width: 50px"placeholder="0">hour(s)</label>
                        <label class = "mins"><input type="number" id = "min" min="0" style="width: 50px"placeholder="0">min(s)</label>
                        <button class="btn btn-outline" onclick = "addTime()">add time log</button>
                        
                        </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${sprintData._sprintTasksId[id_task]})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                        
                        
                </div>`
                }
                else if (card._status == "In Progress" || card._status == "To Review")
                {
                    let cardHolderRef = document.getElementById("inProgInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${sprintData._sprintTasksId[id_task]})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                </div>`
                }
                else if (card._status == "Done")
                {
                    let cardHolderRef = document.getElementById("doneInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "deleteModal(${sprintData._sprintTasksId[id_task]})">Delete</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                </div>`
                }
            }
            else if (sprintData._sprintStatus == "Active")
            {
                if (card._status == "To-Do")
                {
                    let cardHolderRef = document.getElementById("toDoInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                        
                        <label class = "hours"><input type="number" id = "hour" min="0" style="width: 50px"placeholder="0">hour(s)</label>
                        <label class = "mins"><input type="number" id = "min" min="0" style="width: 50px"placeholder="0">min(s)</label>
                        <button class="btn btn-outline" onclick = "addTime()">add time log</button>
            
                        </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                        
                        
                </div>`
                }
                else if (card._status == "In Progress" || card._status == "To Review")
                {
                    let cardHolderRef = document.getElementById("inProgInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                </div>`
                }
                else if (card._status == "Done")
                {
                    let cardHolderRef = document.getElementById("doneInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline" onclick = "editCardDetails(${sprintData._sprintTasksId[id_task]})">Edit</button>
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]})">View</button>
                    </div>
                </div>`
                }
            }
            else if (sprintData._sprintStatus == "Completed")
            {
                if (card._status == "To-Do")
                {
                    let cardHolderRef = document.getElementById("toDoInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                        
                        <label class = "hours"><input type="number" id = "hour" min="0" style="width: 50px"placeholder="0">hour(s)</label>
                        <label class = "mins"><input type="number" id = "min" min="0" style="width: 50px"placeholder="0">min(s)</label>
                        <button class="btn btn-outline" onclick = "addTime()">add time log</button>
            
                        </div>
                    <div class="card-footer">
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]},isDone = true)">View</button>
                    </div>
                        
                        
                </div>`
                }
                else if (card._status == "In Progress" || card._status == "To Review")
                {
                    let cardHolderRef = document.getElementById("inProgInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]},isDone = true)">View</button>
                    </div>
                </div>`
                }
                else if (card._status == "Done")
                {
                    let cardHolderRef = document.getElementById("doneInactive")
                    cardHolderRef.innerHTML+= `<div class="card1" id="card${sprintData._sprintTasksId[id_task]}" ">
                    <div class="card-header"><span id="formName${sprintData._sprintTasksId[id_task]}">${card._taskName}</span></div>
                    <div class="card-body" >
                        <div> Team member: <span id="assignedMember${sprintData._sprintTasksId[id_task]}">${card._assginee}</span> </div>
                        <div>Priority: <span id="priority${sprintData._sprintTasksId[id_task]}">${card._priority}</span> </div>
                        <div>Tags: <span id="tags${sprintData._sprintTasksId[id_task]}">${card._tags}</span> </div>
                        <div>Status: <span id="status${sprintData._sprintTasksId[id_task]}">${card._status}</span> </div>
                        <div>Story Points: <span id="storyPoints${sprintData._sprintTasksId[id_task]}">${card._storyPoints}</span> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn" onclick = "viewCardDetails(${sprintData._sprintTasksId[id_task]},isDone = true)">View</button>
                    </div>
                </div>`
                }
            }
        }
}

