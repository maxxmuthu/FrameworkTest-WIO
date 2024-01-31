
class Page {
    
    async open(path) {
        try {
            await browser.url(path);
            await browser.maximizeWindow();
            console.log(`Opening the browser with URL: ${path}`);

        } catch (error) {
            console.error(`Error during navigation: ${error.message}`);
        }
    }
    
    async close() {
        try {
            await browser.closeWindow();
            console.log(`Closing the browser: ${path}`);

        } catch (error) {
            console.error(`Error during window closing: ${error.message}`);
        }
    }
}

module.exports = new Page()