import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5000/";

// before each test -> sign in
test.beforeEach(async ({ page }) => {
    // goto ui
    await page.goto(UI_URL);

    // get sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    // check wether its on signin page or not
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // fill form (vaild credentials)
    await page.locator("[name=email]").fill("user1@email.com");
    await page.locator("[name=password]").fill("123123");

    // click on Sign In button
    await page.getByRole("button", { name: "Sign In" }).click();

    // check if signed in successfull
    await expect(page.getByText("Sign in Successfull!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test city");
    await page.locator("[name=state]").fill("Test state");
    await page.locator("[name=country]").fill("Test country");
    await page.locator("[name=description]").fill("This is a test description");
    await page.locator("[name=pricePerNight]").fill("2000");

    // selecting from dropdown options (select)
    await page.selectOption("select[name=starRating]", "3");

    // selecting type, (radio input)
    await page.getByText("Budget").click();

    // selecting facilities, (check input)
    await page.getByLabel("Free WiFi").check();
    await page.getByLabel("Parking").check();

    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childrenCount]").fill("3");

    // handling image upload
    await page.setInputFiles("[name=imageFiles]", [
        path.join(__dirname, "files", "image1.png"),
        path.join(__dirname, "files", "image2.png"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText('Hotel Saved')).toBeVisible();
});