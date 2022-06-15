function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatar",
    ["image/jpg", "image/png", "image/jpeg"],
    10000000,
    "only .jpg, .jpeg, .png files are allowed"
  );

  //call the middleWare function

  upload.any()(res, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
