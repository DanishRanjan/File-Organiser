const fs = require('fs')
const path = require('path')

function treeFn(dirpath) {
    if (dirpath == undefined) {
        console.log("Please enter a valid command");
    } else {
        let doesExist = fs.existsSync(dirpath)
        if (doesExist == true) {
            treeHelper(dirpath, " ")
        }
    }
}

function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile()
    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(targetPath)
        console.log(indent + "└──" + dirName);

        let children = fs.readdirSync(targetPath)
        // console.log(children);

        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i])
            // console.log(childPath);
            treeHelper(childPath, indent + '\t')
        }

    }
}

module.exports={
    treeKey : treeFn
}