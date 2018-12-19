import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('section', sectionSchema)