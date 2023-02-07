import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати статті",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не вдалося отримати статтю",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Стаття не знайдена",
          });
        }
        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати статті",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не вдалося видалити статтю",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Стаття не знайдена",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати статті",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.title,
      tags: req.body.title,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося створити статтю1",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.title,
        imageUrl: req.body.title,
        tags: req.body.title,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося обновити статтю",
    });
  }
};