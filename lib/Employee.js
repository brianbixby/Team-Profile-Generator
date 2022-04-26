"use strict";

class Employee {
	constructor(name, id, email, role = "Employee") {
		const names = name.trim().split(' ');
		name = names.reduce((acc, name) => acc += " " + name[0].toUpperCase() + name.substring(1).toLowerCase(), "");

		this.name = name;
		this.email = email.trim().toLowerCase();
		this.id = id.trim();
		this.role = role;
	}
	getName() {
		return this.name;
	}
	getId() {
		return this.id;
	}
	getEmail() {
		return this.email;
	}
	getRole() {
		return this.role;
	}
}

module.exports = Employee;