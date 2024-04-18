const { Builder, Key, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Weather App Test Suite', function () {
  this.timeout(10000); // Increased timeout for the entire suite

  let driver;

  before(async function () {
    // Define Chrome binary path
    const chromeBinaryPath = '/usr/bin/google-chrome'; // Replace this with the correct path to Chrome binary on your system

    // Check if Chrome path is defined
    if (!chromeBinaryPath) {
      throw new Error('Chrome binary path is not defined');
    }

    // Set up Chrome options
    const options = new chrome.Options();
    options.setChromeBinaryPath(chromeBinaryPath); // Set Chrome binary path
    // Run in headless mode for testing

    // Build WebDriver instance
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    // Close the WebDriver instance after all tests
    if (driver) {
      await driver.quit();
    }
  });

  it('Should open the Weather App homepage and verify the title', async function () {
    // Navigate to the Weather App homepage
    await driver.get('http://localhost:3000'); // Assuming port 3000 for development server

    // Wait until the search bar is visible
    await driver.wait(until.elementLocated(By.className('search-bar')), 5000);

    // Find the search bar element
    const searchBar = await driver.findElement(By.className('search-bar'));

    // Type a location in the search bar
    await searchBar.sendKeys('London', Key.RETURN);

    // Wait until the weather box is visible
    await driver.wait(until.elementLocated(By.className('weather-box')), 5000);

    // Find the temperature element
    const temperatureElement = await driver.findElement(By.className('temp'));

    // Get the temperature text
    const temperatureText = await temperatureElement.getText();

    // Verify if the temperature text contains the degree symbol (indicating it's a valid temperature)
    assert.ok(temperatureText.includes('°C'), 'Temperature text does not contain degree symbol');
  });
});
