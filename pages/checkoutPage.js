import { By, until, WebDriver } from "selenium-webdriver";

class CheckoutPage {
    // Definicija atributa:
    constructor(webDriver) {
        /** @type {WebDriver} */
        this.webDriver = webDriver;
        this.pageHeader = By.css('span[data-test="title"]');
        this.firstNameInput = By.id("first-name");
        this.lastNameInput = By.id("last-name");
        this.zipCodeInput = By.id("postal-code");
        this.continueBtn = By.id("continue");
        this.finishBtn = By.id("finish");
        this.menuBtn = By.id("react-burger-menu-btn");
        this.logoutBtn = By.id("logout_sidebar_link");
    }
    // Naziv naslovne stranice:
    async getPageHeader() {
        let pageHeader = await this.webDriver.findElement(this.pageHeader);
        return await pageHeader.getText();
    }
    // Unijeti korisničke podatke:
    async fillCustomerInfo(firstName, lastName, zipCode) {
        let firstNameField = await this.webDriver.wait(until.elementLocated(this.firstNameInput), 20000);
        await firstNameField.clear();
        await firstNameField.sendKeys(firstName);

        let lastNameField = await this.webDriver.wait(until.elementLocated(this.lastNameInput), 20000);
        await lastNameField.clear();
        await lastNameField.sendKeys(lastName);

        let zipCodeField = await this.webDriver.wait(until.elementLocated(this.zipCodeInput), 20000);
        await zipCodeField.clear();
        await zipCodeField.sendKeys(zipCode);
    }
    // Klik na dugme 'continue':
    async proceedNext() {
        await (await this.webDriver.findElement(this.continueBtn)).click();
    }
    // Provjera artikala u korpi:
    async verifyItemInCart(itemName) {
        let item = await this.webDriver.wait(
            until.elementLocated(By.xpath(`//div[text()='${itemName}']`)), 20000);
        return await item.isDisplayed();
    }
    // Klik na 'finish' dugme:
    async completePurchase() {
        await (await this.webDriver.findElement(this.finishBtn)).click();
    }
    // Otvoriti menu sidebar koji sadrži logout dugme:
    async openMenu() {
        await (await this.webDriver.findElement(this.menuBtn)).click();
    }
    // Sačekati da logout dugme postane vidljiv ('pristupačan') i kliknuti na isti:
    async logoutUser() {
        let logoutButton = await this.webDriver.wait(until.elementLocated(this.logoutBtn), 20000);
        await this.webDriver.wait(until.elementIsVisible(logoutButton), 20000);
        await this.webDriver.wait(until.elementIsEnabled(logoutButton), 20000);
        await logoutButton.click();
    }
    
}

export { CheckoutPage };