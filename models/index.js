const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: { model: User, foreignKey: 'id' }
});

User.hasMany(Comment, {
    foreignKey: { model: User, foreignKey: 'id'}
})

BlogPost.belongsTo(User, {
    foreignKey: { model: User, foreignKey: 'id'}
});

Comment.belongsTo(User, {
    foreignKey: { model: User, foreignKey: 'id'}
});

BlogPost.hasMany(Comment, {
    foreignKey: { model: BlogPost, foreignKey: 'id'}
});

Comment.belongsTo(BlogPost, {
    foreignKey: {model: BlogPost, foreignKey: 'id'}
})

module.exports = {
    User,
    BlogPost,
    Comment,
};