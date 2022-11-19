
const rates = require('../models/rates')
const { Op } = require("sequelize");
class RatesControllers {

    // [GET] /rates ?search?page?limit
    async getAll(req, res){
      try{
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(page && limit ) {
            const {count , rows} = await rates.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
          return  res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await rates.findAndCountAll({ limit: parseInt(0)});
           return res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await rates.findAndCountAll();
          return res.json({total:count,data:rows})
        }
      }catch(err) {
        console.log("lỗi")
      }
    }
    // [GET] /rates
    async get(req, res){
        try{
          const Rates = await rates.findAll({where: {
            id : req.params.id
          }});
          res.json(Rates)
        }catch(err) {
          console.log("lỗi")
        }
      }
  
    // [DELETE] /rates/id
    async delete(req, res){
        try{
          await rates.destroy({where: {
            id : req.params.id
          }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [POST] /rates
    async add(req, res){
        try{
          await rates.create({
            idUser: req.body.idUser,
            comment: req.body.comment,
            star: req.body.star,
            createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)},
          });
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
          console.log(err)
        }
      }
    // [PUT] /rates/id
    async update(req, res){
        try{
          await rates.update({
            id : req.body.id,
            idUser: req.body.idUser,
            comment: req.body.comment,
            star: req.body.star,
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

module.exports = new RatesControllers