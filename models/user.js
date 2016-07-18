var mongoose=require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema= new mongoose.Schema({
	 username:{type:String ,require:true},
	 email:{type:String ,require:true,index:{unique:true}},
	 password:{type:String ,require:true},
	 profilePicture:{type:String},
   friendList:[{userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'}}],
   notificationSeen:{type:Number,default:0},
   request:[{userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'},status:{type:Boolean,default:false}}]
   notification:[userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'},notificationType:{type:String},notification:{type:String},date:{type:Date,default:Date.now},seen:{type:Boolean}}],
   emailConfirmation:{type:Boolean,default:0},
   emailConfirmationToken:{type:String},
   emailConfirmationTokenExpires:{type:Date}
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.plugin(uniqueValidator);
mongoose.model('User',userSchema);