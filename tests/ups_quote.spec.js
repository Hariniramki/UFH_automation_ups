const { test, expect } = require('@playwright/test');

test('Automate UPS Freight Forwarding Quote', async ({ page }) => {
    // 1. Open the website
    await page.goto('https://scsapps.ups.com/forwardinghub/us/en/quotes/ngflow?tx=17703601804210600');

    // 2. Select Ocean mode
    await page.locator('[automationdata_id="quotefclid"]').filter().click();

    // 3. Where are you shipping from (Origin)
    const fromCountry = page.locator('#fromCountry').first();
    await fromCountry.waitFor({ state: 'visible' });
    await fromCountry.click();
    await fromCountry.fill('United States Of America');
    
    const fromOption = page.getByRole('option', { name: /United States Of America/i }).first();
    await expect(fromOption).toBeVisible({ timeout: 1000 });
    await fromOption.click();

    // 4. Where are you shipping to (destination)

    const toCountry = page.locator('#toCountry').first();
    await toCountry.waitFor({ state: 'visible' });
    await toCountry.click();
    await toCountry.fill('India');
    
    const toOption = page.getByRole('option', { name: /India/i }).first();
    await expect(toOption).toBeVisible({ timeout: 1000 });
    await toOption.click();
    
    // 5. Enter Origin City/Zip  (1st box)
    const frozip = page.getByLabel('Enter City, State or Zip Code').nth(0);
    await frozip.waitFor({ state: 'visible' });
    await frozip.click();
    await frozip.fill('30029');

    const frozipoption = page.getByRole('option', { name: /ATLANTA, GA 30029/i }).first();
    await expect(frozipoption).toBeVisible({ timeout: 10000 });
    await frozipoption.click();


    // 6. Enter Destination City/Zip  (2nd box)
    const tozip = page.getByLabel('Enter City, State or Zip Code').nth(1);
    await tozip.waitFor({ state: 'visible' });
    await tozip.click();
    await tozip.fill('609002');

    
    const tozipoption = page.getByRole('option', { name: /CHENNAI, TN 609002/i }).first();
    await expect(tozipoption).toBeVisible({ timeout: 30000 });
    await tozipoption.click();

    // 7. Payment Terms: Select Prepaid
    await page.locator('label').filter({ hasText: 'Prepaid' }).click();

    // 8. Select Incoterm DPA - DELIVER AT PLACE ITSELF 
    // await page.locator('div[role="combobox"]').filter({ hasText: 'EXW (Ex Works)' }).click();
    // await page.getByText('FCA (Free Carrier)', { exact: true }).click();

    // 9. Commodity Information
    const comm = await page.locator('#comDesc').first();
    await comm.waitFor({ state: 'visible' });
    await comm.click();
    await comm.fill('Cloth Bags');

    const commoption = page.getByRole('option', { name: 'Cloth Bags' }).first();
    await expect(commoption).toBeVisible({ timeout: 5000 });
    await commoption.click();
    
    const val = page.locator('[automationdata_id="cargotextid"]').first();
    await expect(val).toBeVisible({ timeout: 5000 });
    await val.click();
    await val.fill('10000000');

    // select currency
    const combo = page.getByRole('combobox', { name: /USD/i }).or(page.locator('#currency'));
    await combo.scrollIntoViewIfNeeded();
    await combo.click();

    // Wait for the popup listbox to appear and pick INR
    const listbox = page.getByRole('listbox'); // PrimeNG renders this on open
    await listbox.waitFor({ state: 'visible' });
    await listbox.getByRole('option', { name: /^INR$/ }).click();


    // // 10. Dimensions - Loose/Boxes
    // const dimen = page.locator('#Type'); // stable id on the combobox
    // await dimen.scrollIntoViewIfNeeded();
    // await dimen.click();

    // const dimenbox = page.getByRole('listbox');
    // await dimenbox.waitFor({ state: 'visible' });
    // await dimenbox.getByRole('option', { name: /^Loose\/Boxes$/ }).click();
    // await expect(page.locator('#Type')).toHaveAttribute('aria-label', /Loose\/Boxes/);


    // const cquantity = page.locator('[automationdata_id="palletsid"]').first();
    // await expect(cquantity).toBeVisible({ timeout: 5000 });
    // await cquantity.click();
    // await cquantity.fill('1000');

    // const cweight = page.locator('[automationdata_id="weightid"]').first();
    // await expect(cweight).toBeVisible({ timeout: 5000 });
    // await cweight.click();
    // await cweight.fill('2');
    
    // const length = page.locator('[automationdata_id="lengthid"]').first();
    // await expect(length).toBeVisible({ timeout: 5000 });
    // await length.click();
    // await length.fill('20');

    // const width = page.locator('[automationdata_id="widthid"]').first();
    // await expect(width).toBeVisible({ timeout: 5000 });
    // await width.click();
    // await width.fill('20');

    // const height = page.locator('[automationdata_id="heightid"]').first();
    // await expect(height).toBeVisible({ timeout: 5000 });
    // await height.click();
    // await height.fill('20');

    // conatiner
    const container = page.locator('#ContSize0').first();
    await container.waitFor({ state: 'visible' });
    await container.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await container.fill('20 ft Garment');

    const containerption = page.getByRole('option', { name: '20 ft Garment' }).first();
    await expect(containerption).toBeVisible({ timeout: 5000 });
    await containerption.click();

    const contype = page.locator('#ContQuantity0').first();
    await expect(contype).toBeVisible({ timeout: 5000 });
    await contype.click();
    await contype.fill('5');

    await page.locator('[automationdata_id="generalcargoid"]').filter().click();
    
    // 11. Scroll and Submit
    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // Optional: Wait to see result
    await page.waitForTimeout(30000);
});