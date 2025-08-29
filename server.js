const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Helper function to create concat_string in alternating caps (reverse order)
function buildConcatString(alphabets) {
  const letters = alphabets.join("").split("");
  let result = "";
  let toggle = true; // start with uppercase
  for (let i = letters.length - 1; i >= 0; i--) {
    let ch = letters[i];
    if (/[a-zA-Z]/.test(ch)) {
      result += toggle ? ch.toUpperCase() : ch.toLowerCase();
      toggle = !toggle;
    }
  }
  return result;
}

// POST /bfhl - Main API logic
app.post("/bfhl", (req, res) => {
  try {
    const input = req.body.data;
    if (!Array.isArray(input)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    input.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const concat_string = buildConcatString(alphabets);

    res.json({
      is_success: true,
      user_id: "kartik_choudhary_20072004",
      email: "kartik.choudhary2022@vitstudent.ac.in",
      roll_number: "22BCE1095",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// GET /bfhl - Friendly message for direct browser visits
app.get("/bfhl", (req, res) => {
  res.send({
    message: "This is the BFHL API endpoint. Send a POST request with JSON like: { data: [ ... ] }",
    example: { data: ["a", "1", "334", "4", "R", "$"] },
  });
});

// === Frontend homepage ===
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>BFHL API Tester</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        body {
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(to right, #fbc2eb, #a6c1ee);
          margin: 0; padding: 0;
          display: flex; justify-content: center; align-items: center;
          min-height: 100vh;
        }
        .container {
          background: #ffffffdd;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 700px;
          width: 90%;
        }
        h1 { color: #333; margin-bottom: 20px; }
        textarea {
          width: 90%; padding: 15px; border-radius: 12px;
          border: 1px solid #ccc; margin-bottom: 20px; font-size: 16px;
        }
        button {
          padding: 12px 25px; font-size: 16px; border-radius: 12px;
          border: none; background: #ff6f61; color: white; cursor: pointer; transition: 0.3s;
        }
        button:hover { background: #ff3b2f; }
        pre {
          text-align: left; background: #f0f0f0; padding: 20px;
          border-radius: 12px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;
          max-height: 300px;
        }
        footer { margin-top: 30px; font-size: 14px; color: #555; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Kartik Choudhary's BFHL API Tester</h1>
        <p>Enter array elements (comma separated):</p>
        <textarea id="inputArray" rows="3" placeholder="Example: a,1,334,4,R,$"></textarea><br>
        <button onclick="sendData()">Get Response</button>
        <h2>Response:</h2>
        <pre id="responseOutput">{}</pre>
      </div>
      <script>
        async function sendData() {
          const input = document.getElementById('inputArray').value.split(',').map(s => s.trim());
          try {
            const res = await fetch('/bfhl', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: input })
            });
            const data = await res.json();
            document.getElementById('responseOutput').textContent = JSON.stringify(data, null, 2);
          } catch (err) {
            document.getElementById('responseOutput').textContent = 'Error: ' + err.message;
          }
        }
      </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
