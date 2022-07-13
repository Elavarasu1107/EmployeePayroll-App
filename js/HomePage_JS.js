window.addEventListener('DOMContentLoaded', (event)=>{
    createInnerHtml();
});

const createInnerHtml = () =>{
    const innerHtml = `
        <tr class="table-header">
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Start Date</th>
            <th>Actions</th>
        </tr>
        <tr>
            <td><img src="../assets/Profile/employee-1.jpeg" alt="employee-1"></td>
            <td>Elavarasu Appusamy</td>
            <td>Male</td>
            <td>50000</td>
            <td>
                <div class="department">Engineer</div>
                <div class="department">Others</div>
            </td>
            <td>10 May 2022</td>
            <td class="actions">
                <img id="1" onclick="remove(this)" alt="delete" src="../assets/delete.png" width="20px" height="20px">
                <img id="1" onclick="update(this)" alt="update" src="../assets/pen.png" width="20px" height="20px">
            </td>
        </tr>
    `;
    document.querySelector('#table').innerHTML = innerHtml;
}