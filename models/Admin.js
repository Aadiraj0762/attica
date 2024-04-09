const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    address: String,
    country: String,
    city: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    password: String,
    role: {
      type: String,
      required: true,
      default: "Admin",
      enum: [
        "Admin",
        "Super Admin",      
        "Executive",       
      ],
    },
    joiningDate: Date,
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  // Hash the password before saving
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Index for the email field
adminSchema.index({ email: 1 });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
