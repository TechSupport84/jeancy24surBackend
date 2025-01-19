const express = require("express")
const cors = require("cors")
const app  =  express()
const dotenv = require("dotenv")
const path =require("path")
dotenv.config();
const PORT  = process.env.PORT||5000
const authRouter = require("./routes/user")
const db   = require("./models")
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment")
const orderRouter = require("./routes/order");
const partenariatRouter = require("./routes/partenariat")
const applicationRouter = require("./routes/application")


app.use(express.json())
app.use(cors())
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/images",express.static(path.join(__dirname, 'public', 'Images')))
app.use("/api/comment",commentRouter)
app.use("/api/order",orderRouter);
app.use("/api/partenariat",partenariatRouter)
app.use("/api/application/",applicationRouter);


db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})




