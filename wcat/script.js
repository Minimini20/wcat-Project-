#!/usr/bin/env node

// npm i fs installs fs module which helps in read/write our filesystem 
// we can install these modules either in the same folder of the project or either globally to use that module
// wcat project - similar to cat command of linux used to display contents of file on our system 
// package.josn file helps in storing all information of modules installed in the project under the dependencies 
// if we want to change command of how to start/run our project in our terminal 
// bin is used to set global environment paths setups to run wcat globally without npm run wcat

// const fs = require('fs');
// let data = fs.readFileSync("abc.txt","utf-8");
// fs.writeFileSync("abc.txt",data+" I am from BVCOE");
// console.log(fs.existsSync("abc.txt"));

///process.args in the array of all the commands which user can write, there are two already present default commands which are node path and file path
let cmds  = process.argv.slice(2);
const fs = require('fs');

function wcat(cmds){
    let options = cmds.filter(function(data){
        return data.startsWith("-");
    });
    let files = cmds.filter(function(data){
        return !data.startsWith("-");
    });
    if(files.length == 0){
        console.log("Please specify a file name to read:");
        return;
    }
    for(i in files){
        if(!fs.existsSync(files[i])){
            console.log(files[i]+" does not exist.");
            return;
        }
    }

    ///Writing commands
    if(options.includes("-w")){
        if(options.length!=1 || files.length!=2 || cmds.indexOf("-w")!=1){
            console.log("command not found");
            return;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        fs.writeFileSync(files[1],data);
        return;
    }
    else if(options.includes("-a")){
        if(options.length!=1 || files.length!=2 || cmds.indexOf("-a")!=1){
            console.log("command not found");
            return;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        let data2 = fs.readFileSync(files[1],"utf-8");
        fs.writeFileSync(files[1],data2+"\n"+data);
        return;
    }

    let numbering = 1;

    for(i in files) {
        let data = fs.readFileSync(files[i],"utf-8");
        if(options.includes("-s")) {
            let lines = data.split("\r\n");
            // let allText = "";
            for(j in lines) {
                if(lines[j] != "") {
                    if(options.includes("-n") || options.includes("-b")) {
                        console.log(numbering + ". " + lines[j]);
                        numbering += 1;
                    } else {
                        console.log(lines[j]);
                    }
                    // allText += lines[j] + "\n";
                }
            }
            // console.log(allText);
            // console.log(lines);
        } else if((options.includes("-n") && !options.includes("-b")) || (options.includes("-n") && options.includes("-b") && (options.indexOf("-n") < options.indexOf("-b")))) {
            let lines = data.split("\r\n");
            for(j in lines) {
               console.log(numbering + ". " + lines[j]);
               numbering++; 
            }
        } else if(options.includes("-b")) {
            let lines = data.split("\r\n");
            for(j in lines) {
                if(lines[j] == "") {
                    console.log(lines[j]);
                } else {
                    console.log(numbering + ". " + lines[j]);
                    numbering += 1;
                }
            }
        }
        else {
            console.log(data);
        }
    }
}
wcat(cmds);