const express = require('express');
const fetch = require('node-fetch');
var mongojs = require('mongojs');
const mongoose = require('mongoose');
const Subject = require('./model');
const { json } = require('express');

const api = express();

/*connecting to our Mongodb database*/

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/test', {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false
      });
      console.log("MongoDB Conected")
  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
};
connectDB();

/*In this section we transformed the numeric date format into a letteral form that
could be accepted in our URL parameter*/

let now = new Date();
let options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
};

/*defining the begining date*/

big=now.toLocaleString('en-us', options).split(',').join("")
var myDate = new Date();
myDate.setDate(myDate.getDate() +1);

/*defining the ending date*/

let end =myDate.toLocaleString('en-us', options).split(',').join("");
var db = mongojs('test', []);

/*in the following section we prepared our URL as well as the parameters that will be added and the header of
the HTTP request*/

let url = new URL('The link I used to extract JSON data from');
params={terminal: 'MAPTM02', fromDate: big, toDate: end};
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
let headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    'Accept': 'application/json, text/plain, /',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM2E1YWM5YjgtODNkYi00ZmU4LTkwM2ItYjhjNzQ5MGFlYzczIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiM2E1YWM5YjgtODNkYi00ZmU4LTkwM2ItYjhjNzQ5MGFlYzczIiwianRpIjoiNDQ0YmI3OTItODAyNi00MDQzLTgwOTEtMjBmMzM5NjIzMDI4IiwiaWF0IjoxNjIyNTYwNzc4LCJuYmYiOjE2MjI1NjA3NzgsImV4cCI6MTkzNzkyMDc3OCwiaXNzIjoiaHR0cHM6Ly9hcGkuYXBtdGVybWluYWxzLmNvbS9zZWN1cml0eS8iLCJhdWQiOiI0YzZlMDRlYi01N2E0LTRmNmUtOTJkOC01ZGI3OWE2Yjg1NGUifQ.uPAKsOlgVGa0FSWTZds5wyzYuewtt2egu-VX83ALBLk',
    'Consumer-Key': 'G8Sjpc15h6q3dIIlgMq2YDsyMY8pblnF',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'Content-Type': 'application/json',
    'Origin': 'https://stage.berthplanner.apmterminals.com',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://stage.berthplanner.apmterminals.com/',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
}
/*creating a hint "indice" that well help us later sort the upcoming JSON data*/

var hint = big+" to "+end;

/*Starting our fetching process, in other wors this the part where we retrieve data using 
the giving URL*/

fetch(url, { method: 'GET', headers: headers})
  .then((res) => { 
    return res.json() 
  })
  .then((jsonData) => {

    /*in this section of code, we make sure to not register the obtained data
    within an unwanted collection, so we named the collection after the intervalle 
    in we use as a parameter(hint) to retrieve data, and we check if it exist or not*/
   
db.getCollectionNames(function(err, colNames) {
    if(err){
        console.log(err);
    }
    else{
        if(colNames.includes(hint)){

          /*if the collection name already exist, that means we should not create a new one,
          instead we must override the already existing one!*/
            jsonData.forEach(test =>{
    
                db.collection(hint).find({vesselCode: test.vesselCode},  async (err, doc)=>{

                  /*here we check indevidually if the subject already exist within the desired collection*/

                if(err){
                  console.log(err);
                }
                else{
                  if(Object.entries(doc).length === 0){

                    /* if the subject does not exist we add it to the collection!*/
                      
                      db.collection(hint).insertOne(test,(err, res)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(`Subject with vissel code: ${test.vesselCode} was added!`);
                        }
                    })
          
                  }
                  else{

                    /*if the subject already exist we must only update it, and not add it over again!*/

                   await Subject.update({
                      vesselCode: test.vesselCode
                    },
                    
                      {
                        vesselName : test.vesselName,
                        vesselLOA: test.vesselLOA,
                        arrivalVoyage: test.arrivalVoyage,
                        departureVoyage: test.departureVoyage,
                        operatorCode : test.operatorCode,
                        service_Route : test.service_Route,
                        serviceName : test.serviceName,
                        remark : test.remark,
                        etb : test.etb,
                        ets : test.ets,
                        etc : test.etc,
                        etd : test.etd,
                        ata : test.ata,
                        atd : test.atd,
                        baseETB : test.baseETB,
                        baseETD : test.baseETD,
                        prePlannedLoadMoves : test.prePlannedLoadMoves,
                        prePlannedDischargeMoves : test.prePlannedDischargeMoves,
                        prePlannedShiftingMoves : test.prePlannedShiftingMoves,
                        prePlannedCranes : test.prePlannedCranes,
                        prePlannedBollard : test.prePlannedBollard,
                        preIsStarboardBerth : test.preIsStarboardBerth,
                        preBerthingUpdateTime : test.preBerthingUpdateTime,
                        plannedLoadMoves : test.plannedLoadMoves,
                        plannedDischargeMoves : test.plannedDischargeMoves,
                        plannedCranes : test.plannedCranes,
                        plannedBollard : test.plannedBollard,
                        isStarboardBerth : test.isStarboardBerth,
                        terminalCode : test.terminalCode,
                        terminalCodeNext : test.terminalCodeNext,
                        terminalCodePrev : test.terminalCodePrev,
                        imoCode : test.imoCode,
                        callsign : test.callsign,
                        latestRequiredCMPH : test.latestRequiredCMPH,
                        averageCranes : test.averageCranes,
                        operationOrder : test.operationOrder,
                        ci : test.ci,
                        proformaArrival : test.proformaArrival,
                        proformaDeparture :  test.proformaDeparture
          
                      },null,
                      (err, result)=>{
                        if(err){
                          console.log(err);
                        }
                        else{
                          console.log(`Subject with vissel code: ${test.vesselCode} was updated!`);
                        }
                      }
                    );
                    
                  }
                }
              })
          
            })
            
        }
        else{

          /*if the collection does not exist, that means we have brand new JSON data to retrieve today,
          so we must creat a proper collection with name of the intervalle used in the URL parameters(hint)!*/

          db.createCollection(hint,(err,res)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(`collection ${hint} was created!`);
                jsonData.forEach(async test =>{
                  
                    
                  db.collection(hint).insertOne(test,(err, res)=>{

                    /*we insert the obtained data in ther freshly created collection!*/

                    if(err){
                        console.log(err);
                    }
                    else{
                      console.log(`Subject with vissel code: ${test.vesselCode} was added!`);
                    }
                })
                

                })

            }
        })
        }
    }
    
  });
  })
  .catch((err) => {
    console.error(err);
  });
  
/*end of code*/






