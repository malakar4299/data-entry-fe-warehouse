const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url = process.env.CONNECTION_STRING;

const client = new MongoClient(url);

module.exports = async function (context, req) {
 
  await client.connect();
  const database = client.db("Warehouse")
  const collection = database.collection("Product")

  context.log(req.params.shipmentid)

  let data = await collection.find({}).toArray()
  
  let shipperids = []
  
  data.map(innerData => {
      context.log(innerData)
      shipperids.push(innerData.ShipperID)
  })
  
  if (!data){
      return context.res = {
          status:400,
          body: "Couldnt find that product"
      }
  }
 
   return (context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    });
};