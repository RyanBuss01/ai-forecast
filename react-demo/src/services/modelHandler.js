import * as tf from '@tensorflow/tfjs';

const modelHandler = {
    forecast: async (data) => {
        const model = await tf.loadLayersModel('/model/model.json');

        
        
    }

  
};

export default modelHandler;