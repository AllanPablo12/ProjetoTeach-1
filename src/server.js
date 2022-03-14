const Database = require("./database/db")
const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')

const { subjects, weekdays, getSubject,convertHoursToMinutes } = require("./utils/format")


const nunjucks = require("nunjucks")
const { devNull } = require("os")
nunjucks.configure("src/views", {
    express: app,
    noCache: true,
})

app
.use(express.urlencoded({extended:true}))
.use(express.static("public"))


.get("/",(req,res) =>{
    return res.render("index.html")
})

.get("/who-we-are",(req,res)=>{
    return res.render("who-we-are.html")
})

.get("/work-for-us",(req,res)=>{
    return res.render("work-for-us.html")
})

.get("/search-page",async (req,res)=>{
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("search-page.html", {filters, subjects, weekdays })
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT * from proffys JOIN classes 
        ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT * FROM classes_schedule c
            WHERE c.class_id = classes.id
            AND c.weekday = ${filters.weekday}
            AND c.time_from <= ${timeToMinutes}
            AND c.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `
    
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        console.log(proffys)
        
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })

        console.log(filters)
        console.log(proffys)

        return res.render("search-page.html",{proffys,subjects,filters,weekdays})

    } catch (error) {
        console.log(error)
    }
    //return res.render("search-page.html")
    
})

.get("/profile-page",async (req,res)=>{
    const filters = req.query
    
    
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("profile-page.html", {filters, subjects, weekdays })
    }
    
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
    
    
    const query = `
        SELECT * from proffys JOIN classes 
        ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT * FROM classes_schedule c
            WHERE c.class_id = classes.id
            AND c.weekday = ${filters.weekday}
            AND c.time_from <= ${timeToMinutes}
            AND c.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render("profile-page.html",{proffys,subjects,filters,weekdays})
    } catch (error) {
        console.log(error)
    }
})

.get("/landing-page",(req,res)=>{
    return res.render("landing-page.html")
})

.get("/give-classes",(req,res)=>{
    return res.render("give-classes.html", {subjects, weekdays})
})

.get("/update-page", async(req,res) =>{
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("update-page.html", {filters, subjects, weekdays })
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT * from proffys JOIN classes
        ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT * FROM classes_schedule c
            WHERE c.class_id = classes.id
            AND c.weekday = ${filters.weekday}
            AND c.time_from <= ${timeToMinutes}
            AND c.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `
    
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        
        
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })

        

        return res.render("update-page.html",{proffys,subjects,filters,weekdays})

    } catch (error) {
        console.log(error)
    }
})

.get("/delete-page", async(req,res)  =>{
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("delete-page.html", {filters, subjects, weekdays })
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT * from proffys JOIN classes
        ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT * FROM classes_schedule c
            WHERE c.class_id = classes.id
            AND c.weekday = ${filters.weekday}
            AND c.time_from <= ${timeToMinutes}
            AND c.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `
    
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        
        
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })

        

        return res.render("delete-page.html",{proffys,subjects,filters,weekdays})

    } catch (error) {
        console.log(error)
    }
})

.post("/delete-classes", async (req,res) =>{
    const deleteProffy = require('./database/deleteProffy')
    const proffyId= req.body.id
    try {
        const db = await Database
        await deleteProffy(db,{proffyId})
        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }
    
})

.post("/save-classes", async (req,res) =>{
    const createProffy = require('./database/createProffy')
    
    const proffyValue={
        name: req.body.name,
        avatar : req.body.avatar,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        senha: req.body.senha,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
        (weekday, index)=>{

            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }

    })
    try {
        const db = await Database
        await createProffy(db,{proffyValue, classValue, classScheduleValues})
        
        let queryString = "?subject="+ req.body.subject
        queryString += "&weekday" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }

})

.post("/update-classes", async (req,res)=>{
    const updateProffy = require('./database/updateProffy.js')
    const proffyId = req.body.id
    const proffyValue={
        name: req.body.name,
        avatar : req.body.avatar,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    

    try {
        const db = await Database
        await updateProffy(db,{proffyValue, classValue, proffyId})

        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }

}
 )

 .post("/profile-page2", async (req,res) =>{ 

    const proffyLogin ={
        email: req.body.login,
        senha: req.body.password
       }

       const query2 = `
       SELECT * FROM proffys 
          WHERE 
          email = "${proffyLogin.email}" and
          senha = ${proffyLogin.senha};
       `
    console.log(req.body.login)
    console.log(req.body.password)

    const filters = req.query
    
    
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("profile-page2.html", {filters, subjects, weekdays })
    }
    
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
    
    
    const query = `
        SELECT * from proffys JOIN classes 
        ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT * FROM classes_schedule c
            WHERE c.class_id = classes.id
            AND c.weekday = ${filters.weekday}
            AND c.time_from <= ${timeToMinutes}
            AND c.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        
        const login = await db.all(query2)
         
         function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        if(isEmpty(login)){
            console.log("vazio")
		    return res.redirect('/')
        }else{
            console.log("cheio")
        }

        
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render("profile-page2.html",{proffys,subjects,filters,weekdays})
    } catch (error) {
        console.log(error)
    }  
     
 })

.listen(5570)

/**
   
   
 */