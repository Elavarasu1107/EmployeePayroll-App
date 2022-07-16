const stringifyDate = (date) =>{
    const options ={day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const checkName =(name) =>{
    let nameCheck = RegExp('^[A-Z]{1,}[a-zA-Z]{2,}$');
    if(!nameCheck.test(name)){
        throw "Name is Incorrect";
    }
}

const checkDate = (startDate) =>{
    let now = new Date();
    if(startDate > now)
    {
        throw "Start Date is a Future Date";
    }
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if(diff/(1000 * 60 * 60 * 24) > 30)
    {
        throw "Start Date is beyond 30 Days";
    }
}