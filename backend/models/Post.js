const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    username:{
  type:String,
  required:true
},

  title:{
    type:String,
    required:true
  },

  content:{
    type:String,
    required:true
  },

  likes:{
    type:Number,
    default:0
  },

  comments:{
    type:Array,
    default:[]
  }

});

module.exports =
mongoose.model("Post", postSchema);