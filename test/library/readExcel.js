const Excel = require('exceljs');

// Define a class for reading data from an Excel file
class ExcelDataReader {
    // Constructor with an optional file path parameter
    constructor(filepath = './testData/CreateCustomer.xlsx') {
        this.filepath = filepath;
    }

    // Asynchronous method for reading data from a specific sheet and column
    async readData(columnName, sheetName) {
        // Create a new workbook instance
        const workbook = new Excel.Workbook();

        try {
            // Read the Excel file
            await workbook.xlsx.readFile(this.filepath);

            // Initialize an array to store column data
            const columnData = [];
            // Get the specified worksheet
            const worksheet = workbook.getWorksheet(sheetName);

            // Check if the worksheet exists
            if (!worksheet) {
                throw new Error(`Sheet '${sheetName}' not found in the workbook.`);
            }

            // Find the index of the specified column in the first row
            const maxColumns = worksheet.actualColumnCount;
            let columnIndex = -1;

            for (let j = 1; j <= maxColumns; j++) {
                if (worksheet.getRow(1).getCell(j).value === columnName) {
                    columnIndex = j;
                    break;
                }
            }

            // If the column is not found, throw an error
            if (columnIndex === -1) {
                throw new Error(`Column '${columnName}' not found in the worksheet.`);
            }

            // Iterate through rows, starting from the second row
            const rows = worksheet.rowCount;

            for (let i = 2; i <= rows; i++) {
                const row = worksheet.getRow(i);
                // Push the value of the specified column to the array
                columnData.push(row.getCell(columnIndex).value);
            }

            // Return the array of column data
            return columnData;
        } catch (error) {
            // Log and re-throw any errors that occur during the process
            console.error('Error reading the Excel file:', error.message);
            throw error;
        }
    }
}



// Example usage
// Create an instance of the ExcelDataReader class
const excelReader = new ExcelDataReader();
// Specify the column and sheet names
const columnName = 'Constitution';
const sheetName = 'BasicDetails'; // Default sheet name

// Call the readData method and handle the result or any errors
excelReader.readData(sheetName, columnName)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });


// Export the ExcelDataReader class
module.exports = ExcelDataReader;