const { Op } = require("sequelize");

const  db  = require("../../models");

const orderBuilder = require("../../lib/query"); 

const { responseRedactor } = require("../../utils/lib");

const _ = require("lodash");

const getCustomer = async (req, res, next) =>{

    const { q, id,  sort, offset, limit, embeds } = req.query;

    let collection;
    let offsetSize = 0;
    let limitSize = 10;
    let order = [];
    let include = [];
    let where = {};
    
      //override limit && offset
      if (offset && limit) {
         offsetSize = Number(offset); 
         limitSize = Number(limit);
      }

      if (id) {
         where.id = id
      }

      if (q) {
           where.email = {
             [Op.like]:`%${q}%`
           }
      };

      //sorting orderBy attributes ASC or DESC
      if (sort) {
          order = sort ? orderBuilder(sort) :  order;
      }

            
      if (embeds) {
        
        let includes = !_.isArray(_.split(embeds, ',')) ? [].push(embeds) : _.split(embeds, ',');
        
        _.forEach(_.split(includes, ','), include => {
          if (embed(include)) {
             let merge = embed(include)
             subInclude(merge);
          }
        });
      };

      function subInclude(embed){
         include.push(embed)
      };

      function embed(embeds){
        switch (embeds) {
          case 'tickets':
            return {
              model: db.Ticket,
              through: {
                attributes:[] 
              },
              required: false
            };
          default:
            return null;
        };
     };
       

      let options = {
          include,
          order,
          where,
          limit : limitSize,
          offset : offsetSize, 
       };

        //remove object limit & offset, unlimited query
      if (limit && limit == 0) {
          options = _.omit(options, ['offset', 'limit']);
      };

    try {
        collection = await db.Customer.findAndCountAll(options);
    } catch (error) {
       return next(error); 
    }

     const response = responseRedactor(collection, {
        limit : limitSize,
        offset: offsetSize,
      });
    
    res.status(200).json(response);

};

const createCustomer = async (req, res, next) =>{
   
    const { firstname, lastname, email, telephone, address } = req.body;

    let customer;
    try {
        customer = await db.Customer.create({
            firstname, lastname, email, telephone, address
        });

    } catch (error) {
       return next(error); 
    }
 
    console.log('customer', JSON.stringify(customer,null,2));
     
    

    res.status(201).json({ message: "success"});
     
}

exports.getCustomer = getCustomer;
exports.createCustomer = createCustomer;