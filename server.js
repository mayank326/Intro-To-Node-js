var express=require('express');
var app=express();

app.use(express.static('static-files'));
const fakeDatabase={'Philip':{job:'proff',pet:'cat.jpg'},'John':{job:'stu',pet:'dog.jpg'},'Mark':{job:'engineer',pet:'bear.jpg'}};

app.get('/user',function(req,res){
	const allUser=Object.keys(fakeDatabase);
	res.send(allUser);
});

app.get('/user/:userid',function(req,res){
	const name=req.params.userid;
	const val=fakeDatabase[name];
	if(val){
	res.send(val);
	}
	else{
		res.send({});
	}

});

app.listen(3000);