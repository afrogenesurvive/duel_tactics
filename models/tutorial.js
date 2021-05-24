const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  staff: {type: Schema.Types.ObjectId,ref: 'User'},
  dateStarted: {type: Date,required: true},
  dateCompleted: {type: Date,required: true},
  steps: [{
    index: {type: Number},
    description: {type: String},
    complete: {type: Boolean},
  }],
  complete: {type: Boolean},
},
  { timestamps: true }
);

module.exports = mongoose.model('Tutorial', tutorialSchema);
