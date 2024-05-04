const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000; 
// const auth=require('./middlewares')
const adminRoutes = require("./routes/admin");
const studentRoutes = require("./routes/student");
const parentRoutes = require("./routes/parent");

app.use(cors());
app.use(bodyParser.json());

app.use("/admin",adminRoutes);
app.use("/student",studentRoutes);
app.use("/parent",parentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
