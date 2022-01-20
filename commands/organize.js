const fs = require('fs')
const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ]
    , app: ["exe", "dmg", "pkg", "deb"],
};


function organizeFn(dirpath) {
    let destPath
    if (dirpath == undefined) {
        console.log('Please Enter a valid Directory path')
        //check whether dirpath is passed or not 
        return;
    } else {
        let doesExist = fs.existsSync(dirpath)
        //this will tell whether the dirpath exist or not

        if (doesExist == true) {
            destPath = path.join(dirpath, "organized_files");

            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath); // we will only create it it does not already exist 
            } else {
                console.log("This folder Already Exists");
            }
        } else {
            console.log("Please Enter a valid Path");
        }
    }
    organizeHelper(dirpath, destPath)
}

//we are writing this function to categorize our files
function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src) // get all the files and folders inside your source
    // console.log(childNames);

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()
        // console.log(childAddress + " - "+isFile);

        if (isFile == true) {
            let fileCategory = getCategory(childNames[i]);
            // console.log(childNames[i]+" belongs to " + fileCategory);

            sendFiles(childAddress, dest, fileCategory)
        }

    }
}

function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1); // we will take out the extension names of the files
    // console.log(ext);

    for (let type in types) {
        let cTypeArr = types[type];
        // console.log(cTypeArr);

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) { // we matched the extension with the values present in ctypearray
                return type
            }
        }
    }
    return 'others'
}

function sendFiles(srcFilesPath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)

    if (fs.existsSync(catPath) == false) { // checking for category folder path
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilesPath) // we took out the name of the file
    let destFilePath = path.join(catPath, fileName) // here we created a path for the file in category folder

    fs.copyFileSync(srcFilesPath, destFilePath)// copied file from source
    fs.unlinkSync(srcFilesPath) // deleted the files from src
    console.log(fileName + " is copied to " + fileCategory);
}

module.exports={
    organizeKey : organizeFn
}