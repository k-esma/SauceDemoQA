//ES sintaksa
import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import { ProductPage } from "../pages/productPage.js";
import { CartPage } from "../pages/cartPage.js";
import { CheckoutPage } from "../pages/checkoutPage.js";

describe("Test kupljenih proizvoda", function () {
    this.timeout(0);
    /** @type {WebDriver} */
    let webDriver;
    let product;
    let cart;
    let checkout;

    beforeEach(async function () {
        webDriver = await new Builder().forBrowser(Browser.CHROME).build();
        product = new ProductPage(webDriver);
        cart = new CartPage(webDriver);
        checkout = new CheckoutPage(webDriver);
        
        await webDriver.get("https://www.saucedemo.com/");
        await webDriver.manage().window().maximize();
    });

    afterEach(async function () {
        await webDriver.quit();
    });

    it("Validirati proces kupovine", async function () {
        //Funkcije povlači iz productPage-a
        await product.enterUsername("standard_user");
        await product.enterPassword("secret_sauce");
        await product.pressLogin();
        let titleText = await product.getPageHeader();
        expect(titleText).to.equal("Products");
        await product.addItems();
        let cartItemCount = await product.getCartCount();
        expect(cartItemCount).to.equal("2");
        await product.openCart();

        //Funkcije povlači iz cartPage-a
        let cartTitle =  await cart.getPageHeader();
        expect(cartTitle).to.equal("Your Cart");
        let hasBackpack = await cart.verifyItemInCart("Sauce Labs Backpack");
        expect(hasBackpack).to.be.true;
        let hasBikeLight = await cart.verifyItemInCart("Sauce Labs Bike Light");
        expect(hasBikeLight).to.be.true;
        await cart.proceedToCheckout();

        //Funkcije povlači iz checkoutPage-a
        let checkoutHeader = await checkout.getPageHeader();
        expect(checkoutHeader).to.equal("Checkout: Your Information");
        await checkout.fillCustomerInfo("Esma", "Korac", "71000");
        await checkout.proceedNext();
        let reviewTitle = await checkout.getPageHeader();
        expect(reviewTitle).to.equal("Checkout: Overview");
        let hasBackpackReview = await checkout.verifyItemInCart("Sauce Labs Backpack");
        expect(hasBackpackReview).to.be.true;
        let hasBikeLightReview = await checkout.verifyItemInCart("Sauce Labs Bike Light");
        expect(hasBikeLightReview).to.be.true;
        await checkout.completePurchase();
        let confirmationHeader = await checkout.getPageHeader();
        expect(confirmationHeader).to.equal("Checkout: Complete!");
        await checkout.openMenu();
        await checkout.logoutUser();
        let finalUrl = await webDriver.getCurrentUrl();
        expect(finalUrl).to.equal("https://www.saucedemo.com/");

    
    });
});
