const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const alltags = await Tag.findAll({ 
      incldue: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(alltags);
  } catch (err) {
    res.status(500).json(err);
  }

  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const alltags = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product, through: ProductTag }],
    });
    if (!alltags) {
      res.status(404).json({ message: 'No tag found'});
      return;
    };
    res.status(200).json(alltags);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const alltags = await Tag.create(req.body);
    res.status(200).json(alltags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const alltags = await Tag.update(req.body,
      {
        where: { 
          id: req.params.id
        },
      });

      if (!alltags) {
        res.status(404).json({ message:"No tag found" });
        return;
      }
      res.status(200).json(alltags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const alltags = await Tag.destroy({ 
      where: { 
        id: req.params.id,
      },
    });

    if (!alltags) {
      res.status(404).json({ message: "No tag found"});
      return;
    }

    res.status(200).json(alltags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
