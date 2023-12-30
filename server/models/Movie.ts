
import mongoose, { Schema } from "mongoose";

interface IMovie {
  title: string;
  poster: string;
  genres: Schema.Types.ObjectId[];
  postedBy: Schema.Types.ObjectId;
}

const movieSchema = new mongoose.Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
    poster: {
      type: String,
      required: [true, "can't be blank"],
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
movieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});



export default mongoose.model<IMovie>("Movie", movieSchema);