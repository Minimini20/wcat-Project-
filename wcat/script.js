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
    let cnt = 1;
    for(i in files){
        let data = fs.readFileSync(files[i],"utf-8");
        let allText = "";
        if(options.includes("-s")){
            let lines = data.split("\r\n");
            for( j in lines){
                if(lines[j]!=""){
                    allText += lines[j]+"\n";
                }
            }
        }
        else{
            allText = data;
        }
        if(options.includes("-n")){
            let numlines = allText.split("\n");
            for(k in numlines){
               if(numlines[k]!=""){
                console.log(cnt+" "+numlines[k]);
                cnt++;
               }
            }
        }
        else{
            console.log(allText);
        }
    }
}

wcat(cmds);