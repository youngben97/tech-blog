const { User } = require('../models');

const userData = [
    {
        username: 'John Doe',
        password: 'password123'
    },
    {
        username: 'Jane Doe',
        password: 'thisismypassword'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;