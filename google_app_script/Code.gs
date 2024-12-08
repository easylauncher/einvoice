function doPost(e) {
  // Enable try/catch for overall error handling
  try {
    // Check if we got any post data
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, null, "No POST data received");
    }

    // Attempt to parse JSON
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log("JSON parse error: " + parseError);
      return jsonResponse(false, null, "Invalid JSON format");
    }

    Logger.log("Received data: " + JSON.stringify(data));

    // Security check: Verify API key
    var API_KEY = "7ep3X6Vg1tJk3ACk6hG2gQ6YypgL91E6"; // Ideally store this in Script Properties
    var SHEET_ID = "1vMczyY9mY37EwKL78xnPbnUoBlBtqaspYSNwt47etQw";
    var SHEET_NAME = "invoices";

    if (!data.apiKey || data.apiKey !== API_KEY) {
      Logger.log("Unauthorized access attempt with API key: " + data.apiKey);
      return jsonResponse(false, null, "Unauthorized: Invalid API key");
    }

    // Validate required fields
    let requiredFields = ["startDate", "endDate", "startMeter", "endMeter", "costPerKm"];
    for (let field of requiredFields) {
      if (!data.hasOwnProperty(field) || data[field] === "") {
        Logger.log(`Missing or empty required field: ${field}`);
        return jsonResponse(false, null, `Missing or empty required field: ${field}`);
      }
    }

    // Parse numeric fields
    let startMeter = parseFloat(data.startMeter);
    let endMeter = parseFloat(data.endMeter);
    let costPerKm = parseFloat(data.costPerKm);
    let toll = parseFloat(data.toll) || 0;
    let extras = parseFloat(data.extras) || 0;

    // Check for numeric validity
    if (isNaN(startMeter) || isNaN(endMeter) || isNaN(costPerKm)) {
      Logger.log("Invalid numeric value for meter readings or costPerKm");
      return jsonResponse(false, null, "Invalid numeric value for meter readings or costPerKm");
    }

    if (endMeter < startMeter) {
      Logger.log("endMeter must be greater than or equal to startMeter");
      return jsonResponse(false, null, "endMeter must be greater than or equal to startMeter");
    }

    // Compute backend values
    let distance = endMeter - startMeter;
    let travelCost = distance * costPerKm;
    let totalCost = travelCost + toll + extras;

    // Access the Google Sheet
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log("Sheet not found: " + SHEET_NAME);
      return jsonResponse(false, null, "Sheet not found");
    }

    // Append row with processed data and user info
    let rowData = [
      data.startDate, 
      data.endDate, 
      startMeter,
      endMeter,
      toll.toFixed(2),
      extras.toFixed(2),
      distance.toFixed(2),
      costPerKm.toFixed(2),
      totalCost.toFixed(2),
      data.ipAddress || "Unavailable",
      data.userAgent || "Unavailable",
      data.os || "Unavailable",
      data.deviceType || "Unavailable",
      data.referrer || "Unavailable",
      data.timestamp || new Date().toISOString()
    ];
    sheet.appendRow(rowData);

    Logger.log("Row appended successfully: " + JSON.stringify(rowData));

    // Prepare success response data
    let responseData = {
      startDate: data.startDate,
      endDate: data.endDate,
      distance: distance,
      toll: toll,
      extras: extras,
      costPerKm: costPerKm,
      totalCost: totalCost,
      ipAddress: data.ipAddress || "Unavailable",
      userAgent: data.userAgent || "Unavailable",
      os: data.os || "Unavailable",
      deviceType: data.deviceType || "Unavailable",
      referrer: data.referrer || "Unavailable",
      timestamp: data.timestamp || new Date().toISOString()
    };

    return jsonResponse(true, responseData, null);

  } catch (generalError) {
    Logger.log("General error: " + generalError);
    return jsonResponse(false, null, `An unexpected error occurred. ${generalError}`);
  }
}

/**
 * Helper function to return a JSON response
 * @param {Boolean} success - Indicates success or failure
 * @param {Object|null} data - Data payload if applicable
 * @param {String|null} error - Error message if failure
 * @return {ContentService.TextOutput} - A JSON-formatted HTTP response
 */
function jsonResponse(success, data, error) {
  let output = {
    success: success
  };
  if (data) {
    output.data = data;
  }
  if (error) {
    output.error = error;
  }

  let response = ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);

  return response;
}
