class Tasks
{
    //Constructor
    constructor()
    {
        this._taskName= "";
        this._assginee = "";
        this._priority = "";
        this._tags = "";
        this._status = "";
        this._storyPoints = 0;
        this._type = "";
        this._details = "";
        this._inSprint = false;
    }
    
    //Accessor
    get taskName() {return this._taskName};
    get assginee() {return this._assginee};
    get priority() {return this._priority};
    get tags() {return this._tags};
    get status() {return this._status};
    get storyPoints() {return this._storyPoints};
    get type() {return this._type};
    get details() {return this._details}
    get inSprint() {return this._inSprint}
    
    //Mutators
    set taskName(newTaskName)
    {
        this._taskName = newTaskName;
    }
    set assginee(newAssginee)
    {
        this._assginee = newAssginee;
    }
    set priority(newPriority)
    {
        this._priority = newPriority;
    }
    set tags(newTags)
    {
        this._tags = newTags;
    }
    set status(newStatus)
    {
        this._status = newStatus;
    }
    set storyPoints(newStoryPoints)
    {
        this._storyPoints = newStoryPoints;
    }
    set type(newType)
    {
        this._type = newType;
    }
    set details(newDetails)
    {
        this._details = newDetails;
    }
    set inSprint(newSprintStatus)
    {
        this._inSprint = newSprintStatus
    }

}

class Sprints
{
    constructor()
    {
        this._sprintNumber = ""
        this._sprintStatus = ""
        this._sprintStart = ""
        this._sprintEnd = ""
        this._sprintTasks = []
        this._sprintTasksId = []
    }
    
    get sprintNumber() {return this._sprintNumber}
    get sprintStatus() {return this._sprintStatus}
    get sprintStart() {return this._sprintStart}
    get sprintEnd() {return this._sprintEnd}
    get sprintTasks() {return this._sprintTasks}
    get sprintTasksId() {return this._sprintTasksId}

    set sprintNumber(newSprintNumber){ this._sprintNumber = newSprintNunmber}
    set sprintStatus(newSprintStatus){ this._sprintStatus = newSprintStatus}
    set sprintStart(newSprintStart){ this._sprintStart = newSprintStart}
    set sprintEnd(newSprintEnd){ this._sprintEnd = newSprintEnd}
    set sprintTasks(newSprintTasks){ this._sprintTasks = newSprintTasks}
    set sprintTasksId(newSprintTasksId){ this._sprintTasksId = newSprintTasksId}
}