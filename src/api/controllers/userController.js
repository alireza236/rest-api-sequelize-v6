const { Op } = require("sequelize");

const  db  = require("../../models");

const paginate = require("../../utils/paginate");

const userList = async ( req, res, next ) => {
  
        try {
         
        const { q, page, limit, order_by, order_direction } = req.query;

        let search = {};
        let order = [];
        let include = [];
        let meta = {}; 

        //add the search to the search object..
        if (q) {
          search = {
            where: {
              firstname: {
                [Op.like]:`%${q}%`
              }
            }
          }
        };

       /*  include = [{
            model: db.Product,
            required: true
          },{
            model: db.Telephone,
          }] */

        //order parameter to the order..
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }

        // transform function to that can be pass to the paginated method.
        const transform = (records) => {
            return records.map(record => {
              return {
                id: record.id,
                firstname: record.firstname,
                lastname: record.lastname,
                email: record.email,
                date: record.createdAt
              }
            });
        };

        // paginated method that takes  in the model , page, limit, search, object and transform.
        const data = await paginate(db.User, page, limit, search, order, transform, include, meta);
        
        return res.status(200).json(data); 
        
      } catch (error) {
         return next(error);  
      } 
}


const userCreate = async (req, res, next ) => {

    const { firstname, lastname, email, password, phone_number } = req.body;

    let user;
     try {
         
          user = await db.User.build({
             firstname,
             lastname,
             email,
             password,
            });
                      
        } catch (error) {
            return next(error);
        };

        try {
           await user.createTelephone({ phone_number }); 
           await user.save(); 
        } catch (error) {
          return next(error);
        }
   
        console.log("USER", JSON.stringify(user, null, 2));
     
    res.status(201).json(user);

}

const getUserById = async (req, res, next) => {
   
     const { id } = req.params;

     let user;

     try {
        user = await db.User.findAll({
          where: {
            id: id 
          },
          include: [{
            model: db.Telephone,
            as: "telephone",
            attributes: {
              exclude: ['createdAt','updatedAt']
            }
          },{
            model: db.Product,
            as: 'products'
          }
          ]
        })
     } catch (error) {
       return next(error); 
     };
     
     res.status(200).json(user);     
};

exports.getUserById = getUserById;
exports.userList = userList;
exports.userCreate = userCreate;