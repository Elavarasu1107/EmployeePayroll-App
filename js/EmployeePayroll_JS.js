//Salary Range
{
    const salary = document.querySelector('#salary');
    const message = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
        message.textContent = salary.value;
    });
}