const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB successful\n");
}).catch((error) => {
    console.log("Connection to MongoDB failed\n");
    console.log("-----------------------------\n")
    console.log(error);
})
