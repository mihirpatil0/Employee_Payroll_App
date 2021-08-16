let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener( 'DOMContentLoaded', (event) => {
	
	const text = document.querySelector('#name')
	const textError = document.querySelector('.text-error')
	text.addEventListener('input',function ()
	{   
		if(text.value.length == 0)
		{
			textError.textContent = "";
			return;
		}
		try
		{
			(new EmployeePayrollData()).name = text.value;
			textError.textContent = "";
		}
		catch (e)
		{
			textError.textContent = e;
		}
	});

	function checkFulldate(fulldate) {
		try {
		  new EmployeePayrollData().startDate = fulldate
		  dateError.textContent = ""
		} catch (error) {
		  dateError.textContent = error
		} 
	  }
	  const day = document.querySelector("#day") 
	  const month = document.querySelector("#month")
	  const year =  document.querySelector("#year")
	  const dateError = document.querySelector(".date-error")
	  day.addEventListener("change" ,function() {
		let fulldate = day.value +" "+month.value+" "+year.value
		checkFulldate(fulldate) 
	  })
	  month.addEventListener("change" ,function() {
		let fulldate = day.value +" "+month.value+" "+year.value
		checkFulldate(fulldate) 
	  })
	  year.addEventListener("change" ,function() {
		let fulldate = day.value +" "+month.value+" "+year.value
		checkFulldate(fulldate) 
	  })

	const salary = document.querySelector('#salary');
	const output = document.querySelector('.salary-output');
	output.textContent = salary.value;
	salary.addEventListener('change', function ()
	{
	   output.textContent = salary.value;
	});
	checkForUpdate();
	localStorage.removeItem('editEmp');
});

const save = () =>
{
	try
	{
		let employeePayrollData = createEmployeePayroll();
		createAndUpdateStrorage(employeePayrollData);
	}
	catch (e)
	{
		console.log(e);
		return;
	}
}

function createAndUpdateStrorage(employeePayrollData)
{
	let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

	if(employeePayrollList != undefined)
	{
		employeePayrollList.push(employeePayrollData);
	}
	else
	{
		employeePayrollList = [employeePayrollData];
	}
	alert(employeePayrollList.toString());
	localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () =>
{
	let employeePayrollData = new EmployeePayrollData();
	employeePayrollData.id = new Date().getTime();
	try
	{
		employeePayrollData.name = getInputValueById('#name');
	}
	catch (e)
	{
		setTextValue('.text-error', e);
		throw e;
	}
	employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
	employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
	employeePayrollData.department = getSelectedValues('[name=department]');
	employeePayrollData.salary = getInputValueById('#salary');
	employeePayrollData.note = getInputValueById('#notes');
	let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
	employeePayrollData.startDate = new Date(date);
	alert(employeePayrollData.toString());
	return employeePayrollData;
}

const getSelectedValues = (propertyValue) =>
{
	let allItems = document.querySelectorAll(propertyValue);
	let selItems = [];
	allItems.forEach(item => 
		{
			if(item.checked) selItems.push(item.value);
		});
		return selItems;
}

/*
*	1: querySelector is the newer feature.
*	2: The querySelector method can be used when selecting by element name,
*		nestingm, or class name.
*	3: querySelector lets you find elements with rules that can't be
*		expressed with getElementById.
*/

const getInputValueById = (id) =>
{
	let value = document.querySelector(id).value;
	return value;
}

/*
* 1: getElementById is better supported than querySelector in older versions
*	of the browsers.
* 2: The things with getElementById is that it only allows to select an
*	element by its id.
*/

const getInputElementValue = (id) =>
{
	let value = document.getElementById(id).value;
	return value;
}

const resetForm = () =>
{
	setTextValue('#name','');
	unsetSelectedValues('[name=profile]');
	unsetSelectedValues('[name=gender]');
	unsetSelectedValues('[name=department]');
	setValue('#salary','');
	setValue('#notes','');
	setValue('#day','1,');
	setValue('#month','January');
	setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) =>
{
	let allItems = document.querySelectorAll(propertyValue);
	allItems.forEach(item =>
		{
			item.checked = false;
		});
}

const setTextValue = (id, value) =>
{
	const element = document.querySelector(id);
	element.textContent = value;
}

const setValue = (id, value) =>
{
	const element = document.querySelector(id);
	element.value = value;
}

function checkForUpdate()
{
	const employeePayrollJson = localStorage.getItem('editEmp')
	isUpdate = employeePayrollJson ? true : false;
	if(!isUpdate)
	{
	  return
	}
	employeePayrollObj = JSON.parse(employeePayrollJson)
	setForm()
}
  
function setForm()
{
	setValue("#name",employeePayrollObj._name)
	setSelectedValue("[name=profile]",employeePayrollObj._profileImage)
	setSelectedValue("[name=gender]",employeePayrollObj._gender)
	setSelectedValue("[name=department]",employeePayrollObj._department)
	setValue('#salary',employeePayrollObj._salary)
	setTextValue(".salary-output",employeePayrollObj._salary)
	setValue('#notes',employeePayrollObj._notes)
	let date = stringDate(employeePayrollObj._startDate).split(" ")
	setValue('#day',date[1])
	setValue('#month',date[0])
	setValue('#year',date[2])
}
  
function setSelectedValue(propertyValue,value)
{
	let allItems = document.querySelectorAll
	(propertyValue)
	allItems.forEach(item =>
	{
		if(Array.isArray(value))
		{
			if(value.includes(item.value))
			{
		  		item.checked = true
			}
	  	}
	  	else if (item.value == value)
		{
			item.checked = true
	  	}
	})
}