Study Corner is a MERN stack project (MongoDB, Express, React, Node.js) - a full-stack web application for educational purposes.

Languages Used
As indicated by your language composition data:

JavaScript: 96.8% - Primary language used throughout the project
PHP: 1.6% - Minor component
Other: 1.6% - Configuration and miscellaneous files
How It Works
Architecture:

Frontend (React + Vite)

Built with React 18 for the user interface
Uses Vite as the build tool with Hot Module Replacement (HMR)
Styling: Tailwind CSS and DaisyUI for responsive design
Form handling: React Hook Form for managing form inputs
Routing: React Router DOM for client-side navigation
HTTP requests: Axios for API communication with the backend
UI components: React Slick carousel for image/content sliders
Notifications: React Hot Toast for user feedback
Backend (Node.js + Express)

Runtime: Node.js with Express.js web framework
Database: MongoDB with Mongoose ODM for data modeling
Authentication: bcryptjs for password hashing and security
CORS: Enabled for cross-origin requests between frontend and backend
Environment config: Uses dotenv for configuration management
Development: Nodemon for auto-restart during development
Project Structure
/Frontend/ - React + Vite application
/Backend/ - Express.js server with MongoDB integration
The application follows a typical client-server architecture where the frontend communicates with the backend API via HTTP requests to manage educational content and user interactions.
