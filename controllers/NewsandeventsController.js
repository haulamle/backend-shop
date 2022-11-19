
const newsandevents = require('../models/newsandevents')
const { Op } = require("sequelize");
class NewsandeventsController {

    // [GET] /newsandevents ?search?page?limit
    async getAll(req, res){
      try{
        const search = req.query.q
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(search && limit ) {
            const {count , rows} = await newsandevents.findAndCountAll({ limit: parseInt(limit),
                where: {
                  name: { [Op.startsWith]: `${search}` }
                }
            });
          return  res.json({total:count,data:rows})
        } 
        if(page && limit ) {
            const {count , rows} = await newsandevents.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
          return  res.json({total:count,data:rows})
        } 
        if(search ) {
          const {count , rows} = await newsandevents.findAndCountAll({ 
                where: {
                  name: { [Op.startsWith]: `${search}` }
                }
            });
          return  res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await newsandevents.findAndCountAll({ limit: parseInt(0)});
           return res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await newsandevents.findAndCountAll();
          return res.json({total:count,data:rows})
        }
      }catch(err) {
        console.log("lỗi")
      }
    }
    // [GET] /newsandevents
    async get(req, res){
        try{
          const Newsandevents = await newsandevents.findAll({where: {
            id : req.params.id
          }});
          res.json(Newsandevents)
        }catch(err) {
          console.log("lỗi")
        }
      }
  
    // [DELETE] /newsandevents/id
    async delete(req, res){
        try{
          await newsandevents.destroy({where: {
            id : req.params.id
          }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [POST] /invoice
    async add(req, res){
        try{
          await newsandevents.create({
            description : req.body.description,
            name: req.body.name,
            image: req.body.image,
            url: req.body.url,
            createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)},
          });
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [PUT] /invoices/id
    async update(req, res){
        try{
          await newsandevents.update({
            description : req.body.description,
            name: req.body.name,
            image: req.body.image,
            url: req.body.url,
            // createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)}
          },{
            where : {
              id : req.params.id
        }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
}

module.exports = new NewsandeventsController