import axios from 'axios';

async function sendApiRequest() {
    try {
      const response = await axios.get('https://rj-portfolio-api.onrender.com/users/hero');
      const data = await response.json();
  
      // Process the received data
      console.log(data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Set the interval to send the request every 10 seconds
  let interval = Math.round(Math.random() * 180000); 
  const intervalId = setInterval(sendApiRequest, interval);
  
  // To stop the interval later:
  // clearInterval(intervalId);