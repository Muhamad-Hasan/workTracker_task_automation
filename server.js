const puppeteer = require('puppeteer');
var userAgent = require('user-agents');
// const cron = require('node-cron');

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }


const enterEmail = async (page) => {
  await page.waitForSelector('#i0116');
  await page.type('#i0116', 'muhammad.hassan@tpsonline.com');
  let i = 0;
  for (i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Enter');
};

const enterPassword = async (page) => {
  await page.waitForSelector('#i0118');
  await page.type('#i0118', "Devops.2");

  let i = 0;
  for (i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }

  await page.keyboard.press('Enter');
};

const clickStaySignIn = async (page) => {
    await page.waitForSelector('#idSIButton9');
    await page.click('#idSIButton9');
  };
  
const clickCreateTask = async (page) => {
await page.waitForSelector('.modal-ajax-form');
await page.click('.modal-ajax-form');
};

const pressTab = async(page , count)=>{
    for (let i = 0; i < count; i++) {
        await page.keyboard.press('Tab');
        
    }
    
}

const CreateTask = async (page) => {
    await page.waitForSelector('#timesheet_edit_form_begin');
    await page.evaluate(async ()=>{
        document.getElementById("timesheet_edit_form_begin").value = "2022-11-02 19:18";
    })
    // await page.type('#timesheet_edit_form_begin' , '2022-11-02 19:18');
    await pressTab(page , 1);
    await page.type('#timesheet_edit_form_duration' , '1:00');
    await pressTab(page , 1);
    // let getValue = prompt("please select custom");
    // console.log("GETVALUE" , getValue);
    await selectCustomer(page);
    await pressTab(page , 1);
    await delay(3000);
    

    // get project list according to customer
    await selectProject(page)
    await pressTab(page , 1);
    await delay(7000); //7

    
    await selectActivity(page);
    await pressTab(page , 1);
    await delay(7000);
    
    // sub task
    await selectSubTask(page);
    await pressTab(page , 1);
    await delay(6000); // 6
    
    // Product 
    await selectProduct(page);
    await pressTab(page , 1);
    await delay(3000);
    
    await page.type("#timesheet_edit_form_description" , "Automated task");
    await delay(3000);
    await page.evaluate(async()=>{
        document.getElementsByClassName("btn btn-primary")[0].click();
    })
    };
    

async function selectCustomer(page){
    const customerList = await page.evaluate(async()=>{
        let customers = [];
        let options = document.getElementById("timesheet_edit_form_customer").getElementsByTagName("option");
        options.forEach((element , i) => {
            if(i != 0 ){
                customers = [...customers , {name: element.innerHTML,  value :element.value }]  
        
            }   
        })
        return customers;
    })
    
    // filter customer and get its ID
    let getCustomerId = customerList.filter((f=> f.name == "TPS Internal"));
    if(getCustomerId && getCustomerId.length > 0){
        await page.select('#timesheet_edit_form_customer' , getCustomerId[0].value);
    } 
    

} 


async function selectProject(page){
    const projectList = await page.evaluate(async()=>{
        let projects = [];
        let options = document.getElementById("timesheet_edit_form_project").getElementsByTagName("option");
        options.forEach((element , i) => {
            if(i != 0 ){
                projects = [...projects , {name: element.innerHTML,  value :element.value }]  
        
            }   
        })
        return projects;
        
    })
    
    // filter customer and get its ID
    let getprojectId = projectList.filter((f=> f.name == "DevOps Services and Initiatives"));
    if(getprojectId && getprojectId.length > 0){
        await page.select('#timesheet_edit_form_project' , getprojectId[0].value);
    } 
    
}

async function selectActivity(page){
    const activitylist = await page.evaluate(async()=>{
        let activties = [];
        let options = document.getElementById("timesheet_edit_form_activity").getElementsByTagName("option");
        options.forEach((element , i) => {
            if(i != 0 ){
                activties = [...activties , {name: element.innerHTML,  value :element.value }]  
        
            }   
        })
        return activties;
        
    })
    console.log("activity" , activitylist.length);
    // filter customer and get its ID
    let getActivityId = activitylist.filter((f=> f.name == "Deployment Tools and Solutions"));
    if(getActivityId && getActivityId.length > 0){
        await page.select('#timesheet_edit_form_activity' , getActivityId[0].value);
    } 
    
}

async function selectSubTask(page){
    const subTasklist = await page.evaluate(async()=>{
        let subTasks = [];
        let options = document.getElementById("activitySubTaskSelector").getElementsByTagName("option");
        options.forEach((element , i) => {
            if(i != 0 ){
                subTasks = [...subTasks , {name: element.innerHTML,  value :element.value }]  
        
            }   
        })
        return subTasks;
        
    })
    console.log("subTasklist" ,subTasklist.length);
    
    // filter sub task and get its ID
    let getSubTaskId = subTasklist.filter((f=> f.name == "Deployment Hub"));
    if(getSubTaskId && getSubTaskId.length > 0){
        await page.select('#activitySubTaskSelector' , getSubTaskId[0].value);
    } 
    
}

 async function selectProduct(page){
    const productList = await page.evaluate(async()=>{
        let products = [];
        let options = document.getElementById("timesheet_edit_form_metaFields_1_value").getElementsByTagName("option");
        options.forEach((element , i) => {
            if(i != 0 ){
                products = [...products , {name: element.innerHTML,  value :element.value }]  
        
            }   
        })
        return products;
        
    })
    console.log("products" ,productList.length);
     
    // filter product and get its ID
    let getProductId = productList.filter((f=> f.name == "Cloud and DevOps"));
    if(getProductId && getProductId.length > 0){
        await page.select('#timesheet_edit_form_metaFields_1_value' , getProductId[0].value);
    } 
    
 }

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}


// cron.schedule('15 9 * * 1-5', () => {
//   //   console.log(
//   //     'I want to run this at 9:15am every monday, tuesday, wednesday, Thursday and Friday'
//   //   );
  (async () => {
    try{
        const args = [
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list ',
          ];

          let cookieObject ={
            name:"PHPSESSID",
            value:"2st18apvc251t47edphdcr40jh",
            Expires:"Tue, 19 Jan 2038 03:14:07 GMT"
            }
    const browserLaunch = await puppeteer.launch({  headless: false ,executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' ,ignoreHTTPSErrors: true,  });
    const page = await browserLaunch.newPage();
    // await page.setCookie(cookieObject);
    await page.setUserAgent(userAgent.random().toString())
    await page.goto('http://worktracker.tpsonline.com/en/timesheet/');
    await page.click('.btn-google');

    await enterEmail(page);
    await delay(4000);
    await enterPassword(page);
    await delay(10000);
    await clickStaySignIn(page)
    await delay(2000); //4
    await clickCreateTask(page);
    await delay(2000);
    await CreateTask(page);
    

    // await Promise.all([page.waitForNavigation()]);
        // try {
    //   vyagutaLeaveMorning(page);
    // } catch {
    //   console.log('Work From Home cannot be applied !');
    // }
//    / await browserLaunch.close();

    }
    catch(err){
        console.log("ERR" , err);
    }
      })();
// });

// const vyagutaLeaveEvening = async (page) => {
//   await page.goto(process.env.VYAGUTA_WFH_APPLY_ROUTE);
//   await delay(2000);
//   await page.click('div.action-bar__btnarea button:first-child');
//   await delay(4000);
//   await page.type('textarea[name=taskDone]', taskEvening.randomize());
//   await delay(6000);
//   // Work from home submission
//   await page.click('.action-bar-footer--bordered-top button[type=button]');
// };

// cron.schedule('15 18 * * 1-5', () => {
//   //   console.log(
//   //     'I want to run this at 6:15pm every monday, tuesday, wednesday, Thursday and Friday'
//   //   );
//   (async () => {
//     const browserLaunch = await puppeteer.launch({ headless: true });
//     const page = await browserLaunch.newPage();
//     await page.goto(Process.env.VYAGUTA_LOGIN_ROUTE);
//     await page.click('#loginButton');

//     enterEmail(page);
//     await delay(4000);
//     enterPassword(page);

//     await Promise.all([page.waitForNavigation()]);
//     try {
//       vyagutaLeaveEvening(page);
//     } catch {
//       console.log('Work From Home cannot be applied !');
//       // Send a email to my inbox
//     }
//     await browserLaunch.close();
//   })();
// });
