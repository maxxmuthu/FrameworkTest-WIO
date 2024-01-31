const Excel = require('exceljs');

// Define a class for reading data from an Excel file
class ExcelDataReader {
    // Default values for filepath and sheetName
    filepath = './testData/CreateCustomer.xlsx';
    //sheetName = "BasicDetails"

    // Constructor with an optional file path and sheet name parameters
    constructor(filepath, sheetName) {
        this.filepath = filepath || this.filepath;
        this.sheetName = sheetName;
    }

    // Asynchronous method for reading data from a specific sheet and column
    async readData(columnName) {
        // Create a new workbook instance
        let workbook = new Excel.Workbook();

        try {
            // Read the Excel file
            await workbook.xlsx.readFile(this.filepath);

            // Initialize an array to store column data
            const columnData = [];
            // Get the specified worksheet
            let worksheet = workbook.getWorksheet(this.sheetName);

            // Check if the worksheet exists
            if (!worksheet) {
                throw new Error(`Sheet '${this.sheetName}' not found in the workbook.`);
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
            return columnData.toString();
        } catch (error) {
            // Log and re-throw any errors that occur during the process
            console.error('Error reading the Excel file:', error.message);
            throw error;
        }
    }
}

/*
// Example usage
const columnName = 'Username';

const excelReader = new ExcelDataReader();

excelReader.readData(columnName)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    }); */



// Export the ExcelDataReader class
module.exports = ExcelDataReader;