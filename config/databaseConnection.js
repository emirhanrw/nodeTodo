const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION, {dbName: "nodejs_express_todo",useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('veritabanı bağlantısı başarılı');
})
.catch(err =>{
    console.log('veritabanı bağlantısı başarısız : '+err);
})