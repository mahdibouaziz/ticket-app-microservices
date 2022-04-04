import mongoose from "mongoose";
import { Password } from "../services/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// when you want to create a new user just User.build({...})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// middleware that gonna intercept the save method and hash the password
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
