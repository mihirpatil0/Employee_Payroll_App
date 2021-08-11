const salary = document.querySelector('#salary')
const output = document.querySelector('.salary-output')
output.textContent = salary.value;
salary.addEventListener('input', function ()
{
       output.textContent = salary.value
});

const text = document.querySelector('#name')
const textError = document.querySelector('.text-error')
text.addEventListener('input',function ()
{   
	let nameRegex = RegExp("^[A-Z]{1}[A-Za-z]{2,}$")
	if (nameRegex.test(text.value))
	{
		textError.textContent = ""
	}
	else
	{
		textError.textContent = "Name is Incorrect"
	} 
});

document.getElementById("reset").onclick = function ()
{
    document.getElementById("emp-form-html").reset();
	alert("Form has been reseted.");
}

document.getElementById("submitButton").onclick = function () 
{
    try
	{
	let name = document.getElementById("name").value;
    let picture = document.querySelector('input[name = profile]:checked').value;
    let gender = document.querySelector('input[name = gender]:checked').value;
    let department = document.querySelector('input[name = department]:checked').value;
    let salary = document.getElementById("salary").value;
    let startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value), parseInt(document.getElementById("day").value));
	let notes = document.getElementById("notes").value;
	let employee = new EmployeeInfo("name","picture","gender","department","salary","startDate","notes");
	alert(employee.toString());
	}
	catch(error)
	{
		alert(error);
	}
};