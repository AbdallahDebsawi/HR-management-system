//constructor

let employeeSectionEl = document.getElementById("employeeSection");
let adminstrationSectionEl = document.getElementById("administration");
let marketingSectionEl = document.getElementById("marketing");
let developmentSectionEl = document.getElementById("development");
let financeSectionEl = document.getElementById("finance");
let tableEl = document.getElementById("tableId");
let employeeArray = [];
function Employee(fullName, department, level, imageUrl, id, salary) {
    this.id = id || this.randomId();
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = salary || this.calculateNetSalary();
    employeeArray.push(this);
}

Employee.prototype.calculateNetSalary = function () {
    // Math.floor(Math.random() * (max - min + 1) + min)
    let salary;
    let levelLower = this.level.toLowerCase();
    switch (true) {
        case levelLower.includes('junior'):
            salary = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
            break;
        case levelLower.includes('mid') && levelLower.includes('senior'):
            salary = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
            break;
        case levelLower.includes('senior'):
            salary = Math.floor(Math.random() * (2000 - 1500 + 1) + 1500);
            break;
        default:
            salary = 0;
    }
    // return net salary
    return Math.floor(salary - (salary * 0.075));
}

Employee.prototype.render = function () {
    let employeeCard = document.createElement('div');
    employeeCard.classList.add('employee-card');

    //image:
    let image = document.createElement('img');
    image.src = this.imageUrl;
    employeeCard.appendChild(image);

    //name:
    let name = document.createElement('p');
    name.textContent = "Name: " + this.fullName;
    employeeCard.appendChild(name);

    //id
    let id = document.createElement('p');
    id.textContent = "ID: " + this.id;
    employeeCard.appendChild(id);

    //department:
    let department = document.createElement('p');
    department.textContent = "Department: " + this.department;
    employeeCard.appendChild(department);

    //level:
    let level = document.createElement('p');
    level.textContent = "Level: " + this.level;
    employeeCard.appendChild(level);

    //salary
    let salary = document.createElement('p');
    salary.textContent = "Net Salary:" + this.salary;
    employeeCard.appendChild(salary);

    switch (this.department.toLowerCase()) {
        case 'administration':
            adminstrationSectionEl.appendChild(employeeCard);
            break;
        case 'marketing':
            marketingSectionEl.appendChild(employeeCard);
            break;
        case 'development':
            developmentSectionEl.appendChild(employeeCard);
            break;
        case 'finance':
            financeSectionEl.appendChild(employeeCard);
            break;

    }
    // employeeSectionEl.appendChild(employeeCard);

}

Employee.prototype.randomId = function () {
    return 1000 + employeeArray.length;
    // return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

// Ensure DOM content is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function () {
    initApp();
});

function initApp() {
    if (!localStorage.getItem("employees")) {
        initializeEmployees();
    }
    getData();
}

function initializeEmployees() {
    // Initialize default employees only if localStorage is empty
    new Employee('Ghazi Samer', 'Administration', 'Senior', 'assets/Ghazi.jpg', 1000);
    new Employee('Lana Ali', 'Finance', 'Senior', 'assets/Lana.jpg', 1001);
    new Employee('Tamara Ayoub', 'Marketing', 'Senior', 'assets/Tamara.jpg', 1002);
    new Employee('Safi Walid', 'Administration', 'Mid-Senior', 'assets/Safi.jpg', 1003);
    new Employee('Omar Zaid', 'Development', 'Senior', 'assets/Omar.jpg', 1004);
    new Employee('Rana Saleh', 'Development', 'Junior', 'assets/Rana.jpg', 1005);
    new Employee('Hadi Ahmad', 'Finance', 'Mid-Senior', 'assets/Hadi.jpg', 1006);
    saveData(employeeArray);
}


function renderAll() {
    for (let i = 0; i < employeeArray.length; i++) {
        // employeeArray[i].calculateNetSalary();
        employeeArray[i].render();
    }
}

//events
let formEl = document.getElementById("formID");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // for text input
    let fullName = event.target.fullName.value
    let department = event.target.department.value;
    let level = event.target.level.value;
    let image = event.target.image.value;

    // create a new Employee
    let newEmployee = new Employee(fullName, department, level, image,);
    newEmployee.render();
    saveData(employeeArray);
}

//local storage 
function saveData(data) {
    let stringfiyData = JSON.stringify(data);
    localStorage.setItem("employees", stringfiyData);
}


function getData() {
    let retrievedData = localStorage.getItem("employees");
    let arrayData = JSON.parse(retrievedData);
    if (arrayData != null) {
        // reinstantiation: 
        employeeArray = [];
        for (let i = 0; i < arrayData.length; i++) {
            new Employee(arrayData[i].fullName, arrayData[i].department, arrayData[i].level, arrayData[i].imageUrl,
                arrayData[i].id, arrayData[i].salary);
        }
    }
    renderAll();
}
