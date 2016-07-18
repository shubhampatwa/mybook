
var mongoose=require('mongoose');

var postSchema=new mongoose.Schema({
	post:{type:String,require:true},
	likes:{type:Number,default:0},
	date:{type:Date,default:Date.now},
	postedby:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
	postComment:[comment:String,date:{type:Date,default:Date.now},
	postedby:{type: mongoose.Schema.Types.ObjectId,ref:'User'}]
});
questionSchema.methods.like=function(cb){
this.likes+=1;
this.save(cb);
};
mongoose.model('Post',postSchema)