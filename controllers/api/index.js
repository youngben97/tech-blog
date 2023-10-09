const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;