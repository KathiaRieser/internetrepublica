require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const fs = require('fs');
const parse = require('csv-parse');

//mongoose.connect(process.env.MONGO_URL);
mongoose.connect("mongodb://localhost/employee");

var employees=[];
var headers=[];
fs.createReadStream('../files/employee.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', (csvrow) => {
        //do something with csvrow
        if(headers.length===0){
          headers = csvrow.slice()
        }
        else{
          let employee = {};
          for(let i=0; i<headers.length; i++){
            employee[headers[i]] = csvrow[i]
           }
           employees.push(employee);  
        }
              
    })
    .on('end',function() {
      //do something wiht csvData
      Employee.create(employees, (err, docs) => {
        if (err) {
          throw err
        };
        console.log(`${docs.length} employees created`)
        mongoose.connection.close();
      });

    });