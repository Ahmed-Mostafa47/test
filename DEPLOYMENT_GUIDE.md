# VulnLabs Deployment Guide

## Project Overview
This is a **Vite + React** application with serverless backend functions for Vercel deployment.

### Project Structure
\`\`\`
├── src/                          # React application source
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   ├── components/
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── LoginPage.jsx      # Login with role selection
│   │   │   ├── RegisterPage.jsx   # Registration with roles
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx # Admin console (role-based)
│   │   │   ├── NetworkPage.jsx    # Collaboration forum
│   │   │   └── ...
│   │   └── layout/
│   │       └── Navbar.jsx         # Navigation with dynamic role routes
│   ├── hooks/
│   │   └── useAuth.js            # Auth management with role support
│   └── data/
│       └── navigationData.js      # Navigation items
├── api/                          # Serverless functions for Vercel
│   ├── auth/
│   │   └── validate.json         # Role permissions
│   └── network/
│       ├── discussions.js        # Forum discussions API
│       ├── responses.js          # Responses/replies API
│       └── acknowledgments.js    # Acknowledgments API
├── vite.config.js               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── package.json                 # Dependencies

## Features

### 1. Role-Based Authentication
- **Admin**: Full system access, user management, lab creation
- **Instructor**: Lab management, moderation, analytics
- **User**: Lab participation, discussions

### 2. Admin Dashboard
- User management with CRUD operations
- Lab creation and management
- System status monitoring
- Statistics overview

### 3. Network Forum (Collaborative Platform)
- Post discussions
- Acknowledge insightful responses
- Reply with threaded conversations
- User-specific content management

### 4. Serverless Backend
- Three API endpoints for discussions, responses, and acknowledgments
- Zero-cost scaling on Vercel
- CORS-enabled for frontend communication

## Deployment to Vercel

### Prerequisites
- Node.js 16+ installed
- Vercel CLI: `npm i -g vercel`
- GitHub account (optional but recommended)

### Steps

#### Option 1: CLI Deployment
\`\`\`bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel deploy --prod
\`\`\`

#### Option 2: Git Integration
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your repository
5. Vercel auto-detects Vite and deploys

### Environment Variables
No environment variables required for basic deployment. The app uses mock data for testing.

For production with database:
- `VITE_API_URL`: Backend API URL (if different from Vercel domain)
- `DATABASE_URL`: Database connection string

### API Endpoints (Vercel)
After deployment, your APIs will be available at:
- `https://your-app.vercel.app/api/network/discussions`
- `https://your-app.vercel.app/api/network/responses`
- `https://your-app.vercel.app/api/network/acknowledgments`

## Testing Locally

### Development Server
\`\`\`bash
npm run dev
\`\`\`
Opens at http://localhost:5173

### Test Credentials
- **Admin**: any email / password, select "Administrator" role
- **Instructor**: any email / password, select "Instructor" role
- **User**: any email / password, select "Student User" role

### Routes
- `/` - Login/Register
- `/home` - Dashboard
- `/training` - Training modules
- `/labs` - Available labs
- `/dashboard` - Admin console (admin only)
- `/network` - Discussion forum (all users)

## Key Components

### Authentication Flow
1. Register with role selection
2. Email verification (mock)
3. Password setup
4. Login with role-based access

### Admin Dashboard Features
- User management table
- Lab CRUD operations
- System status monitoring
- Real-time statistics

### Network Forum Features
- Create discussions
- Post responses
- Acknowledge contributions
- Delete own content

## Troubleshooting

### Issue: API calls fail
**Solution**: Check CORS headers in API functions - they're pre-configured in `/api/**/*.js`

### Issue: Admin dashboard not showing
**Solution**: Ensure user role is set to 'admin' during login/registration

### Issue: Navigation links don't work
**Solution**: Check that all page routes match in `src/App.jsx` and navigation components

## Production Considerations

1. **Database**: Replace mock data with actual database
2. **Authentication**: Integrate with Supabase Auth or similar
3. **Caching**: Enable Vercel's Edge Caching for API endpoints
4. **Monitoring**: Set up Vercel Analytics
5. **Security**: Use environment variables for sensitive data

## Next Steps

1. Deploy the current version to Vercel (should work immediately)
2. Connect to a real database (Supabase/Neon recommended)
3. Set up email service for verifications
4. Implement actual lab execution backend
5. Add WebSocket support for real-time forum updates
