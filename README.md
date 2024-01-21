# final-project

Hacettepe University Campus Location Mapping Project
About The Project
This project is designed to provide an interactive mapping solution for the Hacettepe University, Beytepe Campus. Utilizing a combination of advanced web technologies, the backend is crafted with Vue.js and features user and admin login capabilities with admin privileges. The location data of campus facilities is fetched from a PgAdmin4 database, initially seeded from a CSV file.

Features
User Authentication: Secure user login to access personalized features.
Admin Control: Admin login with comprehensive privileges for site management.
Dynamic Mapping: Integration with the Leaflet library to render an interactive map of the campus.
Data Integration: Utilizes PgAdmin4 for data retrieval and management.
Interactive Elements: Custom checkboxes for different campus locations with clickable events to display reviews or additional information.
Frontend
The frontend is developed using Leaflet.js, a powerful library for mobile-friendly interactive maps. Campus locations are dynamically matched with their respective coordinates, fetched from the server and displayed in an HTML format. Various checkboxes allow users to filter the campus locations according to their preferences.

Backend
Vue.js is employed to create a robust backend. User authentication is handled securely, providing a seamless experience. Administrative features include the ability to manage the map data, user roles, and access permissions.

Data Management
Data is managed using PgAdmin4, with an initial import from a CSV file containing the campus location data. This allows for easy updates and management of the campus locations.

Installation
Instructions for setting up a local development environment:

Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/hacettepe-campus-map.git
Install dependencies:
Copy code
npm install
Start the development server:
arduino
Copy code
npm run serve
Usage
Explain how someone can use this project. Include screenshots or code blocks if necessary.

Contributing
Encourage contributions and provide guidelines on how to do so.

License

MIT License -- Copyright (c) 2024 GMT351-group-13