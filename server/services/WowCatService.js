const db = require('./db');
const wowCat = require('../executor');
const config = require('../config');


async function wowCatService(URL){
    console.log(URL);
let dataArray= await wowCat(URL);
let categoryData=dataArray[0];
let metaData=dataArray[1];


//    await db('INSERT INTO metaTable SET ?', metaData);

//   for(let data of categoryData){
//     await db('INSERT INTO categoryTable SET ?', data);
//   }
  return dataArray;
}

module.exports= wowCatService