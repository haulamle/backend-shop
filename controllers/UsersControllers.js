
const users = require('../models/users')
const bcrypt = require('bcrypt')
const { Op } = require("sequelize")
class UsersControllers {

    // [GET] /users ?search?page?limit
    async getAll(req, res){
      try{
        const search = req.query.q
        let page = 1 
        const limit = req.query.limit
        page = (req.query.page - 1) * limit
        if(search && limit ) {
            const {count , rows} = await users.findAndCountAll({ limit: parseInt(limit),
                where: {
                  account: { [Op.startsWith]: `${search}` }
                }
            });
          return  res.json({total:count,data:rows})
        } 
        if(page && limit ) {
            const {count , rows} = await users.findAndCountAll({ offset: parseInt(page), limit: parseInt(limit)});
            return res.json({total:count,data:rows})
        } 
        if(search ) {
          const {count , rows} = await users.findAndCountAll({ 
                where: {
                  account: { [Op.startsWith]: `${search}` }
                }
            });
            return res.json({total:count,data:rows})
        } 
        if(limit) {
            const {count , rows} = await users.findAndCountAll({ limit: parseInt(0)});
            return res.json({total:count,data:rows})
        }
        else {
            const {count , rows} = await users.findAndCountAll();
            return res.json({total:count,data:rows})
        }
      }catch(err) {
        console.log("lỗi")
      }
    }
    // [GET] /users
    async get(req, res){
        try{
          const Users = await users.findAll({where: {
            idUser : req.params.id
          }});
          res.json(Users)
        }catch(err) {
          console.log("lỗi")
        }
      }
    
    // [DELETE] /products/id
    async delete(req, res){
        try{
          await users.destroy({where: {
            idUser : req.params.id
          }});
          res.send("succesfully !!!")
        }catch(err) {
          console.log("lỗi")
        }
      }
    // [PUT] /users/id
    async update(req, res){
      const satl = await bcrypt.genSalt();
      const newPassword = req.body.password.toString()
      const hashPassword = await bcrypt.hash(newPassword, satl);
      try {
        await users.update(
          {
            account: req.body.account,
            password: hashPassword,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            status: req.body.status,
            role: 1,
            // createdAt: null,
            updatedAt: { [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) },
          },
          {
            where: {
              idUser : req.params.id
            }
          }
        );
        res.send("succesfully !!!");
      } catch (err) {
        console.log("lỗi");
      }
      }
     // [POST] /register
     async register(req, res){
      const { account, password, email, confirmPassword,address,phone } = req.body;
      if( account === undefined ||
        password === undefined ||
        confirmPassword === undefined ||
        email === undefined ||
        address === undefined ||
        phone === undefined){
        return res.json({ msg: "Vui Lòng Không Được Để Trống !" });
      } 
      const checkAccount = await users.findOne({
        where: {
          account: account,
        },
      });
      if (checkAccount)
        return res.status(400).json({ msg: "tài khoản đã tồn tại !" });
      if (password != confirmPassword)
        return res
          .status(400)
          .json({ msg: "xác nhận tài khoản không trùng khớp !" });
      const satl = await bcrypt.genSalt();
      const newPassword = password.toString()
      const hashPassword = await bcrypt.hash(newPassword, satl);
      try {
        await users.create({
          account: account,
          email: email,
          password: hashPassword,
          role: 1,
          address: address,
          phone: phone,
          status:"Hoạt Động",
          createdAt: null,
          updatedAt: { [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) },
        });
        res.send({ msg: "succesfully !!!" });
      } catch (err) {
        console.log(err);
      }
    }
    //[POST] /login
    async login(req, res){
      try{
        const userCurrent = await users.findAll({
          where : {
            account : req.body.account
        }})
        const match = await bcrypt.compare(req.body.password.toString(), userCurrent[0].password)
        if(!match) return res.status(400).json({msg:"Sai Mật Khẩu"})
        const userID = userCurrent[0].idUser 
        const account = userCurrent[0].account
        const email = userCurrent[0].email
        const phone = userCurrent[0].phone
        const address = userCurrent[0].address
        const status = userCurrent[0].status
        const role = userCurrent[0].role
        res.json({userID, account,email,role,phone,address,status })
      }catch(err) {
        res.status(404).json({msg:"account không tồn tại"})
      }
    }
}

module.exports = new UsersControllers