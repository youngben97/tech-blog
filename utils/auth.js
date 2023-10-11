const withAuth = (req, res, next) => {
  console.log('Entering withAuth middleware');
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    console.log('Exiting withAuth middleware');
    next();
  }
};

module.exports = withAuth;
