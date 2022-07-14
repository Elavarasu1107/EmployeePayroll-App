const stringifyDate = (date) =>{
    const options ={day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const update = (node) =>{
    let employeeData = employeePayrollList.find(empData => empData._id == node.id);
    if(!employeeData){return;} 
    localStorage.setItem('editEmployee', JSON.stringify(employeeData));
    window.location.replace(siteProperties.addEmployee);
}