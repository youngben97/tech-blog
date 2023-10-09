const router = require('express').Router();
const { User, Comment, BlogPost } = require('../../models');

//find all blogposts and include associated user and comments
router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
          include: [
            { model: User, attributes: ['id', 'username']},
            { model: Comment, attributes: ['id', 'comment']},
          ],
          attributes: {exclude: ['user_id']}  
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//find a specific blogpost and include associated user and comments
router.get('/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
          include: [
            { model: User, attributes: ['id', 'username']},
            { model: Comment, attributes: ['id', 'comment']},
          ],
          attributes: {exclude: ['user_id']}  
        });

        if(!blogData) {
            res.status(404).json({ message: 'No blog post found with this id.'});
            return
          };

        res.status(200).json(blogData);
      } catch (err) {
        res.status(500).json(err);
    }
});

//create a blogpost
router.post('/', async (req, res) => {
  try {
    const blogData = await BlogPost.create(req.body);
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a blogpost
router.put('/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.update(req.body, {
          where: {
            id: req.params.id
          }
        });

        res.status(200).json(blogData)
    } catch (err) {
        res.status(500).json(err);
    }
})

//delete a blogpost
router.delete(':/id', async (req, res) => {
    try {
        const blogData = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;