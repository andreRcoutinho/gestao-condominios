var models = require('../models/index');

module.exports = {
  async findAll(req, res) {
    try {
      const typologies = await models.Typology.findAll({
        attributes: ['id', 'typology']
      });
      console.log(typologies);
      return res.status(200).send(typologies);
    } catch (e) {
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const typology = await models.Typology.findByPk(id, {
        attributes: ['id', 'typology']
      });

      return res.status(200).send(typology);
    } catch (e) {
      console.log(e);
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { typology_name } = req.body;
    try {
      const typology = await models.Typology.update(
        {
          typology: typology_name
        },
        {
          where: {
            id
          }
        }
      );
      return res.status(200).send({ message: 'Updated with sucess' });
    } catch (e) {
      return res.status(400).send({ error: 'Something went wrong', e });
    }

    console.log(typology);
  }
};
