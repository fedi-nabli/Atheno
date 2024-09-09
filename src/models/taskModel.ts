import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'to-learn' | 'learning' | 'done';
  dueDate: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'to-learn', 'learning', 'done'],
    default: 'todo'
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model<ITask>('Task', TaskSchema)