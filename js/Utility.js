const update = (node) =>{
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    if(!employeeData){return;} 
    localStorage.setItem('editEmployee', JSON.stringify(employeeData));
    window.location.replace(siteProperties.addEmployee);
}