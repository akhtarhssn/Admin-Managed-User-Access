import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, default: "User" },
  },
  {
    timestamps: true,
  }
);

// Custom static methods:
UserSchema.statics.userExists = async (id: string) => {
  const existingUser = await User.findOne({ userId: id }).select("+password");
  return existingUser;
};

// check if password matches:
UserSchema.statics.isPasswordMatch = async (plainPass, hashedPass) => {
  return await bcrypt.compare(plainPass, hashedPass);
};

// mongoose document middleware:
// Pre save middleware: will work on create() and save()
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.password) {
    // Only hash the password if it's defined
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
  }

  next();
});

// Post save middleware: will work on create() and save()
UserSchema.post("save", function (doc, next) {
  // console.log(this, 'Post Hook: will execute after saving data');
  doc.password = "";
  next();
});

// create model:
export const User = model<IUser, UserModel>("User", UserSchema);
