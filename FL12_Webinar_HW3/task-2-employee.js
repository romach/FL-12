class Employee {
  constructor({
    id,
    firstName,
    lastName,
    birthday,
    salary,
    position,
    department
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.salary = salary;
    this.position = position;
    this.department = department;
    Employee.EMPLOYEES.push(this);
  }

  get age() {
    const [day, month, year] = this.birthday.split("/");
    const birthDate = new Date(year, month - 1, day);
    const ageInMillis = new Date() - birthDate;
    const ageInYears = Math.trunc(ageInMillis / (1000 * 60 * 60 * 24 * 365));
    return ageInYears;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  quit() {
    const currentEmployeeIndex = Employee.EMPLOYEES.findIndex(
      element => element.id === this.id
    );
    Employee.EMPLOYEES.splice(currentEmployeeIndex, 1);
  }

  retire() {
    console.log("It was such a pleasure to work with you!");
    this.quit();
  }

  getFired() {
    console.log("Not a big deal!");
    this.quit();
  }

  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }

  changePosition(newPosition) {
    this.position = newPosition;
  }

  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  getPromoted(properties) {
    for ([key, value] of Object.entries(properties)) {
      const functionName = `change${key[0].toUpperCase() + key.slice(1)}`;
      [functionName].call(this, value);
    }
    console.log("Yoohooo!");
  }

  getPromoted(properties) {
    this.changeProperties(properties);
    console.log("Yoohooo!");
  }

  getDemoted(punishment) {
    this.changeProperties(punishment);
    console.log("Damn!");
  }
}
Object.defineProperty(Employee, "EMPLOYEES", {
  value: [],
  writable: false
});

Employee.prototype.changeProperties = function(properties) {
  const propertyToFunctionMap = {
    salary: this.changeSalary,
    position: this.changePosition,
    department: this.changeDepartment
  };
  for ([key, value] of Object.entries(properties)) {
    propertyToFunctionMap[key].call(this, value);
  }
};

class Manager extends Employee {
  constructor(properties) {
    super({ ...properties, position: "manager" });
  }

  get managedEmployees() {
    return Employee.EMPLOYEES.filter(
      employee =>
        employee.department === this.department &&
        employee.position !== "manager"
    );
  }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
  constructor(properties) {
    super({ ...properties, department: "hr" });
  }
}

class SalesManager extends Manager {
  constructor(properties) {
    super({ ...properties, department: "sales" });
  }
}

const promoter = {
  promote(id, salary) {
    this.managedEmployees
      .find(employee => employee.id === id)
      .getPromoted({ salary });
  }
};

function ManagerPro(manager, promoter) {
  return Object.assign(manager, promoter);
}
