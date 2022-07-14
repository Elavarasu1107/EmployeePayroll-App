let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) =>{
    checkForUpdate();
    const name = document.querySelector('#name');
    const message = document.querySelector('.nameError');
    name.addEventListener('input', function(){
    if(name.value.length == 0)
    {
        message.textContent = "";
        return;
    }
    try{
        (new EmployeePayroll()).name = name.value;
        message.textContent = "";
    }
    catch(ex){
        message.textContent = ex;
    }
    }); 
    
    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
    salaryOutput.textContent = salary.value;
    });
    const date = document.querySelector("#month").value + " " + document.querySelector("#day").value + " " + document.querySelector("#year").value;
    const dateMessage = document.querySelector('.errorDate');
    date.addEventListener('input', function(){
        let givenDate = new Date(date);
        try{
            (new EmployeePayroll()).startDate = givenDate;
            dateMessage.textContent = "";
        }
        catch(ex){
            dateMessage.textContent = ex;
        }
    });
    
});

const save = () =>{
    try{
        let employeePayroll = createEmployeePayroll();
	    createLocalStorage(employeePayroll);
    }
    catch (ex){
        return;
    }
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
    employeePayroll.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayroll.gender = getSelectedValues('[name=gender]').pop();
    employeePayroll.department = getSelectedValues('[name=department]');
    employeePayroll.salary = getInputValuesbyId('#salary');
    employeePayroll.notes = getInputValuesbyId('#notes');
    let date = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
    employeePayroll.startDate = new Date(Date.parse(date)).toLocaleDateString();
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

function createLocalStorage(employeePayroll){
    //localStorage.clear();
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeePayroll);
    }
    else
    {
        employeePayrollList = [employeePayroll];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () =>{
    setValue('#name','');
    unCheckValues('[name = profile]');
    unCheckValues('[name = gender]');
    unCheckValues('[name = department]');
    setValue('#salary','50000');
    setValue('#day','day');
    setValue('#month','month');
    setValue('#year','year');
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


const checkForUpdate =()=>{
    const employeePayrollJSON = localStorage.getItem('editEmployee');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate)return;
    employeePayrollObject = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm =()=>{
    setValue('#name', employeePayrollObject._name);
    setSelectedValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectedValue('[name=gender]', employeePayrollObject._gender);
    setSelectedValue('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary)
    setValue('#notes', employeePayrollObject._notes);
    let date = (employeePayrollObject._startDate).split("/");
    setValue('#day', date[1]);
    setValue('#month', date[0]);
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