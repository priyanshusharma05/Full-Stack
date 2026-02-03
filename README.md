# 📚 Student Management System

A comprehensive full-stack web application for managing student records, tracking academic results, and organizing sections efficiently.

## Features

✅ **Student Management**
- Add, edit, and delete student records
- Organize students by sections
- Track student information including roll numbers

✅ **Results Tracking**
- Record and manage student examination results
- Automatic grade calculation (A+, A, B, C, D, F, O)
- Calculate percentage and performance metrics
- Edit and delete result records

✅ **Section Organization**
- Pre-defined sections (CA, CB, CC, CD, Super30)
- Create new sections on the fly
- Assign students to specific sections

✅ **User Authentication**
- Secure sign-in and sign-up system
- Email validation
- Password protection
- Session management with localStorage
- User data persistence

✅ **Landing Page**
- Professional landing page with system overview
- Feature highlights
- How-it-works section
- Call-to-action buttons

✅ **Professional UI/UX**
- Modern blue gradient color scheme
- Responsive design for desktop and mobile
- Smooth animations and transitions
- Interactive data tables
- Form validation and error handling

## Tech Stack

- **Frontend:** React 19 with Hooks (useState, useEffect)
- **Build Tool:** Vite
- **Backend/Database:** JSON Server (mock REST API)
- **HTTP Client:** Fetch API
- **State Management:** React Hooks
- **Styling:** CSS3
- **Authentication:** localStorage + JSON Server

## Project Structure

```
miniproject/
├── components/
│   ├── StudentForm.jsx          # Form to add/create students
│   ├── StudentList.jsx          # Display and manage students
│   ├── ResultForm.jsx           # Form to add/create results
│   └── ResultList.jsx           # Display and manage results
├── Auth.jsx                     # Authentication component (Sign In/Sign Up)
├── Auth.css                     # Authentication styling
├── Landing.jsx                  # Landing page component
├── Landing.css                  # Landing page styling
├── MiniProject.jsx              # Main application container
├── MiniProject.css              # Main application styling
├── apiService.js                # API service layer for CRUD operations
├── userAPI.js                   # User authentication API
├── models.js                    # Data models (Student, Section, Result)
├── db.json                      # JSON Server database
├── start-server.js              # JSON Server start script
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- JSON Server (`npm install -g json-server`)

### Installation

1. **Clone or navigate to the project:**
```bash
cd c:\Users\sharm\Desktop\FULLSTACK2.0\React
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start JSON Server (in a separate terminal):**
```bash
json-server --watch src/miniproject/db.json --port 3000
```

Or use the provided start script:
```bash
node src/miniproject/start-server.js
```

4. **Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Landing Page
- Browse through the feature highlights and system information
- Click **"Get Started"** or **"Start Now"** to access authentication

### Authentication
- **New User:** Click **"Sign Up"** to create an account
  - Enter full name, email, and password
  - System validates email format and password requirements
  
- **Existing User:** Click **"Sign In"** to log in
  - Enter email and password
  - Session is saved in localStorage

### Dashboard

#### Students Tab
1. **Add Student:**
   - Fill in student name, section, and roll number
   - Select existing section or create a new one
   - Click "Add Student"

2. **Edit Student:**
   - Click "Edit" button on any student row
   - Modify name, section, or roll number
   - Click "Save" to confirm or "Cancel" to discard changes

3. **Delete Student:**
   - Click "Delete" button on any student row
   - Student will be removed (associated results are also cleaned up)

#### Results Tab
1. **Add Result:**
   - Select student from dropdown
   - Enter subject name
   - Input marks obtained and total marks
   - Click "Add Result"
   - Grade is automatically calculated

2. **Edit Result:**
   - Click "Edit" button on any result row
   - Modify student, subject, marks, or total marks
   - Grade and percentage update automatically
   - Click "Save" to confirm

3. **Delete Result:**
   - Click "Delete" button on any result row
   - Result will be removed from the system

4. **View Result Details:**
   - Student name and roll number displayed
   - Subject name
   - Marks and total marks
   - Percentage (calculated)
   - Grade (calculated)

### Grading System
Grades are automatically calculated based on percentage:
- **O** → 90% and above
- **A+** → 80% - 89%
- **A** → 70% - 79%
- **B+** → 60% - 69%
- **B** → 50% - 59%
- **C** → 40% - 49%
- **F** → Below 40%

### Logout
- Click "Logout" button in the header
- You'll be redirected to the landing page
- Session data is cleared

## API Endpoints

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get specific student
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Results
- `GET /results` - Get all results
- `POST /results` - Create new result
- `PUT /results/:id` - Update result
- `DELETE /results/:id` - Delete result

### Sections
- `GET /sections` - Get all sections
- `POST /sections` - Create new section

### Users (Authentication)
- `GET /users?email=:email` - Get user by email
- `POST /users` - Create new user

## Database Schema

### Students
```json
{
  "id": "string",
  "name": "string",
  "section": "string",
  "rollNumber": "string"
}
```

### Results
```json
{
  "id": "string",
  "studentId": "string",
  "subject": "string",
  "marks": "number",
  "totalMarks": "number"
}
```

### Sections
```json
{
  "id": "string",
  "sectionName": "string"
}
```

### Users
```json
{
  "id": "string",
  "fullName": "string",
  "email": "string",
  "password": "string",
  "createdAt": "string"
}
```

## Color Palette

The application uses a professional blue gradient color scheme:
- **Primary Blue:** `#1e3c72`
- **Secondary Blue:** `#2a5298`
- **Background:** `#f5f7fa`
- **Text:** `#333333`
- **White:** `#ffffff`

## Important Notes

⚠️ **ID Types:** All IDs in `db.json` must be strings for JSON Server to properly resolve PUT/DELETE requests.

⚠️ **JSON Server:** The mock backend (JSON Server) persists data to `db.json`. Changes are lost if you reset the file or restart with fresh data.

⚠️ **Authentication:** Passwords are stored in plain text in `db.json`. This is for demo purposes only. In production, use proper password hashing and encryption.

⚠️ **CORS:** JSON Server is configured to allow requests from the Vite dev server. For production, set up proper CORS policies.

## Troubleshooting

### HTTP 404 Errors
- **Issue:** Deleting or updating fails with "HTTP 404"
- **Solution:** Ensure all IDs in `db.json` are strings (not numbers)
- **Check:** Open `db.json` and verify IDs like `"1764092277358"` not `1764092277358`

### JSON Server Not Running
- **Issue:** Application shows "Failed to load data"
- **Solution:** Start JSON Server with `json-server --watch src/miniproject/db.json --port 3000`
- **Check:** Verify JSON Server is running on `http://localhost:3000`

### Login Issues
- **Issue:** Email not found or incorrect password
- **Solution:** Sign up with a new account or check email/password spelling
- **Test Accounts:**
  - Email: `counterearth6400@gmail.com` | Password: `password123`
  - Email: `nono12@gmail.com` | Password: `abc123`

### Data Not Persisting
- **Issue:** Changes are lost after refresh
- **Solution:** Ensure JSON Server is running and `db.json` is writable
- **Check:** Look for error messages in the browser console

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Export data to CSV/PDF
- [ ] Bulk import students from spreadsheet
- [ ] Email notifications for results
- [ ] Dashboard with statistics and charts
- [ ] User roles and permissions
- [ ] Real database (MongoDB/PostgreSQL) integration
- [ ] Mobile app version
- [ ] Dark mode theme

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Check the troubleshooting section above
- Review the browser console for error messages
- Verify JSON Server is running on port 3000
- Ensure all IDs in `db.json` are strings

## Author

Created as a full-stack demonstration project for learning React and Node.js fundamentals.

---

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Status:** Active Development
