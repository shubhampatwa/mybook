var mongoose=require('mongoose');

var commentSchema=new mongoose.Schema({
	comment:String,
	date:{type:Date,default:Date.now},
	postedby:{name:{type:String,require:true},userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'}},
	post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
});

mongoose.model('Comment',commentSchema);