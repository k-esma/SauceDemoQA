import { By, until, WebDriver } from "selenium-webdriver";

class CartPage {
    // Definisati atribute:
    constructor(webDriver) {
        /** @type {WebDriver} */
        this.webDriver = webDriver;
        this.pageHeader = By.css('span[data-test="title"]');
        this.checkoutBtn = By.id("checkout");
    }
    // Naziv naslovne stranice:
    async getPageHeader() {
        let pageHeader = await this.webDriver.findElement(this.pageHeader);
        return await pageHeader.getText();
    }
    //Čekirati proizvode u korpi:
    async verifyItemInCart(itemName) {
        let item = await this.webDriver.wait(
            until.elementLocated(By.xpath(`//div[text()='${itemName}']`)), 20000);
        return await item.isDisplayed();
    }
    //Nastaviti na checkout stranicu:
    async proceedToCheckout() {
        await (await this.webDriver.findElement(this.checkoutBtn)).click();
    }
}

export { CartPage };