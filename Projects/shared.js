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

}
