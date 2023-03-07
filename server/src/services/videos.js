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


exports.getVideos = async query => {
  const temps = {
    page: Number(query?.page) - 1,
    limit: Number(query?.limit),
    fields: query?.fields?.replaceAll(/[, ]/g, ' '),
  };
  const result = await videos
    .find(query?.filter)
    .sort(query?.sort)
    .select(temps.fields)
    .populate('creator', '-password -auth -__v');
  if (!result?.length) throw new Error('No videos found with these queries');
  return {
    totalItems: result?.length,
    totalPages: Math.ceil(result?.length / (temps?.limit || result?.length)),
    data: result,
  };
};

exports.getVideo = async (vId, query) => {
  const fields = query?.fields?.replaceAll(/[, ]/g, ' ');
  const result = await videos.findById(vId).select(fields).populate('creator', '-password -auth -__v');
  if (!result) throw new Error('No video is found with this id');
  await videos.updateOne({ _id: result._id }, { $inc: { views: 1 } });
  return result;
};

