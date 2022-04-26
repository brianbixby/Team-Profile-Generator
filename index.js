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
		return err;
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
			employeeQuestions(employeeRoleAnswer.role);
		} else {
			const generatedHTML = generateHTML(team);
			await writeToFile(generatedHTML);
		}
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
		return err;
	}
}

async function addIntern(employeeAnswers) {
	try {
		const internAnswer = await inquirer.prompt([
			{
				name: "github",
				message: `What is your INTERN'S SCHOOL?`,
				type: "input"
			}
		]);

		const newIntern = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, internAnswer.github);
		team.push(newIntern);
		await mainMenu();
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
		return err;
	}
}

async function addEngineer(employeeAnswers) {
	try {
		const engineerAnswer = await inquirer.prompt([
			{
				name: "github",
				message: `What is your ENGINEER'S GITHUB USERNAME?`,
				type: "input"
			}
		]);

		const newEngineer = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, engineerAnswer.github);
		team.push(newEngineer);
		await mainMenu();
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
		return err;
	}
}

async function addManager(employeeAnswers) {
	try {
		const managerAnswer = await inquirer.prompt([
			{
				name: "officeNumber",
				message: `What is your MANAGER'S OFFICE NUMBER?`,
				type: "input"
			}
		]);

		const newManager = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, managerAnswer.officeNumber);
		team.push(newManager);
		await mainMenu();
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
		return err;
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
		switch (role) {
			case "MANAGER":
				await addManager(employeeAnswers);
				break;
			case "ENGINEER":
				await addEngineer(employeeAnswers);
				break;
			case "INTERN":
				await addIntern(employeeAnswers);
				break;
			default:
				break;
		}
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
		return err;
	}
}

employeeQuestions("MANAGER");
