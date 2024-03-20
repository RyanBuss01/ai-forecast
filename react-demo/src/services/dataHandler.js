import jsonData from '../data/data.json'

const dataHandler = {
  getJsonData: async () => {
    
    let data;
    try {
      // If jsonData.data is already the array you need, adjust accordingly
      data = JSON.parse(jsonData.data); // Adjust according to the actual structure of jsonData
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return []; // Return an empty array to prevent further errors
    }
    
    // Find the index of the temperature column
    const tempIndex = data.columns.indexOf("temperature (degC)");

    // Extract temperatures into an array
    const tempsArray = data.index.map((_, rowIndex) => {
        // Assuming data.values or a similar structure holds the actual data rows
        // and that each row corresponds to the indices in data.index
        return data.data[rowIndex][tempIndex];
    });

    tempsArray.map(temp => temp * 9/5 + 32);

    return tempsArray;
  },

  getData: async () => {
    let data = await dataHandler.getJsonData();

    // Double-check that 'data' is indeed an array
    if (!Array.isArray(data)) {
      console.error("Expected an array, got:", typeof data);
      return []; // Return an empty array or handle the error as appropriate
    }

    // Calculate the number of data points for the last 7 days
    const dataPointsPerDay = 24;
    const days = 7;
    const totalDataPoints = dataPointsPerDay * days;

    // Slice the original array to get the last 168 data points
    const lastWeekData = data.slice(-totalDataPoints);

    // Split this sliced array into 7 sub-arrays, each with 24 data points
    let splitDataByDay = [];
    for (let i = 0; i < days; i++) {
        splitDataByDay.push(lastWeekData.slice(i * dataPointsPerDay, (i + 1) * dataPointsPerDay));
    }

    return {split: splitDataByDay, full: data};
  },

  
};

export default dataHandler;