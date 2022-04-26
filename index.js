"use strict";

const inquirer = require("inquirer");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const team = [];

async function addIntern(employeeAnswers) {
    try {

    }
    catch (err) {
        if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
        else console.log(err);
    }
}

async function addEngineer(employeeAnswers) {
    try {

    }
    catch (err) {
        if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
        else console.log(err);
    }
}

async function addManager(employeeAnswers) {
    try {
        const managerAnswers = await inquirer.prompt([
            {
                name: "officeNumber",
                message: `What is your MANAGER'S OFFICE NUMBER?`,
                type: "input"
            }
        ]);

        console.log("employeeAnswers: ", employeeAnswers);
        console.log("managerAnswers: ", managerAnswers);

        const newManager = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, managerAnswers.officeNumber);
        team.push(newManager);
        console.log(trainers);
    }
    catch (err) {
        if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
        else console.log(err);
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
                console.log("manager case")
                await addManager(employeeAnswers);
                break;
            case "ENGINEER":
                console.log("engineer case")
                await addEngineer(employeeAnswers);
                break;
            case "INTERN":
                console.log("intern case")
                await addIntern(employeeAnswers);
                break;

            default:
                console.log("thanks for playing!")
                break;
        }
    }
    catch (err) {
        if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
        else console.log(err);
    }
}

employeeQuestions("MANAGER");
