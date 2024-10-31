# Job Finder Application

This is a job listing application that allows users to view job listings. The application includes features like job filtering, and an admin authentication system.

## Features

- **View Jobs**: Users can browse job listings with filters for location, job type, experience, and company.
- **Pagination**: The job listings are paginated to improve performance and user experience.
- **Search Functionality**: Users can search for any keyword in any field of the job.
- **State Management**: Used redux toolkit for state management.
- **Admin Authentication**: Admins can log in to manage job listings.
- **Dynamic UI**: Listings and admin status are dynamically updated without requiring page reloads.
- **Responsive Design**: The app is designed to work on various screen sizes and devices.

## Technologies Used

- **Frontend**: React (with Vite), Tailwind CSS, Redux Toolkit
- **Backend**: Express.js, MongoDB, JWT


### Setup Instructions

1. **Clone the Repository**

2. **Install Dependencies**:

   - Navigate to the backend folder and install dependencies:

     ```bash
     cd backend
     npm install
     ```

   - Navigate to the frontend folder and install dependencies:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:

   - In the `backend` folder, create a `.env` file and add your MongoDB URI and any other necessary environment variables.

     ```env
     PORT=3000
     MONGO_URI=your_database_uri
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Application**:

   - Start the backend server:

     ```bash
     cd backend
     npm run dev
     ```

   - Start the frontend development server:

     ```bash
     cd ../frontend
     npm run dev
     ```

5. **Access the Application**:

   - Open your browser and go to `http://localhost:5173` to view the frontend.
   - The backend server should be running at `http://localhost:3000`.

