# Node.Js-Task2

This code is a Node.js HTTP server that handles incoming POST requests to add data to a file (`collections.js`) while preventing duplicate entries. It reads the existing data from the file, checks if the incoming data already exists, and either appends the new data or rejects it if it’s a duplicate. The server uses the `fs` module for file operations and the `req.on()` method to handle streamed request data.
