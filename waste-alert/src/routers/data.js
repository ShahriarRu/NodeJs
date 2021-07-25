const express = require("express");
const Data = require("../models/data");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");

router.post("/datas", auth, async (req, res) => {
  const data = new Data({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await data.save();
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/datas", auth, async (req, res) => {
  try {
    await req.user.populate("datas").execPopulate();
    res.send(req.user.datas);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/datas/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const data = await Data.findOne({ _id, owner: req.user._id });

    if (!data) {
      return res.status(404).send();
    }

    res.send(data);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/datas/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["location"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const data = await Data.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!data) {
      return res.status(404).send();
    }

    updates.forEach((update) => (data[update] = req.body[update]));
    await data.save();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/datas/:id", auth, async (req, res) => {
  try {
    const data = await Data.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!data) {
      res.status(404).send();
    }

    res.send(data);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/datas/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // const buffer = await sharp(req.file.buffer).png().toBuffer();
    // req.user.avatar = buffer;
    const data = await Data.findOne({ owner: req.user._id });
    // console.log(req)
    data.avatar = req.file.buffer;
    await data.save();
    res.send(data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/datas/:id/avatar", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data || !data.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(data.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = router;
