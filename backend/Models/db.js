const mongoose = require('mongoose');
const mongo_url = process.env.MONGODB_URL;

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected...');
}).catch((err) => {
    console.log('MongoDB Connection Error: ', err);
});
