# Deployment Instructions for TaskTreker

## 1. Setting Up Backend with Hostinger MySQL

### Create .env file

Create a `.env` file in the `backend` folder with the following content (replace with your actual Hostinger database values):

```
PORT=5001
DB_HOST=your-hostinger-host.com
DB_USER=u498177675_mytask
DB_PASSWORD=your-secure-password
DB_NAME=u498177675_tsak
DB_PORT=3306
DB_SSL=true
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=7d
```

### Database Setup Instructions

1. Log in to your Hostinger control panel
2. Go to Databases section
3. Make sure your MySQL database `u498177675_tsak` is properly set up
4. Ensure your database user `u498177675_mytask` has full privileges

### Deploying to Render.com (Free Tier)

1. Create a [Render.com](https://render.com) account
2. Connect your GitHub repository or upload your code
3. Create a new Web Service
4. Configure:
   - Name: `tasktreker-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

5. Set environment variables (same as your .env file):
   - `PORT`: 10000 (Render will override this)
   - `DB_HOST`: your-hostinger-host.com
   - `DB_USER`: u498177675_mytask
   - `DB_PASSWORD`: your-secure-password
   - `DB_NAME`: u498177675_tsak
   - `DB_PORT`: 3306
   - `DB_SSL`: true
   - `JWT_SECRET`: your-secure-jwt-secret
   - `JWT_EXPIRES_IN`: 7d

6. Deploy the service
7. Note your Render.com URL (e.g., `https://tasktreker-backend.onrender.com`)

## 2. Frontend Configuration

Update your frontend API endpoint in `frontend/utils/api.js`:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-render-url.onrender.com/api';
```

### Deploying to Hostinger

1. Build your Next.js app:
   ```
   cd frontend
   npm run build
   ```

2. In Hostinger control panel:
   - Go to Website section
   - Upload the contents of the `.next` folder
   - Configure Node.js hosting settings
   - Set environment variable: `NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com/api`

3. Configure your domain settings in Hostinger

## 3. Testing Your Deployment

Once both backend and frontend are deployed:

1. Visit your frontend URL
2. Test registration, login, and task operations
3. Verify that the frontend can communicate with the backend

## Troubleshooting

- **Database Connection Issues**: Ensure your Hostinger MySQL credentials are correct and the database server allows remote connections.
- **CORS Errors**: The backend is configured to accept requests from any origin, but you may need to update CORS settings for specific domains.
- **SSL Issues**: Make sure your DB_SSL setting matches Hostinger's requirements (usually true for production).

## Security Note

Remember to:
- Use strong passwords for your database and JWT secret
- Never commit sensitive information to your repository
- Regularly update dependencies to patch security vulnerabilities 