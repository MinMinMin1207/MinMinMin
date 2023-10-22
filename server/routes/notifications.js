import express from "express";
import axios from 'axios'; 

import Notification from "../models/Notification.js";

import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse, ErrorResponse, UnAuthorizedResponse } from '../common/reponses.js'

const router = express.Router();

router.post("/", (req, res) => {

  const message = {
    data: {
      title: "New message received",
      body: "Hello, How are you?"
    },
    to: "device-token-here"
  };

  const endpoint = 'https://fcm.googleapis.com/fcm/send';
  const headers = {
    'Authorization': 'key=your-api-key-here', 
    'Content-Type': 'application/json'
  };

  axios.post(endpoint, message, { headers: headers }) 
    .then(response => {
      console.log('Successfully sent message:', response.data);
      res.status(200).json({ message: 'Successfully sent message', response: response.data });
    })
    .catch(error => {
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Error sending message, status code:', error.response.status);
        res.status(error.response.status).json({ message: 'Error sending message', statusCode: error.response.status });
      } else {
        res.status(500).json({ message: 'Error sending message', error: error });
      }
    });
});

export default router;

























// import express from "express";
// import Notification from "../models/Notification.js";

// import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse, ErrorResponse, UnAuthorizedResponse } from '../common/reponses.js'

// const router = express.Router();

// const request = require('request');

// //Define the message payload
// const message = {
//     data: {
//         title: "New message received",
//         body: "Hello, How are you?"
//     },
//     to: "device-token-here"
// };

// const endpoint = 'https://fcm.googleapis.com/fcm/send';
// const headers = {
//   'Authorization': 'key=your-api-key-here',
//   'Content-Type': 'application/json'
// };

// request.post({
//   url: endpoint,
//   headers: headers,
//   body: JSON.stringify(message)
// }, 

// function(error, response, body) {
//   if (error) {
//     console.error('Error sending message:', error);
//   } else if (response.statusCode !== 200) {
//     console.error('Error sending message, status code:', response.statusCode);
//   } else {
//     console.log('Successfully sent message:', body);
//   }
// });


