module.exports = withs => {
  return async (req, res, nex) => {
    const valid = req?.params?.id === req?.user?._id || withs?.includes(req?.user?.role);
    if (!valid) {
      res.status(403).send({
        status: 'Failed',
        message: 'Something went wrong!',
        error: "You don't have authorization to access this api!",
      });
    } else {
      nex();
    }
  };
};
