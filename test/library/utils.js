class utils {

    async objClick(element) {
        try {
            await element.waitForClickable();
            await element.click();
            console.log(`Clicked on element: ${element.selector}`);

        } catch (error) {
            console.error(`Error clicking on element ${element.selector}: ${error.message}`);
            // You might choose to handle the error further or rethrow it
            throw error;
        }
    };

    async doSetValue(element, value) {
        try {
            await element.waitForClickable();
            await element.setValue(value);
            console.log(`Set value ${value} on element: ${element.selector}`);

        } catch (error) {
            console.error(`Error setting value on element ${element.selector}: ${error.message}`);
            // You might choose to handle the error further or rethrow it
            throw error;
        }
    };

    async objGetText(element) {
        try {
          // Wait for the element to be present
          await element.waitForExist();
          
          // Get the text content of the element
          const text = await element.getText();
          
          // Optionally, you can log or perform additional actions
          console.log(`Text content of element (${element.selector}): ${text}`);
          
          return text;
        } catch (error) {
          console.error(`Error getting text from element ${element.selector}: ${error.message}`);
          // You might choose to handle the error further or rethrow it
          throw error;
        }
      }



}
//module.exports = utils;  // Export the class directly without creating an instance
module.exports = new utils; 