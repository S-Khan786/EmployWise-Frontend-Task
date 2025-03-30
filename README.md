<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>EmployWise User Management System</h1>

<p>A complete React application for user management with authentication, CRUD operations, and responsive design.</p>

<h2>🌟 Features</h2>

<h3>🔒 Authentication</h3>
<ul>
    <li>Login screen with form validation</li>
    <li>JWT token storage</li>
    <li>Protected routes</li>
    <li>Automatic logout on token expiration</li>
</ul>

<h3>👥 User Management</h3>
<ul>
    <li>Paginated user listing</li>
    <li>Search functionality</li>
    <li>Add new users</li>
    <li>Edit existing users</li>
    <li>Delete users</li>
    <li>Responsive design for all devices</li>
</ul>

<h3>🛠️ Technical Features</h3>
<ul>
    <li>Context API for state management</li>
    <li>Custom notification system</li>
    <li>Error handling</li>
    <li>Loading states</li>
    <li>Form validation</li>
</ul>

<h2>🚀 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js (v16 or higher)</li>
    <li>npm or yarn</li>
</ul>

<h3>Installation</h3>
<pre><code>git clone https://github.com/yourusername/employwise-user-management.git
cd employwise-user-management
npm install
# or
yarn install</code></pre>

<h3>Running the Application</h3>
<pre><code>npm start
# or
yarn start</code></pre>


<h2>🔧 Technologies Used</h2>
<ul>
    <li><strong>React</strong> - Frontend library</li>
    <li><strong>Material-UI</strong> - UI component library</li>
    <li><strong>React Router</strong> - Navigation and routing</li>
    <li><strong>Axios</strong> - HTTP requests</li>
    <li><strong>Context API</strong> - State management</li>
</ul>

<h2>📝 API Endpoints Used</h2>
<p>The application uses the <a href="https://reqres.in/" target="_blank">Reqres.in</a> mock API:</p>
<ul>
    <li><strong>POST /api/login</strong> - User authentication</li>
    <li><strong>GET /api/users?page=1</strong> - Get paginated users</li>
    <li><strong>PUT /api/users/{id}</strong> - Update user</li>
    <li><strong>DELETE /api/users/{id}</strong> - Delete user</li>
</ul>

  <h2>For Login </h2>   
  <ul>      <li> Email : eve.holt@reqres.in </li>
        <li> Password : cityslicka </li></ul>


<h2>🎨 UI Components</h2>
<h3>Login Screen</h3>
<p>Clean authentication form with:</p>
<ul>
    <li>Email and password fields</li>
    <li>Form validation</li>
    <li>Error handling</li>
</ul>

<h3>User List</h3>
<p>Feature-rich interface with:</p>
<ul>
    <li>Responsive table layout</li>
    <li>Pagination controls</li>
    <li>Search functionality</li>
    <li>Action buttons (Edit/Delete)</li>
</ul>

<h2>📱 Responsive Design</h2>
<p>The application adapts to different screen sizes:</p>
<ul>
    <li>Desktop: Full-width tables with all columns visible</li>
    <li>Tablet: Compact table layout</li>
    <li>Mobile: Stacked cards view for better readability</li>
</ul>

<h2>🛡️ Error Handling</h2>
<p>Comprehensive error management including:</p>
<ul>
    <li>API error responses</li>
    <li>Form validation errors</li>
    <li>Network issues</li>
    <li>Authentication failures</li>
</ul>

</body>
</html>
