module.exports = async function (db, {proffyValue, classValue,proffyId}){
    //inserir dados na tabela proffys
    const insertedProffy = await db.run(`
        UPDATE proffys
        SET
            name = "${proffyValue.name}",
            avatar = "${proffyValue.avatar}",
            whatsapp = "${proffyValue.whatsapp}",
            email = "${proffyValue.email}",
            bio = " ${proffyValue.bio}"
            WHERE id = ${proffyId};
       ;
    `)


    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            UPDATE classes 
            SET
                subject = "${classValue.subject}",
                cost = "${classValue.cost}"
            WHERE id = ${proffyId};

    `)

    

    // aqui vou executar todos os db.runs() da classSchedule
    await Promise.all(insertedClass)

}