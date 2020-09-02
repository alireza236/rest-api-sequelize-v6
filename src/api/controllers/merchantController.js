const { Op } = require("sequelize");

const  db  = require("../../models");

const orderBuilder = require("../../lib/query"); 

const { responseRedactor } = require("../../utils/lib");

const { omit } = require("lodash");

const getListMerchant = async (req, res, next) => {

    const { q, id,  sort, offset, limit  } = req.query;
    
    let collection;
    let offsetSize = 0;
    let limitSize = 10;
    let order = [];
    let include = [];
    let where = {}


      //override limit && offset
      if (offset && limit) {
         offsetSize = Number(offset); 
         limitSize = Number(limit);
      }

      if (id) {
         where.id = id
      }

      if (q) {
           where.name = {
             [Op.like]:`%${q}%`
           }
      };

      //sorting orderBy attributes ASC or DESC
      if (sort) {
          order = sort ? orderBuilder(sort) :  order;
      }

       include = [{
          model: db.Product,
          through: {
            attributes:[] 
          }
       }]  

      let options = {
          include,
          order,
          where,
          limit : limitSize,
          offset : offsetSize, 
       };

        //remove object limit & offset, unlimited query
      if (limit && limit == 0) {
          options = omit(options, ['offset', 'limit']);
      }

    try {
        collection = await db.Merchant.findAndCountAll(options);
    } catch (error) {
       return next(error); 
    }

     const response = responseRedactor(collection, {
        limit : limitSize,
        offset: offsetSize,
      });
    
    res.status(200).json(response);
};

const createMerchantProduct = async (req, res, next) => {
  
  const { userId, product_name, slug, description, merchant_name, owner_name, address  } = req.body;
   
  let product;
  let merchant;
  
  try {
     
     merchant = await db.Merchant.build({
      name: merchant_name,
      owner_name,
      address,
    }); 
   
     product = await merchant.createProduct({
       userId : userId,
       name : product_name,
       slug,
       description
    });
 

       console.log('res', JSON.stringify( merchant ,null,2));
       console.log('res', JSON.stringify( product ,null,2));
        
     } catch (error) {
       return next(error);
     };

     await merchant.save();
 
     res.status(201).json({merchant, product});
};

exports.createMerchantProduct = createMerchantProduct;
exports.getListMerchant = getListMerchant;