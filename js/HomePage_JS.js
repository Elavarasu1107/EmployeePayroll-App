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
    //let employeePayrollList = createEmployeePayrollJSONObject();
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
                <td class="actions">
                    <img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete.png" width="20px" height="20px">
                    <img id="${employeePayrollData._id}" onclick="update(this)" alt="update" src="../assets/pen.png" width="20px" height="20px">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table').innerHTML = innerHtml;
}

const createEmployeePayrollJSONObject = () =>{
    let employeePayrollListLocal = [
        {
            _name: 'Elavarasu',
            _gender: 'Male',
            _department:[
                'Engineer',
                'Others'
            ],
            _salary: '50000',
            _startDate:'10 June 2022',
            _note:'',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profile/employee-1.jpeg'
        },
        {
            _name: 'Nantha Gopal',
            _gender: 'Male',
            _department:[
                'Engineer',
                'HR'
            ],
            _salary: '70000',
            _startDate:'10 May 2022',
            _note:'',
            _id: new Date().getTime()+1,
            _profilePic: '../assets/Profile/employee-4.jpeg'
        }
    ];
    return employeePayrollListLocal;
}

const getDept = (deptList) =>{
    let dept ='';
    for(const item of deptList)
    {
        dept = `${dept} <div class='department'>${item}</div>`
    }
    return dept;
}