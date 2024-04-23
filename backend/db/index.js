const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://rohann:rohan@cluster0.xvl6xp0.mongodb.net/')
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to MongoDB');
// });
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const ParentSchema = new mongoose.Schema({
    username: String,
    password: String
});

const ImageModel = new mongoose.Schema({
    myFile : String,
    subgroup:String
    
});

const StudentSchema = new mongoose.Schema({
    username: String,
    password: String,
    rollnumber:Number,
    subgroup:String,
    avatar:String,
});

const MarksSchema = new mongoose.Schema({
    totalMarks:Number,
    DBMS:Number,
    SE:Number,
    CN:Number,
    rollnumber:Number
});

const Marks=mongoose.model("Marks",MarksSchema)
const Admin = mongoose.model('Admin', AdminSchema);
const Student = mongoose.model('Student', StudentSchema);
const Parent = mongoose.model('Parent', ParentSchema);
const Image=mongoose.model('Posts',ImageModel)

module.exports = {
    Admin,
    Student,
    Parent,
    Marks,
    Image
}
