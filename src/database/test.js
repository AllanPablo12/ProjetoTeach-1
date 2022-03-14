const Database = require("./db")
const createProffy = require("./createProffy")

Database.then(async (db) => {
    //Inserir dados

    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "989985353",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue ={
        subject: "10",
        cost: "20,00",
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720 ,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520 ,
            time_to: 1220
        },

    ]
        
    //await createProffy(db,{proffyValue,classValue,classScheduleValues})


    //Consultar os dados inseridos

    //todos os proffys
    
    const selectedProffys = await db.all("SELECT * FROM proffys ")
    console.log(selectedProffys)

    //Consultar as classes e trazer os dados do proffy
    const selectClassesAndProffys = await db.all(`
        SELECT * from proffys JOIN classes 
        ON classes.proffy_id = proffys.id
        WHERE classes.proffy_id = 3;
    `)
    //console.log(selectClassesAndProffys)
    const classes = await db.all(`
        SELECT * from classes
    `)
    //console.log(classes)

    
    
    /*const update = await db.all(` UPDATE proffys
    SET 
    name = "Sasuke",
    avatar = "https://i0.wp.com/heroisx.com/wp-content/uploads/2019/09/Sasuke-Uchiha-Jutsus-Magenkyou-Sharingan.jpg?resize=640%2C346&ssl=1",
    whatsapp = "666",
    email = "g@gmail.com",
    bio = "lolol"
    WHERE id = 1;`) 

    const deletar = await db.all(`
        DELETE FROM proffys 
        WHERE id = 3;
    `)*/




   


    //o horário que a pessoa trabalha, por exemplo, das 8h - 18h
    // o horário do time_from(8h) precisa ser antes ou igual (<=) ao horário solicitado
    // o time_to precisa ser acima do horario solicitado(>)

    const selectClassesSchedules = await db.all(`
        SELECT * FROM classes_schedule c
        WHERE c.class_id = 1
        AND c.weekday = "0"
        AND c.time_from <= 520
        AND c.time_to > 1300;
    `)
    //console.log(selectClassesSchedules)
})