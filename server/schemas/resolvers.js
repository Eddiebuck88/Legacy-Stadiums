const { AuthenticationError } = require('apollo-server-express');
const { User, Art } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('art');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('art');
    },
    art: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Art.find(params).sort({ createdAt: -1 });
    },
    artSingle: async (parent, { artId }) => {
      return Art.findOne({ _id: artId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('art');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addArt: async (parent, { artId }, context) => {
      try {

      
      if (context.user) {
        const art = await Art.create({
          artId,
          artAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { art: art._id } }
        );

        return art;
      }
      throw new AuthenticationError('You need to be logged in!');
    } catch (err){
      console.log(err);
      throw new AuthenticationError(err);
    }
    },
    addComment: async (parent, { artId, commentText }, context) => {
      if (context.user) {
        return Art.findOneAndUpdate(
          { _id: artId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeArt: async (parent, { artId }, context) => {
      if (context.user) {
        const art = await Art.findOneAndDelete({
          _id: artId,
          artAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { art: art._id } }
        );

        return art;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { artId, commentId }, context) => {
      if (context.user) {
        return Art.findOneAndUpdate(
          { _id: artId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
