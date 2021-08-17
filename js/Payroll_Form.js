let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener( 'DOMContentLoaded', (event) =>
{
	const name = document.querySelector('#name');
	name.addEventListener('input',function ()
	{   
		if(name.value.length == 0)
		{
			setTextValue(".name-error","");
			return;
		}
		try
		{
			(new EmployeePayrollData()).name = name.value;
			setTextValue(".name-error","");
		}
		catch (e)
		{
			setTextValue(".name-error",e);
		}
	});

	function checkFulldate(fulldate)
	{
		try
		{
			new EmployeePayrollData().startDate = fulldate;
			setTextValue(".date-error","");
		}
		catch (error)
		{
			setTextValue(".date-error",error);
		} 
	  }
	  const day = document.querySelector("#day");
	  const month = document.querySelector("#month");
	  const year =  document.querySelector("#year");
	  day.addEventListener("change" ,function()
	  {
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
	setTextValue(".salary-output",salary.value);
	salary.addEventListener('change', function ()
	{
		setTextValue(".salary-output",salary.value);
	});
	checkForUpdate();
	localStorage.removeItem('editEmp');
});

const save = (event) =>
{
	event.preventDefault();
	event.stopPropagation();
	try
	{
		setEmployeePayrollObject();
    	createAndUpdateStorage();
    	resetForm();
    	window.location.replace(site_properties.home_page);
	}
	catch (e)
	{
		alert(e);
		return;
	}
}

function setEmployeePayrollObject()
{
	try
	{
		employeePayrollObj._name = getInputValueById('#name')
	}
	catch (error)
	{
		setTextValue('.name-error',error)
		throw error;
	}
	employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
	employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
	employeePayrollObj._department = getSelectedValues("[name=department]");
	employeePayrollObj._salary = getInputValueById("#salary");
	employeePayrollObj._notes = getInputValueById("#notes");
	let date = getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
	employeePayrollObj._startDate = new Date(date);
}

function createAndUpdateStorage()
{
	let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

	if(employeePayrollList != undefined)
	{
		let employeePayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
    	if(!employeePayrollData)
		{
      		employeePayrollList.push(createEmployeePayrollData());
		}
		else
		{
			const index  = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._Id);
			employeePayrollList.splice(index,1,createEmployeePayrollData(employeePayrollData._id));
		}
	}
	else
	{
		employeePayrollList = [createEmployeePayrollData()]
	}
	alert(employeePayrollList.toString());
	localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const createEmployeePayrollData = (id) =>
{
	let employeePayrollData = new EmployeePayrollData();
	if(!id)
	{
		employeePayrollData._id = new Date().getTime();
	}
	else
	{
		employeePayrollData._id = id;
	}
	setEmployeePayrollData(employeePayrollData);
	return employeePayrollData;
}

function setEmployeePayrollData(employeePayrollData)
{
	try
	{
		employeePayrollData.name = employeePayrollObj._name;
	}
	catch (e)
	{
		setTextValue('.name-error', e);
		throw e;
	}

	employeePayrollData.profilePic = employeePayrollObj._profilePic;
	employeePayrollData.gender = employeePayrollObj._gender;
	employeePayrollData.department = employeePayrollObj._department;
	EmployeePayrollData.salary = getInputValueById("#salary");
	EmployeePayrollData.note = getInputValueById("#notes");
	let date = getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
	try
	{
		EmployeePayrollData.startDate = new Date(date);
	}
	catch (e)
	{
		setTextValue('.date-error',e);
		throw e;
	}
	alert(employeePayrollData.toString());
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

const getInputValueById = (id) =>
{
	let value = document.querySelector(id).value;
	return value;
}

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