# final-project

# Hacettepe University Beytepe Campus Location Mapping Project

## About The Project

This web application is developed to map the locations of cafés and other venues within Hacettepe University's Beytepe Campus, offering an interactive experience to visitors. The backend is crafted using Vue.js, while the frontend leverages the Leaflet library to provide features such as user login, an admin panel, and dynamic mapping capabilities.

## Technical Features

- **Node.js and Express**: Core technologies used for developing the RESTful API.
- **Vue.js**: Progressive JavaScript framework used for interaction between the frontend and backend.
- **Leaflet.js**: Open-source library used for creating interactive maps.
- **CORS and JSON Parsing**: Ensures proper handling of requests from different origins and JSON data structures.
- **PgAdmin4**: Tool used for database management and CSV data importing.
- **bcrypt**: Library used for secure password hashing.

## Main Files and Modules

- `Cafe_router.js`: An Express.js-based server managing CRUD operations for cafés.
- `Main.js`: RESTful API server that manages user and café data.
- `Index.html`: Interactive map displaying location information for cafés and other venues.
- `Admin.html`, `Login.html`, `Register.html`: Pages for user and admin login forms.
- `EditUser.vue`: A Vue.js component for updating user information.
- `admin-panel_vue`: A Vue.js interface for admin users to perform CRUD operations on the database.
- `log-reg`: Scripts for user registration, login, and admin login functionalities.
- `routers`: The main JavaScript file containing HTTP methods and handling frontend interactions.
- `.gitignore`: Configuration file to facilitate collaborative development and deployment.

## Installation

Follow these steps to run the project locally:

1. **Clone the project from GitHub:**

        git clone https://github.com/yourusername/hacettepe-campus-map.git

2. **Install the necessary dependencies:**

3. **Start the development server:**


## Usage

Once the development server is running, navigate to `localhost:3300` in your browser to use the application. After logging in, you can view and interact with the mapped locations of campus venues and access detailed information.

## Contributing

If you wish to contribute, please fork the project and submit your changes via a pull request. Be sure to read the `CONTRIBUTING.md` file before making contributions.

## License

This project is licensed under the MIT License. For more information, please refer to the `LICENSE` file.




