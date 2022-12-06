
const invoicesDetail = require('../models/invoicesDetail')
const { Op } = require("sequelize");
class InvoicesDetailControllers {

    // [GET] /invoices ?search?page?limit
    async getAll(req, res){
      try{
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(page && limit ) {
            const {count , rows} = await invoicesDetail.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
          return  res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await invoicesDetail.findAndCountAll({ limit: parseInt(0)});
           return res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await invoicesDetail.findAndCountAll();
          return res.json({total:count,data:rows})
        }
      }catch(err) {
        console.log(err)
      }
    }
    // [GET] /invoicesDetail
    async get(req, res){
        try{
          const InvoicesDetail = await invoicesDetail.findAll({where: {
            idHD : req.params.id
          }});
          res.json(InvoicesDetail)
        }catch(err) {
          console.log("lỗi")
        }
      }
  
    // [DELETE] /invoicesDetail/id
    async delete(req, res){
        try{
          await invoicesDetail.destroy({where: {
            idHD : req.params.id
          }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [POST] /invoicesDetail
    async add(req, res){
        try{
          await invoicesDetail.create({
            idHD : req.body.idHD,
            idSP: req.body.idSP,
            url: req.body.url,
            amount: req.body.amount,
            price: req.body.price,
            createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)},
          });
          res.send("succesfully !!!")
        }catch(err) {
          console.log(err)
        }
      }
    // [PUT] /invoicesDetail/id
    async update(req, res){
        try{
          await invoicesDetail.update({
            idHD : req.body.idHD,
            idSP: req.body.idSP,
            url: req.body.url,
            amount: req.body.amount,
            price: req.body.price,
            // createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)}
          },{
            where : {
              idHD : req.params.id
        }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
}

module.exports = new InvoicesDetailControllers