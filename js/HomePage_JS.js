let employeePayrollList;

window.addEventListener('DOMContentLoaded', (event)=>{
    employeePayrollList = getEmployeeDateFromLocalStorage();
    document.querySelector('.employee-count').textContent = employeePayrollList.length;
    createInnerHtml();
});

const getEmployeeDateFromLocalStorage = () =>{
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
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
                <td>${employeePayrollData._startDate}</td>
                <td>
                    <img class="actions" id="${employeePayrollData._name}" onclick="remove(this)" alt="delete" src="../assets/delete.png">
                    <img class="actions" id="${employeePayrollData._name}" onclick="update(this)" alt="update" src="../assets/pen.png">
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

const remove = (node) =>{
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    if(!employeeData){return;}
    const index =employeePayrollList.map(empData => empData._name).indexOf(employeeData._name);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector('.employee-count').textContent = employeePayrollList.length;
    createInnerHtml();
}