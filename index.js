"use strict";

const inquirer = require("inquirer");

const fs = require("fs");
const util = require("util");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const generateHTML = require("./src/generateHtml");

const team = [];

async function writeToFile(generatedHTML) {
	try {
		const writeFilePromise = util.promisify(fs.writeFile);
		await writeFilePromise("./dist/index.html", generatedHTML);
	}
	catch (err) {
		console.log("Write File Error");
		throw err;
	}
}

async function mainMenu() {
	try {
		const employeeRoleAnswer = await inquirer.prompt([
			{
				type: 'list',
				message: 'Please select the role of the employee you would like to add.',
				name: 'role',
				choices: ["ENGINEER", "INTERN", "DONE"]
			}
		]);

		if (employeeRoleAnswer.role == "ENGINEER" || employeeRoleAnswer.role == "INTERN") {
			await employeeQuestions(employeeRoleAnswer.role);
		} else {
			const generatedHTML = generateHTML(team);
			await writeToFile(generatedHTML);
		}
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else throw err;
	}
}

async function lastQuestion(employeeAnswers, role) {
	try {
		const question = { name: "other", type: "input" };
		let otherQuestionAnswer, newEmployee;
		switch (role) {
			case "MANAGER":
				question.message = `What is your MANAGER'S OFFICE NUMBER?`;
				otherQuestionAnswer = await inquirer.prompt([question]);
				newEmployee = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, otherQuestionAnswer.other);
				break;
			case "ENGINEER":
				question.message = `What is your ENGINEER'S GITHUB USERNAME?`;
				otherQuestionAnswer = await inquirer.prompt([question]);
				newEmployee = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, otherQuestionAnswer.other);
				break;
			case "INTERN":
				question.message = `What is your INTERN'S SCHOOL?`;
				otherQuestionAnswer = await inquirer.prompt([question]);
				newEmployee = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, otherQuestionAnswer.other);
				break;
			default:
				break;
		}
		team.push(newEmployee);
		await mainMenu();
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else throw err;
	}
}

async function employeeQuestions(role) {
	try {
		const employeeAnswers = await inquirer.prompt([
			{
				name: "name",
				message: `What is your ${role}'S NAME?`,
				type: "input"
			},
			{
				name: "email",
				message: `What is your ${role}'S EMAIL?`,
				type: "input"
			},
			{
				name: "id",
				message: `What is your ${role}'S EMPLOYEE ID?`,
				type: "input"
			}
		]);
		await lastQuestion(employeeAnswers, role);
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else throw err;
	}
}

employeeQuestions("MANAGER");
