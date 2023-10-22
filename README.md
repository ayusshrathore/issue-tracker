# Issue Tracker

This is a simple issue tracker web application built using Next.js, Prisma, Tailwind CSS, and React Query. It allows you to create, update, and delete issues, assign issues to users, and view a summary of all issues.

## Features

- **User Authentication:** The application supports user authentication and authorization. Users can create accounts and log in to manage issues.

- **Create Issues:** Users can create new issues with a title, description, and assign them to other users.

- **Update Issues:** You can update the status, title, and description of existing issues.

- **Delete Issues:** Users can delete issues they no longer need.

- **Assign Issues:** Assign issues to specific users, which helps in task management and responsibility tracking.

- **Issue Summary:** There's a summary view that provides an overview of all issues, including their current status and assigned users.

## Screenshots
<img width="1470" alt="Screenshot 2023-10-22 at 1 34 59 PM" src="https://github.com/ayusshrathore/issue-tracker/assets/61450246/b2ac685d-b2c8-4b17-b08a-be339a334b05">
<img width="1470" alt="Screenshot 2023-10-22 at 1 35 07 PM" src="https://github.com/ayusshrathore/issue-tracker/assets/61450246/90182d18-9fea-4fa7-995d-dd95a9c350bf">
<img width="1470" alt="Screenshot 2023-10-22 at 1 35 31 PM" src="https://github.com/ayusshrathore/issue-tracker/assets/61450246/9263e75c-5d84-4cc9-a5d7-f73de6457fb9">
<img width="1470" alt="Screenshot 2023-10-22 at 1 35 43 PM" src="https://github.com/ayusshrathore/issue-tracker/assets/61450246/1182cabf-6e4c-4cbf-a219-4c16e378191f">


## Getting Started

To get started with this issue tracker, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/ayusshrathore/issue-tracker.git
   cd issue-tracker
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure the database:

   - Create a `.env` file in the root directory with your database connection URL. For example:

     ```
     DATABASE_URL=""
     NEXTAUTH_URL=""
     NEXTAUTH_SECRET=""
     GOOGLE_CLIENT_ID=""
     GOOGLE_CLIENT_SECRET=""
     ```

   - Run database migrations to create the necessary tables:

     ```
     npx prisma migrate dev
     ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Visit `http://localhost:3000` in your web browser to use the issue tracker.

## Tech Stack

- **Next.js:** A React framework for building web applications.
- **Prisma:** A modern database toolkit for Node.js and TypeScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **React Query:** A data-fetching and state management library for React applications.

## Folder Structure

- `/app`: Next.js app components.
- `/app/components`: Reusable React components.
- `/app/api`: API routes for the application.
- `/app/hooks`: Custom React hooks to fetch data using React Query.
- `/prisma`: Database schema and migrations.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Create a pull request explaining the changes you've made.

## Authors

- [Ayush Rathore](https://github.com/ayusshrathore)

## Acknowledgments

- This project was inspired by the need for a simple issue tracking system.

Feel free to reach out if you have any questions or encounter any issues while using this application. Enjoy tracking your issues!
