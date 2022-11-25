const puppeteer = require('puppeteer');


(async () => {

    var delay = (time)=>{
        return new Promise((resolve , rej)=>{
            setTimeout(resolve , time)
        })
    }
    
    try {
        const browser = await puppeteer.launch( { devtools: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
        const page = await browser.newPage();

        await page.goto('https://worktracker.tpsonline.com/en/timesheet/');

        //   // Type into search box.
        //   await page.type('.devsite-search-field', 'Headless Chrome');

        //   // Wait for suggest overlay to appear and click "show all results".
        const loginBtn = '.btn-google';
        await page.waitForSelector(loginBtn);
        await page.click(loginBtn);

        // let textField = document.getElementById("i0116");
        //     console.log(textField , "");
        await page.waitForSelector("#i0116");
            
        let data = await page.evaluate(async() => {
            let textField =  document.getElementById("i0116");
            textField.value = "muhammad.hassan@tpsonline.com";
            
            // click next button
            let getTextFieldData =  document.getElementById("i0116");
            console.log("value" , getTextFieldData.value);
            setTimeout(()=>{
                let nextButton =  document.getElementById("idSIButton9");
                nextButton.click();
            } , 10000)
            

            // const searchValue = await page.$eval('#i0116', el => el.value);


        })
        
        // await page.$eval('i0116', el => el.value = 'muhammad.hassan@tpsonline.com');
    }
    catch (er) {
        console.log("ERR", er);
    }

    //   // Wait for the results page to load and display the results.
    //   const resultsSelector = '.gsc-results .gs-title';
    //   await page.waitForSelector(resultsSelector);

    //   // Extract the results from the page.
    //   const links = await page.evaluate(resultsSelector => {
    //     return [...document.querySelectorAll(resultsSelector)].map(anchor => {
    //       const title = anchor.textContent.split('|')[0].trim();
    //       return `${title} - ${anchor.href}`;
    //     });
    //   }, resultsSelector);

    //   // Print all the files.
    //   console.log(links.join('\n'));

    //   await browser.close();
})();