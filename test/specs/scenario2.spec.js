
const LoginPage = require('../pages/login_cura.js')
const IndexPage = require('../pages/index_cura.js')
const Page = require('../pages/base_page.js')
const AppointPage = require('../pages/make_appoint.js')
const myFunction = require('../library/configTest.js')
const ExcelData = require("../library/readExcelv4.js");
const utils = require('../library/utils.js')
const assert = require('assert');
const allureReporter = require('@wdio/allure-reporter').default

describe('Demo Test 2', function () {

    before('Launch the Browser', async () => {
        allureReporter.addStep("Opening the browser url")

        await Page.open(myFunction.Environment.Test.url);
        //await browser.url("https://katalon-demo-cura.herokuapp.com/")
       // await browser.maximizeWindow();
    });

    it('C9561 My Second Test', async ()=> {

        ExcelData.sheetName = "Scenario2";

        allureReporter.addFeature("Invalid Login")
        allureReporter.addSeverity("critical")
        allureReporter.addDescription("<b> Scenario 2 </b>", "html")
        allureReporter.addArgument("Platform", "Windows")

        await IndexPage.appointment();
        let un = (await ExcelData.read("Username"));
        let pw = (await ExcelData.read("Password"));
        await LoginPage.login(un,pw);
        await browser.pause(5000);

        const pageTitle = await browser.getTitle();
        console.log("TEST MESSAGE : " + await pageTitle);

        assert.equal(await pageTitle, 'CURA Healthcare Servic', `Page title does not match the expected value.`)

       /*
        await $('//input[@value="Medicaid"]').click();

        let test = await $('//label[text()="Facility"]').getText();
        console.log(await test);
        await expect(test).toHaveText("Facility");
       // await expect(AppointPage.verifylogin()).toHaveTextContaining('Make Appointment')
       // await browser.pause(5000); */
     });

     after('Close the Browser', async () => {
        await Page.close();
        //await browser.closeWindow();
        //await browser.reloadSession();
    }); 
})

