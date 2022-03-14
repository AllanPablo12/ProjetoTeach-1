module.exports = async function (db, {proffyLogin}){
    //inserir dados na tabela proffys
    const loginProffy = await db.run(`
    SELECT * FROM proffys 
    WHERE 
    email = "${proffyLogin.email}" and
    senha = ${proffyLogin.senha};
    `)

    

    

    // aqui vou executar todos os db.runs() da classSchedule
}