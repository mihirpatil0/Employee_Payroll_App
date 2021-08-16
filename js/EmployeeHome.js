let empPayrollList
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmployeeDataFromStorage()
    document.querySelector(".emp-count").textContent = empPayrollList.length
    createInnerHtml();
});

const getEmployeeDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : []
}

const createInnerHtml = () => {
    if (empPayrollList.length == 0) {
        return
    }
    const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
    </tr>`;
    let innerHtml = `${headerHtml}`
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml} 
        <tr>
        <td><img src="${empPayrollData._profilePic}" alt="" class="profile"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringDate(empPayrollData._startDate)}</td>
        <td>
            <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="${empPayrollData._id}" onclick="remove(this)">
            <img src="../assets/icons/create-black-18dp.svg" alt="update" id="${empPayrollData._id}" onclick="update(this)">
        </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml
};

const getDeptHtml = (deptList) => {
    let depthtml = "";
    for (const dept of deptList) {
        depthtml = `${depthtml} <div class="dept-label">${dept}</div>`
    }
    return depthtml
}

function remove(node) {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
    if (!empPayrollData) {
        return
    }
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id)
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList))
    document.querySelector(".emp-count").textContent = empPayrollList.length
    createInnerHtml();
}

function update(node) {
    let empData = empPayrollList.find(empData => empData._id == node.id)
    if (!empData) {
        return
    }
    localStorage.setItem('editEmp', JSON.stringify(empData))
    window.location.replace(site_properties.add_emp_page)
}