const fs = require("fs")

// read rajkumar.txt
fs.readFile("./Day2-Nodejs/rajkumar.txt",function (err,data){
    if(err){
        console.log("err",err)
    }

    console.log("data\n",data.toString())
})

console.log("Hello sir");
