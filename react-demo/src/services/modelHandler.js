import * as tf from '@tensorflow/tfjs';



const modelHandler = {
    
  forecast: async (data) => {
    const windowSize = 24 * 7; // 7 days of hourly data
    // Adjust these values based on your actual MinMaxScaler parameters
    const X_min = Math.min(...data)
    const X_max = Math.max(...data);

    const scaler = {
        transform: (data) => data.map(d => (d - X_min) / (X_max - X_min)), // Scales each value to [0, 1]
        inverseTransform: (data) => data.map(d => d * (X_max - X_min) + X_min), // Reverses the scaling
    };
    const model = await tf.loadGraphModel('/model/model.json');
    

    let latestData = tf.tensor3d(scaler.transform(data), [1, windowSize, 1]);

    const predictedTemperaturesNormalized = [];

    for (let i = 0; i < windowSize; i++) {
      const nextStepNormalized = model.predict(latestData);
      const nextValue = (await nextStepNormalized.data())[0];
      predictedTemperaturesNormalized.push(nextValue);

      latestData = tf.tidy(() => {
        const rolledData = latestData.slice([0, 1], [-1, windowSize-1]).squeeze(0);
        return tf.concat([rolledData, tf.tensor2d([[nextValue]])], 1).expandDims(0);
      });
    }

    // const predictedTemperatures = scaler.inverseTransform(predictedTemperaturesNormalized);
    // console.log("Predicted temperatures for the next 7 days (168 hours):");
    // console.log(predictedTemperatures);
  }
};

export default modelHandler;