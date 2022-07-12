//Salary Range
{
    const salary = document.querySelector('#salary');
    const message = document.querySelector('.salary-output');
    salary.addEventListener('input', function(){
        message.textContent = salary.value;
    });
}

//Name Validation
{
    const name = document.querySelector('#name');
    const message = document.querySelector('.nameError');
    name.addEventListener('input', function()
    {
        let nameCheck = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameCheck.test(name.value))
        {
            message.textContent = "";
        }
        else if(name.value == "")
        {
            message.textContent = "";
        }
        else
        {
            message.textContent = "Wrong Name Format";
        }
    });
}