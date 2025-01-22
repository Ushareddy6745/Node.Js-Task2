const http = require("http");
const port = 3003;
const fs = require("fs");

const server = http.createServer((req, res) => {
  let inputData = "";

  req.on("data", (chunk) => {
    inputData += chunk; // Collect incoming data
    console.log(inputData, "inputdata");

    // Read the existing data from the file
    fs.readFile("./collections.js", "utf-8", (error, existingData) => {
      if(error){
        console.log(error)
        res.end(error)
       }else{
        console.log(existingData,"existing data",typeof JSON.parse(existingData))//existing data
       }
      // Parse existing data and incoming data
      let newData = JSON.parse(existingData || "[]"); // Default to empty array if file is empty
      let parsedInputData = JSON.parse(inputData); // Parse incoming JSON data

      // Check for duplicates
      let isDuplicate = false;
      for (let i = 0; i < newData.length; i++) {
        if (JSON.stringify(newData[i]) === JSON.stringify(parsedInputData)) {
          isDuplicate = true;
          break;
        }
      }

      if (isDuplicate) {
        console.log("Duplicate data. No insertion.");
        res.end("Duplicate data is not allowed.");
      } else {
        // Add new data to the array
        newData.push(parsedInputData);
        console.log(newData, "Updated data");

        // Write the updated data back to the file
        fs.writeFile("./collections.js", JSON.stringify(newData, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.end("Error writing to file");
          } else {
            res.end("Data added successfully");
          }
        });
      }
    });
  });

  req.on("end", () => {
    res.end(); // Ensure the response ends
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});


