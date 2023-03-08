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

exports.getComments = async (vId, query) => {
  const temps = {
    page: Number(query?.page) - 1,
    limit: Number(query?.limit),
    fields: query?.fields?.replaceAll(/[, ]/g, ' '),
  };
  const result = await comments
    .find({ ...query?.filter, video: vId })
    .sort(query?.sort)
    .select(temps.fields)
    .populate([
      {
        path: 'main',
        model: 'baseComments',
        populate: {
          path: 'user',
          model: 'users',
          select: '-password -auth',
        },
      },
      {
        path: 'replies',
        model: 'baseComments',
        populate: {
          path: 'user',
          model: 'users',
          select: '-password -auth',
        },
      },
    ]);
  if (!result?.length) throw new Error('No comments found with these queries');
  return {
    totalItems: result?.length,
    totalPages: Math.ceil(result?.length / (temps?.limit || result?.length)),
    data: result,
  };
};

