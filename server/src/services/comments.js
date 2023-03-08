const users = require('@models').users;
const videos = require('@models').videos;
const comments = require('@models').comments;
const baseComments = require('@models').baseComments;
const notifications = require('@models').notifications;

exports.postComments = async (vId, uId, data) => {
  const user = await users.findById(uId);
  const video = await videos.findById(vId);
  const comment = await baseComments.create({
    user,
    content: data.content,
  });
  const revised = {
    video,
    main: comment,
    replies: [],
  };
  const result = (await comments.create(revised)).depopulate(['video', 'main']).populate([
    {
      path: 'main',
      model: 'baseComments',
      populate: {
        path: 'user',
        model: 'users',
        select: '-password -auth',
      },
    },
  ]);
  await notifications.create({
    title: `${user.name} commented on your video: ${video.title}`,
    video,
    receiver: video.creator,
  });
  return result;
};

