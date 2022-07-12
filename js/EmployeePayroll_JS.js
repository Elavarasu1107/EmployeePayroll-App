class EmployeePayroll
{
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get name() 
    {
        return this._name;
    }
    set name(name)
    {
        let nameCheck = RegExp('^[A-Z]{1,}[a-zA-Z]{2,}$')
            if(nameCheck.test(name)){
            this._name = name;
        }
        else{
            throw "Name should start with capital letter and have atleast 3 letters";
        }
    }

    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }

    get department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }

    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary = salary;
    }

    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        let now = new Date().toLocaleDateString();
        if(startDate <= now)
        {
            this._startDate = startDate;
        }
        else
        {
            throw "Invalid Date";
        }
    }

    get notes(){
        return this._notes;
    }
    set notes(notes){
        this._notes = notes;
    }

    toString()
    {
        return "Id: " + this.id + ", Name: " + this.name + ", Profile Pic: " + this.profilePic + ", Gender: " + this.gender + 
        ", Department: " + this.department + ", Salary: " + this.salary + ", StartDate: " + this.startDate + ", Notes: " + this.notes;
    }
}