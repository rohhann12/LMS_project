const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rohann:rohan@cluster0.xvl6xp0.mongodb.net/")

const AdminSchema = new mongoose.Schema({
    
    username: String,
    password: String,
    avatar:String
});

const ParentSchema = new mongoose.Schema({
    
    username: String,
    password: String
});

const StudentSchema = new mongoose.Schema({
    
    username: String,
    password: String
});
const MarksSchema = new mongoose.Schema({
    name:String,
    marksObtained:Number,
    totalMarks:Number
});

const Marks=mongoose.model("Marks",MarksSchema)
const Admin = mongoose.model('Admin', AdminSchema);
const Student = mongoose.model('Student', StudentSchema);
const Parent = mongoose.model('Parent', ParentSchema);

module.exports = {
    Admin,
    Student,
    Parent
}
