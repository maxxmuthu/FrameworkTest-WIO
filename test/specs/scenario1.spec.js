
const LoginPage = require('../pages/login_cura.js')
const IndexPage = require('../pages/index_cura.js')
const Page = require('../pages/base_page.js')
const AppointPage = require('../pages/make_appoint.js')
const myFunction = require('../library/configTest.js')
const ExcelData = require("../library/readExcelv4.js");
const utils = require('../library/utils.js')
const assert = require('assert');
const allureReporter = require('@wdio/allure-reporter').default


describe('Demo Test 1', function () {

    before('Launch the Browser', async () => {

        allureReporter.addStep("Opening the browser url")
        
        await Page.open(myFunction.Environment.Test.url);
        //await browser.url("https://katalon-demo-cura.herokuapp.com/")
       // await browser.maximizeWindow();
    });


    it('C9560 My First Test', async ()=> {
       
       ExcelData.sheetName = "Scenario1";

       allureReporter.addFeature("Valid Login")
       allureReporter.addSeverity("critical")
       allureReporter.addDescription("<b> Scenario 1 </b>", "html")
       allureReporter.addArgument("Platform", "Windows")

       await IndexPage.appointment();
       let un = (await ExcelData.read("Username"));
       let pw = (await ExcelData.read("Password"));
       await LoginPage.login(un,pw);  
       await browser.pause(5000);
       //await $('//input[@value="Medicaid"]').click();

       const pageTitle = await browser.getTitle();
       console.log("TEST MESSAGE : " + await pageTitle);

       assert.equal(await pageTitle, 'CURA Healthcare Service', `Page title does not match the expected value.`)

      /* let test = await $('label[for="combo_facility"]');
       await test.waitForDisplayed();
       let testvalue = await test.getText();
       console.log("TEST MESSAGE : " + await testvalue);
       await expect(testvalue).toHaveText("Facility"); */
       //await expect(AppointPage.verifylogin()).toHaveText("Make Appointment");
       //await browser.pause(5000);
    });
    

     after('Close the Browser', async () => {
        await Page.close();
        //await browser.closeWindow();
        //await browser.reloadSession();
    }); 
})


/*what is the difference between 1.) "import LoginPage from '../pages/login_cura.js'" 
and 2.) "'const LoginPage = require('../pages/login_cura.js')"

1.) CommonJS (const LoginPage = require('../pages/login_cura.js')):

This syntax is part of the CommonJS module system, which is typically used in Node.js environments.
The require function is used to import modules.
It's a synchronous operation, meaning that the code doesn't proceed to the next line until the required module is fully loaded.
The imported module is assigned to the variable (LoginPage in this case), and you access its exports through this variable.


2.) ES6 Modules (import LoginPage from '../pages/login_cura.js'):

This syntax is part of the ECMAScript 6 (ES6) module system, widely used in modern JavaScript, especially in the browser environment.
import and export keywords are used to work with modules.
It supports both synchronous and asynchronous loading, making it more versatile.
It allows named exports (export const someVariable) and default exports (export default something).

In most modern projects, especially those using tools like Webpack, Babel, or TypeScript, 
you'll find ES6 module syntax more commonly used. It provides a more expressive and standardized way to work with modules in JavaScript. However, in Node.js environments or older projects, you might encounter CommonJS syntax.
If you have control over your project's configuration, consider using ES6 module syntax for its readability, static analysis benefits, and compatibility with newer JavaScript features.
*/