### Streamify: is an inspired project from the twitch and tries to implement basic functionalities of it and perform basic CRUD operations using React and Redux. It allows users to perform certain actions 
### after successfully logging in to the system using google g-mail authentication system. In order to run this project using follow command:
### `npm start`

Project Structure:
### api
    It is configured with basic settings in the index.js file. It uses port 3001 of the localhost for run its services. In order to run the server use following command:
    `npm start`
### client/src
    -> actions
        - index.js
            ::> contains following action creator:
                - signIn
                - signOut
                - createStream
                - fetchStreams
                - fetchStream
                - editStream
                - deleteStream
        - type.js
            ::> contains all action names to prevent typo error
    -> apis
        - stream.js
            ::> connects with the rest api local server at port 3001
    -> components
        -> streams
            - StreamCreate.js
                ::> returns ui component that allows logged in user to create a new stream
            - StreamDelete.js
                ::> returns ui component that allows logged in user to delete a certain stream
            - StreamEdit.js
                ::> returns ui component that allows logged in user to edit a certain stream
            - StreamForm.js
            - StreamList.js
                ::> returns ui component that allows user to view a certain active stream
            - StreamShow.js
                ::> returns ui component that allows user to view list of available streams
        -  App.js
        -  GoogleAuth.js
        -  Header.js
        -  Modal.js
    -> reducers
    -  history.js
    -  index.js

### rtmpserver
    It is configured with basic settings in the index.js file. It uses port 8000 of the localhost for run its services. In order to run the server use following command:
    `npm start`



