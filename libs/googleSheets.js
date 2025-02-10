export async function appendContactData(contact) {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const spreadsheetId = process.env.SPREADSHEET_ID;
  
  // Define the target range (adjust sheet name and range as needed)
  const range = 'Sheet1!A1'; // This appends to the first sheet
  
  // Prepare the row data. Adjust the order as necessary.
  const values = [
    [
      contact.name,
      contact.surname,
      contact.email,
      contact.number,
      contact.role,
      contact.topic,
      contact.subject,
      contact.description,
      new Date().toLocaleString(), // Timestamp for when the contact was added
    ],
  ];
  
  const resource = { values };
  
  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED', // so that Google Sheets processes numbers/dates
      insertDataOption: 'INSERT_ROWS', // Ensure rows are inserted
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
    return result.data;
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    throw error;
  }
}
