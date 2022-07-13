window.addEventListener('DOMContentLoaded', (event)=>{
    createInnerHtml();
});

const createInnerHtml = () =>{
    const headerHtml = "<tr class='table-header'><th></th><th>Name</th><th>Gender</th><th>Salary</th><th>Department</th><th>Start Date</th><th>Actions</th></tr>";
    let employeePayrollDate = createEmployeePayrollJSONObject()[0];
    const innerHtml = `${headerHtml}
        <tr>
            <td><img src="${employeePayrollDate._profilePic}" alt=""></td>
            <td>${employeePayrollDate._name}</td>
            <td>${employeePayrollDate._gender}</td>
            <td>${employeePayrollDate._salary}</td>
            <td>
                <div class="department">${employeePayrollDate._department[0]}</div>
                <div class="department">${employeePayrollDate._department[1]}</div>
            </td>
            <td>${employeePayrollDate._startDate}</td>
            <td class="actions">
                <img id="${employeePayrollDate._id}" onclick="remove(this)" alt="delete" src="../assets/delete.png" width="20px" height="20px">
                <img id="${employeePayrollDate._id}" onclick="update(this)" alt="update" src="../assets/pen.png" width="20px" height="20px">
            </td>
        </tr>
    `;
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
            _startDate:'10 May 2022',
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