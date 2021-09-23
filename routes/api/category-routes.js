const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catgor = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "id not found"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "Id not found"});
      return;
    }
    res.json(500).json(err);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id:req.params.id,
    },
  })
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "id not found"});
      return;
    }
    res.json(dbCategoryData);
  });
});

module.exports = router;
