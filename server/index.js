import app from "./app.js"
import connectionToDb from "./config/db.js"

const PORT = process.env.PORT || "http://localhost:5040"

app.listen(PORT,async()=>{
    await connectionToDb()
    console.log(`this server is listning on http://localhost:${PORT}`)

})