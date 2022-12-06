
const invoices = require('../models/invoices')
const db = require('../models/db')
const { Op } = require("sequelize");
class InvoicesControllers {

    // [GET] /invoices
    async getAll(req, res){
      try{
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
          const [results, metadata] = await db.query(
            "SELECT * FROM invoices JOIN Invoicesdetail ON invoices.idHD = Invoicesdetail.idHD"
          );
          return res.json(results, null, 2);
      }catch(err) {
        console.log(err)
      }
    }
    // [GET] /invoices
    async get(req, res){
        try{
          const Invoices = await invoices.findAll({where: {
            idHD : req.params.id
          }});
          res.json(Invoices)
        }catch(err) {
          console.log("lỗi")
        }
      }

  
    // [DELETE] /invoices/id
    async delete(req, res){
        try{
          await invoices.destroy({where: {
            idHD : req.params.id
          }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [POST] /invoice
    async add(req, res){
        try{
          await invoices.create({
            idHD : req.body.idHD,
            idUser : req.body.idUser,
            status: req.body.status,
            note: req.body.note,
            name: req.body.name,
            nameReceiver: req.body.nameReceiver,
            addressReceiver: req.body.addressReceiver,
            phoneReceiver: req.body.phoneReceiver,
            totalItems: req.body.totalItems,
            createdAt : null,
            updatedAt : {[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)},
          });
          res.send("succesfully !!!")
        }catch(err) {
          console.log(err)
        }
    }
    // [PUT] /invoices/id
    async update(req, res){
        try{
          await invoices.update({
            idHD : req.body.idHD,
            idUser: req.body.idUser,
            status: req.body.status,
            note: req.body.note,
            name: req.body.name,
            nameReceiver: req.body.nameReceiver,
            addressReceiver: req.body.addressReceiver,
            phoneReceiver: req.body.phoneReceiver,
            totalItems: req.body.totalItems,
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

module.exports = new InvoicesControllers