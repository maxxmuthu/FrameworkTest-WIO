const Excel = require('exceljs');

async function readExcelData(sheetName, columnName) {
    const filepath = './testData/CreateCustomer.xlsx';
    const workbook = new Excel.Workbook();

    try {
        await workbook.xlsx.readFile(filepath);

        const columnData = [];
        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found in the workbook.`);
        }

        const maxColumns = worksheet.actualColumnCount;
        let columnIndex = -1;

        for (let j = 1; j <= maxColumns; j++) {
            if (worksheet.getRow(1).getCell(j).value === columnName) {
                columnIndex = j;
                break;
            }
        }

        if (columnIndex === -1) {
            throw new Error(`Column '${columnName}' not found in the worksheet.`);
        }

        const rows = worksheet.rowCount;

        for (let i = 2; i <= rows; i++) {
            const row = worksheet.getRow(i);
            columnData.push(row.getCell(columnIndex).value);
        }

        return columnData;
    } catch (error) {
        console.error('Error reading the Excel file:', error.message);
        throw error;
    }
}

/*
// Example usage
const sheetName = 'BasicDetails';
const columnName = 'Constitution';

readExcelData(sheetName, columnName)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    }); */

    module.exports = {readExcelData};