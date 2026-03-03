import http from "http"
import { MongoClient } from "mongodb"

const port = 3000

// Connection URL
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/test"
const client = new MongoClient(mongoUrl)

const server = http.createServer(async (request, response) => {
  try {
    // Verificar la conexión a MongoDB
    await client.db("admin").command({ ping: 1 })
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
    response.end("Me conecté a mongo!")
  } catch (err) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
    response.end("BOOM: " + err.message)
  }
})

// Conectar a MongoDB cuando el servidor inicia
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB at:", mongoUrl)
    await client.connect()
    console.log("Successfully connected to MongoDB!")

    server.listen(port, () => {
      console.log("Server listening at port:", port)
    })
  } catch (err) {
    console.error("Error:", err.message)
    process.exit(1)
  }
}

console.log("Starting application...")
startServer()
