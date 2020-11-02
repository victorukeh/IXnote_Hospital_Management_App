const mongoose = require('mongoose')
const dotenv = require('dotenv')

module.exports = () =>  {
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,    
    
})
.then(() => {'pass', console.log('connected to mongoose')})
.catch(err => { console.log(err)})
}
mongoose.connection.on('error', error => console.log())
mongoose.connection.once('open', () => console.log('connected to mongoose'))
