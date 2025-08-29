# BFHL API Tester

A **REST API** built with **Node.js** to process arrays and return odd/even numbers, alphabets, special characters, sum of numbers, and a concatenated string following alternating caps rules.  

The API also includes a **beautiful frontend interface** to test the API without using Postman.

---

## Features

- POST `/bfhl` endpoint to send an array and get a structured response
- Handles:
  - Odd numbers
  - Even numbers
  - Alphabets (uppercase)
  - Special characters
  - Sum of numbers
  - Concatenation of all alphabets in **reverse order with alternating caps**
- Beautiful, interactive frontend page for testing
- JSON response contains **numbers as strings**, as required

---

## Example Requests & Responses

### Example A
**Request:**
```json
{
  "data": ["a","1","334","4","R","$"]
}
Response:

json
Copy code
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
Example B
Request:

json
Copy code
{
  "data": ["2","a","y","4","&","-","*","5","92","b"]
}
Response:

json
Copy code
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A","Y","B"],
  "special_characters": ["&","-","*"],
  "sum": "103",
  "concat_string": "ByA"
}
Frontend Interface
The API also provides a webpage interface at the root URL /:


Enter array elements, click "Get Response" and see the output instantly.


Beautiful gradient design with responsive layout.

How to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/Kartik123Choudhary/API_TESTER.git
cd API_TESTER
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node server.js
Open browser at http://localhost:3000 to use the frontend interface.

API Endpoint
POST /bfhl

Content-Type: application/json

Example body:

json
Copy code
{
  "data": ["a","1","334","4","R","$"]
}
Hosted API (Optional)
If deployed online, you can use:

arduino
Copy code
https://your-deployment-url.com/bfhl
Author
Kartik Choudhary

Email: kartik.choudhary2022@vitstudent.ac.in

B.Tech, Vellore Institute of Technology
