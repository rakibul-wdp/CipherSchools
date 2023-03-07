const users = require('@models').users;
const videos = require('@models').videos;
const notifications = require('@models').notifications;

exports.postVideos = async (vId, data) => {
  if (data.hasOwnProperty('creator')) {
    throw new Error('Please remove creator property, it will add automatically!');
  }
  if (data.hasOwnProperty('likes')) {
    throw new Error('Please remove likes property, it will add automatically!');
  }
  if (data.hasOwnProperty('dislikes')) {
    throw new Error('Please remove dislikes property, it will add automatically!');
  }
  if (data.hasOwnProperty('views')) {
    throw new Error('Please remove views property, it will add automatically!');
  }
  const creator = await users.findById(vId).select('-password -auth -__v');
  const revised = { ...data, creator };
  return (await videos.create(revised)).depopulate('creator');
};

