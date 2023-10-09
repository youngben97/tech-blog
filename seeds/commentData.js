const { Comment } = require('../models');

const commentData = [
    {
      id: 1,
      comment: "Nice!",
      blogpostId: 1,
      user_id: 1
    },
    {
      id: 2,
      comment: "Wowza!!!",
      blogpostId: 2,
      user_id: 1
    },
    {
      id: 3,
      comment: "Interesting read!!",
      blogpostId: 3,
      user_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;