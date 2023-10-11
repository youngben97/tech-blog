const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            include: [
                { model: User, attributes: ['username']},
                { model: Comment, attributes: ['comment']}
            ]
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain : true}));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model : User, attributes: ['username']},
                { model: Comment, attributes: ['comment']}
            ]
        });

        const blogpost = blogpostData.get({ plain: true });

        res.render('blog', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    console.log('Entering /dashboard route handler');
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost}]
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in
        });
    console.log('Exiting /dashboard route handler');
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    console.log('Entering /dashboard');
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
    console.log('Before Redirect');
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

module.exports = router;