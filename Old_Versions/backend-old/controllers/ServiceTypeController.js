var models = require('../models/index');

module.exports = {
  async new(req, res) {
    try {
      const { service_type } = req.body;

      console.log(models.ServiceType);

      const service = await models.ServiceType.create({ service_type });

      return res.status(200).send({ message: 'Success', service });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const service_type = await models.ServiceType.findByPk(id);
      return res.status(200).send({ service_type });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async findAll(req, res) {
    try {
      const service_types = await models.ServiceType.findAll({
        attributes: ['id', 'service_type']
      });
      return res.status(200).send({ service_types });
    } catch (e) {
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { service_type } = req.body;
    try {
      const service = await models.ServiceType.update(
        {
          service_type
        },
        {
          where: {
            id
          }
        }
      );

      return res.status(200).send({ message: 'Updated with success' });
    } catch (e) {
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await models.ServiceType.destroy({
        where: {
          id
        }
      });
      return res.status(200).send({ message: 'Delete with success' });
    } catch (e) {
      return res.status(400).send({ error: 'Something went wrong', e });
    }
  }
};
