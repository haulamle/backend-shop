const categorys = require("../models/categorys");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

class CategorysControllers {
  // [GET] /Categorys ?search?page?limit
  async getAll(req, res) {
    try {
      const search = req.query.q;
      let page = 1;
      const limit = req.query.limit;
      page = (req.query.page - 1) * limit;
      if (search && limit) {
        const { count, rows } = await categorys.findAndCountAll({
          limit: parseInt(limit),
          where: {
            name: { [Op.startsWith]: `${search}` },
          },
        });
        return res.json({ total: count, data: rows });
      }
      if (page && limit) {
        const { count, rows } = await categorys.findAndCountAll({
          offset: parseInt(page),
          limit: parseInt(limit),
        });
        return res.json({ total: count, data: rows });
      }
      if (search) {
        const { count, rows } = await categorys.findAndCountAll({
          where: {
            name: { [Op.startsWith]: `${search}` },
          },
        });
        return res.json({ total: count, data: rows });
      }
      if (limit) {
        const { count, rows } = await categorys.findAndCountAll({
          limit: parseInt(0),
        });
        return res.json({ total: count, data: rows });
      } else {
        const { count, rows } = await categorys.findAndCountAll();
        return res.json({ total: count, data: rows });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  // [GET] /Categoryss
  async get(req, res) {
    try {
      const Categorys = await categorys.findOne({
        where: {
          idDM: req.params.id,
        },
      });
      res.json(Categorys);
    } catch (err) {
      console.log(err.message);
    }
  }
  // [DELETE] /Categorys/id
  async delete(req, res) {
    const category = await categorys.findOne({
      where: {
        idDM: req.params.id,
      },
    });
    if (!category) return res.status(404).json({ msg: "No Data Found" });

    try {
      const filepath = `./public/images/${category.image}`;
      fs.unlinkSync(filepath);
      await categorys.destroy({
        where: {
          idDM: req.params.id,
        },
      });
      res.status(200).json({ msg: "category Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  }
  // [POST] /Categorys
  async add(req, res) {
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.name;
    const status = req.body.status;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await categorys.create({
          name: name,
          image: fileName,
          url: url,
          status: status,
        });
        res.status(201).json({ msg: "categorys Created Successfuly" });
      } catch (err) {
        console.log(err.message);
      }
    });
  }
  // [PUT] /Categoryss/id
  async update(req, res) {
    const category = await categorys.findOne({
      where: {
        idDM: req.params.id,
      },
    });
    if (!category) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files === null) {
      fileName = category.image;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

      const filepath = `./public/images/${category.image}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const name = req.body.name;
    const status = req.body.status;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
      await categorys.update(
        { name: name, status: status, image: fileName, url: url },
        {
          where: {
            idDM: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "category Updated Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new CategorysControllers();
