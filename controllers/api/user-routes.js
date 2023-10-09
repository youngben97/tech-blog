const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll();

    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      const newUser = dbUserData.get({ plain: true });
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        req.session.user_id = newUser.id;
  
        return res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  });

// user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }


    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;