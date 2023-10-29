# 349_project
making a web app that allows user interaction

Database Connection Instructions:

Navigate to project directory in terminal, run 'npm install' to install the node_modules. Then, download the "titanmap-bc8cf-firebase-adminsdk-lfmn3-741d8df0f9.json" from discord and place it in the same directory. 

'npm install jsonwebtoken' to allow logging in. Cookies were a pain to implement, so I commented out that code and used JSON web token instead. If we wanted to use cookies in the future, we'd need 'npm install cookie-parser', but that is not neccessary.

To run servers:

npm install -g http-server

npm install cors

To run back end, open 2nd terminal and run:

node main.js

To run front end, open 3rd terminal and run:

http-server --cors


to use site locally, in browser go to http://localhost:8080/
