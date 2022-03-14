module.exports = async function (db, {proffyId}){
    //inserir dados na tabela proffys
    const deleteProffy = await db.run(`
    DELETE FROM proffys 
    WHERE id = ${proffyId};
    `)

    const deleteClass = await db.run(`
    DELETE FROM classes
    WHERE id = ${proffyId};
    `)


    

    // aqui vou executar todos os db.runs() da classSchedule
    await Promise.all(deleteClass)

}