const { log } = require("console");

const helpModule = require('./commands/help')
const organizeModule = require('./commands/organize')
const treeModule = require('./commands/tree')

const fs = require("fs");
const path = require("path");
let inputArr = process.argv.slice(2); //argv argument value




let command = inputArr[0]; //tree, organize , help


switch (command) {

    case 'tree':
        // console.log('Tree implemented');
        treeModule.treeKey(inputArr[1])
        break;
    case 'organize':
        // console.log('Organize implemented');
        organizeModule.organizeKey(inputArr[1])
        break;
    case 'help':
        // console.log('Help implemented');
        helpModule.helpKey();
        break;
    default:
        console.log('Please enter a valid command');
        break;

}





