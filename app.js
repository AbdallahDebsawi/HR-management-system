//constructor

let employeeSectionEl = document.getElementById("employeeSection");
let adminstrationSectionEl = document.getElementById("administration");
let marketingSectionEl = document.getElementById("marketing");
let developmentSectionEl = document.getElementById("development");
let financeSectionEl = document.getElementById("finance");


function Employee(fullName, department, level, imageUrl) {
    this.id = this.randomId();
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateNetSalary();
    // employeeArray.push(this);
}

Employee.prototype.calculateNetSalary = function () {
    // Math.floor(Math.random() * (max - min + 1) + min)
    let salary;
    switch (this.level) {
        case 'junior':
            salary = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
            break;
        case 'midSenior':
            salary = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
            break;
        case 'senior':
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
    name.textContent = "Name:" + this.fullName;
    employeeCard.appendChild(name);

    //id
    let id = document.createElement('p');
    id.textContent = "ID:" + this.id;
    employeeCard.appendChild(id);

    //department:
    let department = document.createElement('p');
    department.textContent = "Department:" + this.department;
    employeeCard.appendChild(department);

    //level:
    let level = document.createElement('p');
    level.textContent = "Level:" + this.level;
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

Employee.prototype.randomId = function randomId() {
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}
let employeeArray = [
    new Employee('Ghazi Samer', 'Administration', 'Senior', 'assets/Ghazi.jpg'),
    new Employee('Lana Ali', 'Finance', 'Senior', 'assets/Lana.jpg'),
    new Employee('Tamara Ayoub', 'Marketing', 'Senior', 'assets/Tamara.jpg'),
    new Employee('Safi Walid', 'Administration', 'Mid-Senior', 'assets/Safi.jpg'),
    new Employee('Omar Zaid', 'Development', 'Senior', 'assets/Omar.jpg'),
    new Employee('Rana Saleh', 'Development', 'Junior', 'assets/Rana.jpg'),
    new Employee('Hadi Ahmad', 'Finance', 'Mid-Senior', 'assets/Hadi.jpg'),
];
for (let i = 0; i < employeeArray.length; i++) {
    console.log(employeeArray[i]);
    employeeArray[i].calculateNetSalary();
    employeeArray[i].render();
}


//events
let formEl = document.getElementById("formID");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    console.log("Form event", event);
    // for text input
    let fullName = event.target.fullName.value
    let department = event.target.department.value;
    let level = event.target.level.value;
    let image = event.target.image.value;

    // create a new Employee

    let newEmployee = new Employee(fullName, department, level, image,);

    newEmployee.render();
    // console.log(newEmployee);
}