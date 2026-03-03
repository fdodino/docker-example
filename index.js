import http from "http"
import { MongoClient } from "mongodb"

const port = 3000
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/test"
const client = new MongoClient(mongoUrl)

const server = http.createServer(async (request, response) => {
  try {
    await client.db("admin").command({ ping: 1 })
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
    response.end("Me conecté a mongo!")
  } catch (err) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
    response.end("Error: " + err.message)
  }
})

client.connect().catch((err) => console.error("Connection error:", err.message))

server.listen(port, () => {
  console.log("Server listening at port:", port)
})
