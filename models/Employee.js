const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  user: String,
  password: Number,
  name: String,
  surname: String
   
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

var Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;