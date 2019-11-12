const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const post = require("./routers/post");
const tag = require("./routers/tag");
const user = require("./routers/user");
const comment = require("./routers/comment");

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "mongodb://localhost/blog-dev";

const app = express();

app.use((req, res, next) => {
  mongoose
    .connect(dbURI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => next())
    .catch(e => next(e));
});

app.use(helmet());
app.use(express.json());

app.use("/auth", user);
app.use("/api/post", post);
app.use("/api/tag", tag);
app.use("/api/comment", comment);
app.use(() => mongoose.disconnect());

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
