import { MongoClient, ServerApiVersion } from 'mongodb';
import * as env from "./environment.json" assert {type : "json"};
const url = env.default.mongo
export const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

export const db =  client.db("kanban")
export async function runDb() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("kanban").command({ ping: 1 });
      //let cole = await client.db("kanban").collection("user").findOne({email : "admin@admin.com"})
      //console.log(cole)
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
