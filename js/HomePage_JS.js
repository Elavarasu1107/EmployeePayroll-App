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
    if(employeePayrollList.length == 0) {return;}
    const headerHtml = "<tr class='table-header'><th></th><th>Name</th><th>Gender</th><th>Salary</th><th>Department</th><th>Start Date</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
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
                    <img class="actions" id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete.png" width="20px" height="20px">
                    <img class="actions" id="${employeePayrollData._id}" onclick="update(this)" alt="update" src="../assets/pen.png" width="20px" height="20px">
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