const fs = require('fs');
const inquirer = require('inquirer');

const licenses = [
    {
        name: "MIT License",
        url: "https://opensource.org/licenses/MIT",
        badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
      },
      {
        name: "Apache License 2.0",
        url: "https://opensource.org/licenses/Apache-2.0",
        badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
      },
      {
        name: "GNU General Public License v3.0",
        url: "https://www.gnu.org/licenses/gpl-3.0",
        badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
      },
];

inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'projectName'
        },
        {
            type: 'input',
            message: 'Provide a description of the nature and implementation of your project.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Provide instructions for installing your application.',
            name: 'installation'
        },
        {
            type: 'input',
            message: 'Describe the intended usage of your application.',
            name: 'usage'
        },
        {
            type: 'list',
            message: 'Which license would you like to use?',
            name: 'license',
            choices: licenses.map((license) => license.name)
        },
        {
            type: 'input',
            message: 'Should the people choose to assist in your endeavors, how might they go about doing so?',
            name: 'howToContribute'
        },
        {
            type: 'input',
            message: 'Is there anyone that you would like to acknowledge?',
            name: 'contributing'
        },
        {
           type: 'input',
           message: 'Provide detailed instructions on the type of and method by which to test your application.',
           name: 'testing' 
        },
        {
            type: 'input',
            message: 'Should the masses seek an audience with you to discuss your application, what and how are your preferred means of communication?',
            name: 'questions'
        },
        {
            type: 'input',
            message: 'What is your github username?',
            name: 'userName'
        },
        {
            type: 'input',
            message: 'What is the exact name of your github repository?',
            name: 'repoName'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
            validate: function(input) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input)) {
                    return true;
                } else {
                    return 'Please enter a valid email...';
                }
            }
        },
    ])
    .then((answers) => {
        const { projectName, description, installation, usage, license, howToContribute, contributing, testing, questions, userName, repoName, email } = answers;

        const licenseBadge = `![${license} License](https://img.shields.io/badge/license-${license.replace(/ /g, "%20")}-blue.svg)`;
      
        const markdownString = `
# ${projectName.toUpperCase()}

${licenseBadge}
      
## Description
      
${description}
      
## Table of Contents
      
- [Installation](https://github.com/banditheelerpdx/${repoName}#installation)
- [Usage](https://github.com/banditheelerpdx/${repoName}#usage)
- [License](https://github.com/banditheelerpdx/${repoName}#license)
- [Contributing](https://github.com/banditheelerpdx/${repoName}#contributing)
- [Tests](https://github.com/banditheelerpdx/${repoName}#tests)
- [Questions](https://github.com/banditheelerpdx/${repoName}#questions)
- [Contact](https://github.com/banditheelerpdx/${repoName}#contact)

## Installation
      
${installation}
      
## Usage
      
${usage}
      
## License
      
This project is licensed under the ${license} license. See the [LICENSE](${licenses.find(l => l.name === license).url}) file for details.
      
## Contributing
      
The following individuals and/or organizations have contributed to the viability of this application:
${contributing}

If you would like to contribute to the viability or sustainability of this application, read the following:
${howToContribute}
      
## Tests
      
${testing}
      
## Questions
      
${questions}
      
## Contact
      
If you have any questions about the repo, open an issue or contact ${userName} directly at ${email}.
      `;
      
        fs.writeFileSync('README.md', markdownString, { flag: 'w' }, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Successfully created README.md file');
          }
        });

      })
      .catch((err) => console.error(err));

