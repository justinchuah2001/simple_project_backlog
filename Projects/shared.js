class Tasks
{
    //Constructor
    constructor()
    {
        this.taskName= "";
        this.assginee = "";
        this.priority = "";
        this.tags = "";
        this.status = "";
        this.storyPoints = 0;
        this.type = "";
    }
    
    //Accessor
    get taskName() {return this.taskName};
    get assginee() {return this.assginee};
    get priority() {return this.priority};
    get tags() {return this.tags};
    get status() {return this.status};
    get storyPoints() {return this.storyPoints};
    get type() {return this.type};
    
    //Mutators
    set taskName(newTaskName)
    {
        this.taskName = newTaskName;
    }
    set assginee(newAssginee)
    {
        this.assginee = newAssginee;
    }
    set priority(newPriority)
    {
        this.priority = newPriority;
    }
    set tags(newTags)
    {
        this.tags = newTags;
    }
    set status(newStatus)
    {
        this.status = newStatus;
    }
    set storyPoints(newStoryPoints)
    {
        this.storyPoints = newStoryPoints;
    }
    set type(newType)
    {
        this.type = newType;
    }
}