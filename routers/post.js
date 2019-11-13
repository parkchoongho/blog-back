const express = require("express");
const auth = require("../common/auth")();
const { Post, validatePost } = require("../models/post");
const { Tag } = require("../models/tag");

const router = express.Router();

router.post("/", auth.authenticate(), async (req, res, next) => {
  const { title, contents, tags } = req.body;
  if (validatePost(req.body).error) {
    res.status(400).json({ result: false, error: "양식에 맞지않음" });
    next();
    return;
  }
  const post = new Post({
    title,
    author: req.user.id,
    contents,
    tags
    // nodejs backend express (id)
  });
  await post.save();
  for (const tag_id of tags) {
    const tag = await Tag.findById(tag_id);
    tag.posts.push(post._id);
    await tag.save();
  }
  res.json({ result: true });
  next();
});

module.exports = router;
