const { Op } = require("sequelize");

const  db  = require("../../models");

const paginate = require("../../utils/paginate");

const productList = async ( req, res, next ) => {

      try {
         
        const { q, page, limit, order_by, order_direction } = req.query;

        let search = {};
        let order = [];
        let meta = {}; 
        let include = [];



        include = [{
          model: db.Merchant,
          through: {
            attributes: [/* list the wanted attributes here */]
          } 
        }]; 

        //add the search to the search object..
        if (q) {
          search = {
            where: {
              name: {
                [Op.like]:`%${q}%`
              }
            }
          }
        };
 
        
        
        //order parameter to the order..
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }

        // transform function to that can be pass to the paginated method.
        const transform = (records) => {
            return records.map(record => {
              return {
                id: record.id,
                name: record.name,
                slug: record.slug,
                description: record.description,
                date: record.createdAt,
                Merchants: record.Merchants
              }
            });
        };

        // paginated method that takes  in the model , page, limit, search, object and transform.
        const products = await paginate(db.Product, page, limit, search, order, transform, include, meta);
        
        return res.status(200).json(products); 
        
      } catch (error) {
         return next(error);  
      }
};


const productCreate =  async (req, res, next) =>{
  
   const { userId, name, slug, description } = req.body;

   let product;

   try {
      product = await db.Product.build({
        userId, 
        name,
        slug,
        description
      })
   } catch (error) {
     return next(error);
   }
   
   await product.save();
  
   res.status(201).json(product)

}

exports.productCreate = productCreate;
exports.productList = productList;