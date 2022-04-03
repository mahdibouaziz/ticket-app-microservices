import mongoose from "mongoose";

// an interface that describes the propreties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the propreties that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

// an interface that describes the propreties that a user document has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// when you want to create a new user just User.build({...})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
