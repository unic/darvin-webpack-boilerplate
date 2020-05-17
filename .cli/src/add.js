const inquirer = require('inquirer');

const { getScaffoldingOptions, setScaffolding, getNextIncrementalNumber } = require('../../webpack/helpers/scaff-helpers');

const _add = () => {
  let scaffStruct = getScaffoldingOptions();

  inquirer
  .prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select the element to add:',
      choices: scaffStruct
    }
  ])
  .then(response => {
    _addDetails(response);
  });
}

const _addDetails = (response) => {
  let category = response.category;
  let nextDefaultNumber = getNextIncrementalNumber(response.category);

  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "Type the element name:",
      default: () => {
        return nextDefaultNumber
      }
    },
    {
      type: 'input',
      name: 'authorName',
      message: "Type the author name:"
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: "Type the author email:"
    },
    {
      type: 'input',
      name: 'tickets',
      message: "Type the tickets url:"
    },
    {
      type: 'input',
      name: 'projectSpace',
      message: "Type the project space url:"
    },
    {
      type: 'input',
      name: 'design',
      message: "Type the design url:"
    },
  ])
  .then(response => {
    response.category = category;
    _addConfirm(response);
  });
}

const _addConfirm = (response) => {
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'js',
      message: 'Add js base to ' + response.name + ' ?'
    },
    {
      type: 'confirm',
      name: 'preview',
      message: 'Add preview file to ' + response.name + ' ?'
    },
    {
      type: 'confirm',
      name: 'write',
      message: 'Add ' + response.name + ' to ' + response.category + ' ?'
    },
  ])
  .then(confirm => {
    if(confirm.write) {
      console.log("DV#> write scaffold");
      setScaffolding(response, confirm);
    } else {
      console.log("DV#> cancel scaffolding");
    }
  });
}

module.exports = {
  _add: _add
};
