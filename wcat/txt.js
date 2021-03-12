
//test
const fs = require('fs');
let filename = process.argv[2];

function countsn(filename){
    let content = fs.readFileSync(filename,"utf-8");
    content = content.split("");
    let cnt = 0;
    //console.log(content);
    for(i of content){
        if(i=='n'){
            cnt++;
        }
    }
    console.log(cnt);
}

countsn("abc.txt");


//obj1.obj2.obj3.key = value
function flatten(obj){
    let result = {};

    for(i in obj){
        if(typeof(obj[i])=='object'){
                const temp = flatten(obj[i]);
                for(j in temp){
                    result[i+'.'+j] = temp[j];
                }
        }
        else{
            result[i] = obj[i];
        }
    }
    return result;
}
let x = {
    newObj:{
        obj2:{
            obj5:{
                one: 1,
                two: {
                    objlast: 123
                }
            }
        }
    },
    obj3:{
        obj4:{
            two:2
        }
    }
}

console.log(flatten(x));
