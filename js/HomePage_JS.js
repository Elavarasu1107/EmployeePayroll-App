let employeePayrollList;

window.addEventListener('DOMContentLoaded', (event)=>{
    if(siteProperties.use_local_storage.match("true")){
        getEmployeeDateFromLocalStorage();
    }
    else{
        getEmployeeDateFromServer();
    }
});

const getEmployeeDateFromLocalStorage = () =>{
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () =>{
    document.querySelector('.employee-count').textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmployee');
}

const getEmployeeDateFromServer =() =>{
    makeServiceCall("GET", siteProperties.server_url, true)
        .then(responseText =>{
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status: " + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

const createInnerHtml = () =>{
    const headerHtml = "<tr class='table-header'><th></th><th>Name</th><th>Gender</th><th>Salary</th><th>Department</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    if(employeePayrollList.length == 0) {return;}
    for(const employeePayrollData of employeePayrollList)
    {
        innerHtml = `${innerHtml}
            <tr>
                <td><img src="${employeePayrollData._profilePic}" alt=""></td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${getDept(employeePayrollData._department)}</td>
                <td>${stringifyDate(employeePayrollData._startDate)}</td>
                <td>
                    <img class="actions" id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/delete.png">
                    <img class="actions" id="${employeePayrollData.id}" onclick="update(this)" alt="update" src="../assets/pen.png">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table').innerHTML = innerHtml;
}

const getDept = (deptList) =>{
    let dept ='';
    for(const item of deptList)
    {
        dept = `${dept} <div class='department'>${item}</div>`
    }
    return dept;
}

const update = (node) =>{
    let employeeData = employeePayrollList.find(empData => empData.id == node.id);
    if(!employeeData) return; 
    localStorage.setItem('editEmployee', JSON.stringify(employeeData));
    window.location.replace(siteProperties.addEmployee);
}

const remove = (node) =>{
    let employeeData = employeePayrollList.find(empData => empData.id == node.id);
    if(!employeeData) return;
    const index = employeePayrollList.map(empData => empData.id).indexOf(employeeData.id);
    employeePayrollList.splice(index, 1);
    if(siteProperties.use_local_storage.match("true")){
        localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
        document.querySelector('.employee-count').textContent = employeePayrollList.length;
        createInnerHtml();
    }
    else{
        const deleteUrl = siteProperties.server_url + employeeData.id.toString();
        makeServiceCall("DELETE", deleteUrl, false)
            .then(responseText =>{
                createInnerHtml();
            })
            .catch(error =>{
                console.log("Delete Error Status: " + JSON.stringify(error));
            });
    }
}