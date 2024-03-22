# AI-Forecast

## Overview

AI - Forecast is a web application that delivers precise weather forecasts using a deep learning model developed with TensorFlow. The project's frontend is built with React, providing a seamless and interactive user experience. The model was created with python, integrates with TensorFlow to process and deliver predictive analytics. Our model is trained and refined using Jupyter Notebook, enabling experimentation with and improve our algorithms continuously.

## Features

Accurate Weather Forecasts: Utilize machine learning to offer precise weather predictions.
Interactive Web Interface: A user-friendly web interface built with React for easy navigation and accessibility.
Advanced Analytics: Deep learning model provides insights beyond basic weather forecasts, including pattern recognition and prediction reliability metrics.
Responsive Design: Fully responsive web design, ensuring a great experience on both desktop and mobile devices.


#### python to tensorflowjs conversion command

```

tensorflowjs_converter --input_format keras data/model/h5/model.h5 react-demo/public/model
```