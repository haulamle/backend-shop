
const invoices = require('../models/invoices')
const { Op } = require("sequelize");
class InvoicesControllers {

    // [GET] /invoices ?search?page?limit
    async getAll(req, res){
      try{
        const search = req.query.q
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(search && limit ) {
            const {count , rows} = await invoices.findAndCountAll({ limit: parseInt(limit),
                where: {
                  nameReceiver: { [Op.startsWith]: `${search}` }
                }
            });
          return  res.json({total:count,data:rows})
        } 
        if(page && limit ) {
            const {count , rows} = await invoices.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
          return  res.json({total:count,data:rows})
        } 
        if(search ) {
          const {count , rows} = await invoices.findAndCountAll({ 
                where: {
                  nameReceiver: { [Op.startsWith]: `${search}` }
                }
            });
          return  res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await invoices.findAndCountAll({ limit: parseInt(0)});
           return res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await invoices.findAndCountAll();
          return res.json({total:count,data:rows})
        }
      }catch(err) {
        console.log("lỗi")
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
            idUser : req.body.idUser,
            status: req.body.status,
            url: req.body.url,
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
          console.log("lỗi")
        }
      }
    // [PUT] /invoices/id
    async update(req, res){
        try{
          await invoices.update({
            idUser: req.body.idUser,
            status: req.body.status,
            url: req.body.url,
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