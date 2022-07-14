let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) =>{
    
    const name = document.querySelector('#name');
    name.addEventListener('input', function(){
    if(name.value.length == 0)
    {
        setTextValue('.nameError', "");
        return;
    }
    try{
        (new EmployeePayroll()).name = name.value;
        setTextValue('.nameError', "");
    }
    catch(ex){
        setTextValue('.nameError', ex);
    }
    }); 
    
    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
    salaryOutput.textContent = salary.value;
    });

    const date = document.querySelector("#date");
    date.addEventListener('input', function(){
        let startDate = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
        try{
            (new EmployeePayroll()).startDate = new Date(Date.parse(startDate));
            setTextValue('.errorDate', "");
        }
        catch(ex){
            setTextValue('.errorDate', ex);
        }
    });
    checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
	    createLocalStorage();
        resetForm();
        window.location.replace(siteProperties.homePage);
    }
    catch (ex){
        return;
    }
}

const setEmployeePayrollObject =()=>{
    employeePayrollObject._id = getInputValuesbyId('#id');
    employeePayrollObject._name = getInputValuesbyId('#name');
    employeePayrollObject._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObject._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObject._department = getSelectedValues('[name=department]');
    employeePayrollObject._salary = getInputValuesbyId('#salary');
    employeePayrollObject._notes = getInputValuesbyId('#notes');
    let date = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
    employeePayrollObject._startDate = date;
}

const createEmployeePayroll = () =>{
    let employeePayroll = new EmployeePayroll();
    try{
        employeePayroll.name = getInputValuesbyId('#name');
    }
    catch (ex){
        setTextValue('.nameError', ex);
        throw ex;
    }
    employeePayroll.id = getInputValuesbyId('#id');
    employeePayroll.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayroll.gender = getSelectedValues('[name=gender]').pop();
    employeePayroll.department = getSelectedValues('[name=department]');
    employeePayroll.salary = getInputValuesbyId('#salary');
    employeePayroll.notes = getInputValuesbyId('#notes');
    let date = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
    employeePayroll.startDate = new Date(Date.parse(date));
    alert(employeePayroll.toString());
    return employeePayroll;
}

const getInputValuesbyId = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item =>{
        if(item.checked)
        {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}

const createLocalStorage = (employeePayroll) =>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empDate => empDate._id == employeePayrollObject._id);
        if(!empPayrollData){
            employeePayrollList.push(createNewEmployeePayroll());
        }
        else{
            const index = employeePayrollList.map(empDate => empDate._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createNewEmployeePayroll(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [employeePayroll];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createNewEmployeePayroll = (id) =>{
    let employeePayroll = new EmployeePayroll();
    if(id){
        employeePayroll.id = createNewEmployee();
    }
    else{
        employeePayroll.id = id;
    }
    setEmployeePayrollData(employeePayroll);
    return employeePayroll;
}

const setEmployeePayrollData =(employeePayroll)=>{
    try{
        employeePayroll.name = employeePayrollObject._name;
    }
    catch(ex){
        setTextValue('.nameError', ex);
    }
    employeePayroll.id = employeePayrollObject._id;
    employeePayroll.profilePic = employeePayrollObject._profilePic;
    employeePayroll.gender = employeePayrollObject._gender;
    employeePayroll.department = employeePayrollObject._department;
    employeePayroll.salary = employeePayrollObject._salary;
    employeePayroll.notes = employeePayrollObject._notes;
    try{
        employeePayroll.startDate = new Date(Date.parse(employeePayrollObject._startDate));
    }
    catch(ex){
        setTextValue('.errorDate', ex);
        throw ex;
    }
    alert(employeePayroll.toString());
}

const createNewEmployee =()=>{
    let employeeID = localStorage.getItem("EmployeeID");
    employeeID = !employeeID ? 1 : parseInt(employeeID+1).toString();
    localStorage.setItem("EmployeeID", employeeID);
    return employeeID;
}

const resetForm = () =>{
    setValue('#id','');
    setValue('#name','');
    unCheckValues('[name = profile]');
    unCheckValues('[name = gender]');
    unCheckValues('[name = department]');
    setValue('#salary','50000');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
    setValue('#notes','');
}

const setValue = (id, value) =>{
    const item = document.querySelector(id)
    item.value = value;
}

const setTextValue = (id, value) =>{
    const item = document.querySelector(id)
    item.textContent = value;
}

const unCheckValues = (propertyValue) =>{
   let allItems = document.querySelectorAll(propertyValue);
   allItems.forEach(item =>{
    item.checked = false;
   });
}

const setSelectedIndex = (id, index) =>{
    const item = document.querySelector(id)
    item.selectedIndex = index;
}

const checkForUpdate =()=>{
    const employeePayrollJSON = localStorage.getItem('editEmployee');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate)return;
    employeePayrollObject = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm =()=>{
    setValue('#id', employeePayrollObject._id);
    setValue('#name', employeePayrollObject._name);
    setSelectedValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectedValue('[name=gender]', employeePayrollObject._gender);
    setSelectedValue('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary)
    setValue('#notes', employeePayrollObject._notes);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValue =(propertyValue, value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
            {
                item.checked = true;
            }
        }
        else
        {
            if(item.value ===value)
            {
                item.checked = true;
            }
        }
    });
}