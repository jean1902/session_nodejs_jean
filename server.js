const express = require('express');
 const app =express();

 const mysql =require("mysql")
var session =require("express-session");
var MySqlStore=require("express-mysql-session")(session)

const userData ={
    fullname:"Ricardo",
    username:"ricky",
    password:12345

}

// app.use(express.json({}))
// app.use(express.urlencoded(
//    { extended:true}
// ))

var options =mysql.createConnection({
    host:'localhost' ,
    user :'root',
    password:'12345',
    database:"bd_user"
})

var sessionConnection =mysql.createConnection(options)

var sessionStore = new  MySqlStore({
    expiration:1080000,
    createDatabaseTable:true,
    schema:{
        tableName:'user',
        columnNames:{
            session_id:'session_id',
            expires:'expires',
            data:'data'
        }
    }
},sessionStore );

app.use(session({
    key:'keyin',
    secret:'my secret',
    store:sessionStore,
    resave:false,
    saveUninitialized:true
}))

app.use('/login', (req,res)=>{
    const {username ,password} = req.body
    if(username !=userData.fullname || password !=userData.password){
        return res.status(401).json({
            errror:true,
            message:"Username or Password is invalid"
        })
    }else{
        req.session.userinfo = userData.fullname
        res.send("landing success!")
    }
})
app.use('/' ,(req,res)=>{
    if(req.session.userinfo){
        res.send("hello" + req.session.userinfo + "welcome")
    }else{
        res.send(" not logged in")
    }
})












 Port =1000;

 app.set("views" , "./views");
 app.set("views engine" ,"ejs")
 app.use("/Public" , express.static('Public'))


 app.listen(Port,()=>{
     console.log(`ecoute sur le port ${Port}`)
 })
