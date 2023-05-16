const {  countTotalperCategory,getAllUrlsFromPage, getMetaDataLanguageAndCopyright, countMatchingKeywordsFromGivenSetOfLinks } = require('./helper_function')
const { Cluster } = require('puppeteer-cluster');



async function wowCat(url){
     const cluster = await Cluster.launch({
          concurrency: Cluster.CONCURRENCY_BROWSER,
          maxConcurrency: 1
     });

     const dataToReturn=[];
     await cluster.task(async ({page}) => {
     await page.goto(url);
          
          const urlList = await getAllUrlsFromPage(page);
          const metaDataLangCopyright = await getMetaDataLanguageAndCopyright(page, url);
          const categoryData = await countMatchingKeywordsFromGivenSetOfLinks(urlList, url);
         
          dataToReturn.push(categoryData);
          dataToReturn.push(metaDataLangCopyright);
          dataToReturn.push(countTotalperCategory(categoryData))
     });

     
     cluster.queue(url);


     await cluster.idle();
     await cluster.close();
    
     return dataToReturn;
}


//wowCat('https://dirask.com/')
module.exports = wowCat;