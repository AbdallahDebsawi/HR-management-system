//constructor

let employeeSectionEl = document.getElementById("employeeSection");


function Employee(id, fullName, department, level, imageUrl) {
    this.id = id;
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
        case 'Junior':
            salary = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
            break;
        case 'Mid-Senior':
            salary = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
            break;
        case 'Senior':
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

    let name = document.createElement('h3');
    name.textContent = this.fullName;
    employeeCard.appendChild(name);
    let salary = document.createElement('h5');
    salary.textContent = "Net Salary:" + this.salary;
    employeeCard.appendChild(salary);
    employeeSectionEl.appendChild(employeeCard);

}
let employeeArray = [
    new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior'),
    new Employee(1001, 'Lana Ali', 'Finance', 'Senior'),
    new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior'),
    new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior'),
    new Employee(1004, 'Omar Zaid', 'Development', 'Senior'),
    new Employee(1005, 'Rana Saleh', 'Development', 'Junior'),
    new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior'),
];
for (let i = 0; i < employeeArray.length; i++) {
    console.log(employeeArray[i]);
    employeeArray[i].calculateNetSalary();
    employeeArray[i].render();
}