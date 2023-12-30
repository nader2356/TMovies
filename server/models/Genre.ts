
import mongoose, { Schema } from "mongoose";


interface IGenre {
  title: string;
  movies: Schema.Types.ObjectId[];
}

const genreSchema: Schema = new mongoose.Schema<IGenre>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);
genreSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


export default mongoose.model<IGenre>("Genre", genreSchema);