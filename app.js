// Importing necessary dependencies
const express = require('express');
const app = express();
const data = require('./data.json'); 
const path = require('path');

// Setting view engine to pug
app.set('view engine', 'pug');

// Use a static route to serve static files located in the 'public' folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// Setting routes
app.get('/', (req, res) => {
res.render('index', { projects: data.projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});


app.get('/project/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = data.projects.find((p) => p.id === projectId);

// Rendering a customized version of the Pug project and 404 error page
  if (project) {
 
    res.render('project', { project });
  } else {

    res.status(404).render('not-found');
  }
});

// 404 handler for undefined routes
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    console.error(`Error: ${err.message}, Status: ${err.status}`);
    res.status(404).render('not-found', { error: err });
  });
  
// Global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Server Error';
  console.error(`Error: ${err.message}, Status: ${err.status}`);
  res.status(err.status).render('error', { error: err.message });
});

// Start the server and listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log("The application is running on localhost:3000");
});