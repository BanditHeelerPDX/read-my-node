const fs = require('fs');
const inquirer = require('inquirer');

inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the title of your project?'
            name: 'projectName'
        },
        {
            
        }
    ])