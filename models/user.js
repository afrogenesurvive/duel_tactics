const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {type: String,required: true},
  title: {type: String},
  name: {type: String,required: true},
  role: {type: String, enum: ['Admin','Staff','Nurse','Doctor']},
  username: {type: String,required: true},
  registrationNumber: {type: String},
  employmentDate:{type: Date},
  dob:{type: Date},
  age: {type:Number},
  gender: {type: String},
  contact: {
    phone: {type: String},
    phone2: {type: String},
    email: {type: String,required: true},
  },
  addresses: [{
    number: {type:Number},
    street: {type: String},
    town: {type: String},
    city: {type:String},
    parish: {type: String},
    country: {type:String},
    postalCode: {type:String},
    primary: {type: Boolean},
    _id : false
  }],
  loggedIn: {type: Boolean},
  clientConnected: {type: Boolean},
  verification:{
    verified:{type: Boolean},
    type:{type: String},
    code:{type: String}
  },
  attendance:[{
    date: {type: Date},
    status: {type: String},
    description: {type: String},
    highlighted: {type: Boolean},
    _id : false
  }],
  leave: [{
    type: {type: String},
    startDate: {type:Date},
    endDate: {type:Date},
    description: {type: String},
    highlighted: {type: Boolean},
    _id : false
  }],
  images: [{
    name: {type:String},
    type: {type: String},
    path: {type: String},
    highlighted: {type: Boolean},
    _id : false
  }],
  files: [{
    name: {type:String},
    type: {type: String},
    path: {type: String},
    highlighted: {type: Boolean},
    _id : false
  }],
  notes: [{type: String}],
  appointments: [{type: Schema.Types.ObjectId,ref: 'Appointment'}],
  visits: [{type: Schema.Types.ObjectId,ref: 'Visit'}],
  reminders: [{type: Schema.Types.ObjectId,ref: 'Reminder'}],
  activity:[{
    date: {type: Date},
    request: {type: String},
    _id : false
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
