window.addEventListener('DOMContentLoaded', (event) =>{
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
    setDefaultValue('#name','');
    unCheckValues('[name = profile]');
    unCheckValues('[name = gender]');
    unCheckValues('[name = department]');
    setDefaultValue('#salary','50000');
    setDefaultValue('day','day');
    setDefaultValue('month','month');
    setDefaultValue('year','year');
    setDefaultValue('#notes','');
}

const setDefaultValue = (id, value) =>{
    const item = document.querySelector(id)
    item.textContent = value;
}

const unCheckValues = (propertyValue) =>{
   let allItems = document.querySelectorAll(propertyValue);
   allItems.forEach(item =>{
    item.checked = false;
   });
}