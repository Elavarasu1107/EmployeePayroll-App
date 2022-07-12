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