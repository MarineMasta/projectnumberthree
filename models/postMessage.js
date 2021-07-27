import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  color: String,
  highestScore: String,
  timesPlayed: String,
})

const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage
