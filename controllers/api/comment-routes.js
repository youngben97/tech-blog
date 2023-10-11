const router = require('express').Router();
const { User, Comment } = require('../../models');

//get all comments along with associated user
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                { model: User, attributes: ['id', 'username']}
            ],
            // attributes: { exclude: ['user_id']}
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get comment by id along with associated user
// router.get('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.findByPk(req.params.id, {
//             include: [{ model: User, attributes: ['id', 'username']}],
//             // attribubtes: { exclude: ['user_id'] }
//         });

//         if(!commentData) {
//         res.status(404).json({ message: 'No comment found with this id'});
//         return
//         };

//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: { id: req.params.id },
            include: [{ model: User }]
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a comment
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const commentData = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            blogpost_id: req.body.blogpost_id
        });
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
    }
});

//update a comment
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a comment
router.delete(':/id', async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;