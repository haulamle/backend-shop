
const products = require('../models/products')
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
class ProductsControllers {

    // [GET] /products ?search?page?limit
    async getAll(req, res){
      try{
        const search = req.query.q
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(search && limit ) {
            const {count , rows} = await products.findAndCountAll({ limit: parseInt(limit),
                where: {
                    name: { [Op.startsWith]: `${search}` }
                }
            });
           return res.json({total:count,data:rows})
        } 
        if(page && limit ) {
            const {count , rows} = await products.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
            return  res.json({total:count,data:rows})
        } 
        if(search ) {
          const {count , rows} = await products.findAndCountAll({ 
                where: {
                    name: { [Op.startsWith]: `${search}` }
                }
            });
            return res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await products.findAndCountAll({ limit: parseInt(limit)});
            return  res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await products.findAndCountAll();
            return res.json({total:count,data:rows})
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    
    // [GET] /products
    async get(req, res){
        try{
          const Products = await products.findOne({where: {
            id: req.params.id
          }});
          res.json(Products)
        } catch (err) {
          console.log(err.message);
        }
      }
    // [GETALL] /products/idDM
    async getDm(req, res){
      try{
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
       
        if(page && limit ) {
            const {count , rows} = await products.findAndCountAll({
              where : {
                idDM: req.params.id
              },
              offset: parseInt(page), limit: parseInt(limit)
            });
            res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await products.findAndCountAll({
              where : {
                idDM: req.params.id
              },
              limit: parseInt(limit)
            });
            res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await products.findAndCountAll({where: {
               idDM: req.params.id
            }});
            res.json({total:count,data:rows})
        }

      } catch (err) {
        console.log(err.message);
      }
    }
    // [DELETE] /products/id
    async delete(req, res){
      const product = await products.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: "No Data Found" });
  
      try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await products.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({ msg: "category Deleted Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
      }
    // [POST] /products
    async add(req, res){
      if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.name;
    const price = req.body.price;
    const idDM = req.body.idDM;
    const priceDiscount = req.body.priceDiscount;
    const size = req.body.size;
    const amount = req.body.amount;
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
        await products.create({
          name: name,
          image: fileName,
          url: url,
          price: price,
          idDM:idDM,
          priceDiscount:priceDiscount,
          size:size,
          amount:amount
        });
        res.status(201).json({ msg: "product Created Successfuly" });
      } catch (err) {
        console.log(err.message);
      }
    });
      }
    // [PUT] /products/id
    async update(req, res){
      const product = await products.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) return res.status(404).json({ msg: "No Data Found" });
      let fileName = "";
      if (req.files === null) {
        fileName = product.image;
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
  
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
  
        file.mv(`./public/images/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
      const name = req.body.name;
      const price = req.body.price;
      const idDM = req.body.idDM;
      const priceDiscount = req.body.priceDiscount;
      const size = req.body.size;
      const amount = req.body.amount;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
      try {
        await products.update(
          { name: name, image: fileName, url: url,price:price,idDM:idDM,priceDiscount:priceDiscount,size:size,amount:amount },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({ msg: "product Updated Successfuly" });
      } catch (error) {
        console.log(error.message);
      }
      }
}

module.exports = new ProductsControllers