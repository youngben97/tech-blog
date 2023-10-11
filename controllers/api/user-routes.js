const router = require('express').Router();
const { User, BlogPost } = require('../../models');

// router.get('/', async (req, res) => {
//   try {
//     const dbUserData = await User.findAll();

//     res.status(200).json(dbUserData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

// router.get('/:id', async (req, res) => {
//   try {
//       const userData = await User.findByPk(req.params.id, {
//         include: [{ model: BlogPost }]
//       });

//       if(!userData) {
//       res.status(404).json({ message: 'No user found with this id'});
//       return
//       };

//       res.status(200).json(userData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      })
    } catch (err) {
      return res.status(400).json(err);
    }
  });

// user login
//this differes from example w/ usename instead of email - change if you have to
router.post('/login', async (req, res) => {
  try {
    console.log('Entering /login route');
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }


    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      
      return res.json({ user: userData, message: 'You are now logged in!' });
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
