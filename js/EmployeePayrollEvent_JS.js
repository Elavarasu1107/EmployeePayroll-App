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
        checkName(name.value);
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
            checkDate(new Date(Date.parse(startDate)));
            setTextValue('.errorDate', "");
        }
        catch(ex){
            setTextValue('.errorDate', ex);
        }
    });
    document.querySelector('#cancelButton').href = siteProperties.homePage;
    checkForUpdate();
});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        if(siteProperties.use_local_storage.match("true")){
            createLocalStorage();
            resetForm();
            window.location.replace(siteProperties.homePage);
        }
        else{
            createEmployeeJsonServer();
        }
    }
    catch (ex){
        return;
    }
}

const createEmployeeJsonServer = () =>{
    let postUrl = siteProperties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT";
        postUrl = siteProperties.server_url + employeePayrollObject.id.toString();
    }
    makeServiceCall(methodCall, postUrl, true, employeePayrollObject)
        .then(responseText =>{
            resetForm();
            window.location.replace(siteProperties.homePage);
        })
        .catch(error =>{
            throw error;
        });
}

const setEmployeePayrollObject =()=>{
    if(!isUpdate && siteProperties.use_local_storage.match("true")){
        employeePayrollObject.id = createNewEmployee();
    } 
    employeePayrollObject._name = getInputValuesbyId('#name');
    employeePayrollObject._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObject._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObject._department = getSelectedValues('[name=department]');
    employeePayrollObject._salary = getInputValuesbyId('#salary');
    employeePayrollObject._notes = getInputValuesbyId('#notes');
    let date = getInputValuesbyId('#day') + " " + getInputValuesbyId('#month') + " " + getInputValuesbyId('#year');
    employeePayrollObject._startDate = date;
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

const createLocalStorage = () =>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empDate => empDate.id == employeePayrollObject.id);
        if(!empPayrollData){
            employeePayrollList.push(employeePayrollObject);
        }
        else{
            const index = employeePayrollList.map(empDate => empDate.id).indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObject);
        }
    }
    else{
        employeePayrollList = [employeePayrollObject];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createNewEmployee =()=>{
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const resetForm = () =>{
    setValue('#name','');
    unCheckValues('[name = profile]');
    unCheckValues('[name = gender]');
    unCheckValues('[name = department]');
    setValue('#salary','50000');
    document.querySelector('.salary-output').textContent = document.querySelector('#salary').value;
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

const setForm = () =>{
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
            if(item.value === value)
            {
                item.checked = true;
            }
        }
    });
}