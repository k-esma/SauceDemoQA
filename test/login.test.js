//ES syntax
import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import { LoginPage } from "../pages/loginPage.js";

describe("Test autentifikacije", function () {
    this.timeout(0);
    /** @type {WebDriver} */
    let driver;
    let loginPage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        loginPage = new LoginPage(driver);
        
        await driver.get("https://www.saucedemo.com/");
        await driver.manage().window().maximize();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("Test autentifikacije bez podataka", async function () {
        this.timeout(0);
        await loginPage.pressSignIn();
        let userFieldClass = await loginPage.getUserFieldClass();
        expect(userFieldClass).to.equal("input_error form_input error");
        let passFieldClass = await loginPage.getPassFieldClass();
        expect(passFieldClass).to.equal("input_error form_input error");
        let alertMessageText = await loginPage.getAlertMessage();
        expect(alertMessageText).to.equal("Epic sadface: Username is required");
        let alertNotVisible = await loginPage.dismissAlert();
        expect(alertNotVisible).to.equal(true);       
         
    });

    it("Test autentifikacije sa pogrešnim podacima", async function () {
        await loginPage.enterUsername("standard_user");
        await loginPage.enterPassword("wrongPassword");
        await loginPage.pressSignIn();
        let userFieldClass = await loginPage.getUserFieldClass();
        expect(userFieldClass).to.equal("input_error form_input error");
        let passFieldClass = await loginPage.getPassFieldClass();
        expect(passFieldClass).to.equal("input_error form_input error");
        let alertMessageText = await loginPage.getAlertMessage();
        expect(alertMessageText).to.equal("Epic sadface: Username and password do not match any user in this service");
        let alertNotVisible = await loginPage.dismissAlert();
        expect(alertNotVisible).to.equal(true);        
        
    });
});
