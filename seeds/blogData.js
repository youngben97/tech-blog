const { BlogPost } = require('../models');

const blogData = [
    {
        id: 1,
        title: 'Why I love Javascript',
        content: 'It is neat!',
        user_id: 1
    },
    {
        id: 2,
        title: 'Why I loath Javascript',
        content: 'Javascript is the winter of my discontent',
        user_id: 1
    },
    {
        id: 3,
        title: 'How I helped John love JS again',
        content: 'John was having a hard time with JS but we had a stern chat and he is good now.',
        user_id: 2
    }
];

const seedBlogs = () => BlogPost.bulkCreate(blogData);

module.exports = seedBlogs;