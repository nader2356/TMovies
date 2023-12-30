import mongoose from "mongoose";


interface IUser {
  username: string;
  hash: string;
  image: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hash;
  },
});

export default mongoose.model<IUser>("User", userSchema);