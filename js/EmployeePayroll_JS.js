class EmployeePayroll
{
    id;

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
        let now = new Date();
        if(startDate > now)
        {
            throw "Start Date is a Future Date";
        }
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if(diff/(1000 * 60 * 60 * 24) > 30)
        {
            throw "Start Date is beyond 30 Days";
        }
        this._startDate = startDate;
    }

    get notes(){
        return this._notes;
    }
    set notes(notes){
        this._notes = notes;
    }

    toString()
    {
        const options ={year:'numeric', month:'short', day:'numeric'};
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString('en-GB', options);
        return "Id: " + this.id + ", Name: " + this.name + ", Profile Pic: " + this.profilePic + ", Gender: " + this.gender + 
        ", Department: " + this.department + ", Salary: " + this.salary + ", StartDate: " + empDate + ", Notes: " + this.notes;
    }
}