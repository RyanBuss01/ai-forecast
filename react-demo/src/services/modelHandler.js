import * as tf from '@tensorflow/tfjs';



const modelHandler = {
  forecast: async (data, loadingCallback) => {
    const windowSize = 24 * 7; // 7 days of hourly data
    // Adjust these values based on your actual MinMaxScaler parameters
    const X_min = data.reduce((min, d) => Math.min(min, d), Infinity);
    const X_max = data.reduce((max, d) => Math.max(max, d), -Infinity);

    const scaler = {
        transform: (data) => data.map(d => (d - X_min) / (X_max - X_min)), // Scales each value to [0, 1]
        inverseTransform: (data) => data.map(d => d * (X_max - X_min) + X_min), // Reverses the scaling
    };
    const model = await tf.loadLayersModel('/ai-forecast/model/model.json');

    let windowData = data.slice(data.length - windowSize); // Last 7 days of hourly data
    let latestData = tf.tensor3d(scaler.transform(windowData), [1, windowSize, 1]);

    const predictedTemperaturesNormalized = [];

    for (let i = 0; i < windowSize; i++) {
      const nextStepNormalized = model.predict(latestData);
      const nextValue = (await nextStepNormalized.data())[0];
      predictedTemperaturesNormalized.push(nextValue);

      latestData = tf.tidy(() => {
        // Remove the first value of the sequence
        const rolledData = latestData.slice([0, 1, 0], [-1, windowSize-1, 1]);
        // Concatenate the new value at the end of the sequence
        const updatedData = tf.concat([rolledData, tf.tensor3d([[[nextValue]]])], 1);
        return updatedData;
      });
      loadingCallback(i)
    }

    let resData = scaler.inverseTransform(predictedTemperaturesNormalized);

    let splitDataByDay = [];
    for (let i = 0; i < 7; i++) {
        splitDataByDay.push(resData.slice(i * 24, (i + 1) * 24));
    }
    return {full: resData, split: splitDataByDay};

    }

};

export default modelHandler;