const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: { model: User, foreignKey: 'id' }
});

BlogPost.belongsTo(User, {
    foreignKey: { model: User, foreignKey: 'id'}
});

Comment.belongsTo(User, {
    foreignKey: { model: User, foreignKey: 'id'}
});

BlogPost.hasMany(Comment, {
    foreignkey: { model: BlogPost, foreignKey: 'id'}
});

module.exports = {
    User,
    BlogPost,
    Comment,
};