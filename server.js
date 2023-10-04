const express = require('express');
const cors = require('cors');
const axios = require('axios'); // We'll use Axios for making HTTP requests
const app = express();
const port = process.env.PORT || 3000; // Update port to use environment variable if available

app.use(cors());

// Define a new endpoint that accepts query parameters
app.get('/news', async (req, res) => {
  try {
    // Extract query parameters from the request
    const { q, apiKey } = req.query;

    // Check if required parameters are provided
    if (!q || !apiKey) {
      return res.status(400).json({ error: 'Missing query parameters: q and apiKey are required.' });
    }

    // Construct the News API URL with the provided query and apiKey
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`;

    // Make a GET request to the News API
    const response = await axios.get(newsApiUrl);

    // Extract the data from the response
    const newsData = response.data;

    // Send the news data as a JSON response
    res.status(200).json(newsData);
    
  } catch (error) {
    // Handle errors
    console.error('Error fetching news data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
