import mongoose from 'mongoose'

const formationSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('formation', formationSchema)