const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res) => {
  // Use server-sent events to continuously send the time to the client.
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache');

  // Function to send the current time as an HTML fragment.  This avoids
  // having to send the entire HTML page on every update.
  const sendTime = () => {
    const now = new Date().toLocaleTimeString();
    // Send a minimal HTML fragment containing only the time.
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Running Clock</title>
          <style>
            body {
              font-family: sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f0f0f0;
            }
            .clock-container {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            #time {
              font-size: 2em;
              color: #333;
            }
          </style>
      </head>
      <body>
        <div class="clock-container">
          <div id="time">${now}</div>
          <noscript>
             <p>Please enable JavaScript to see the current time.</p>
          </noscript>
        </div>

        <script>
           function updateTime() {
              fetch('/time')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('time').innerHTML = data;
                })
                .catch(error => {
                    console.error("Error fetching time:", error);
                    document.getElementById('time').innerHTML = "Error"; // set error message
                });
           }
           setInterval(updateTime, 1000);
        </script>
      </body>
      </html>
    `);
  };

  sendTime(); // Send initial time
});

app.get('/time', (req, res) => {
    const now = new Date().toLocaleTimeString();
    res.send(now);
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
