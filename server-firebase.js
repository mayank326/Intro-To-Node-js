var express=require('express');
var app=express();
var sqlite3=require('sqlite3');
var db=new sqlite3.Database('pets.db');

app.use(express.static('static-files'));

app.get('/user',function(req,res){
	
	db.all('Select name from users_to_pets',(err,rows) =>{

		console.log(rows);
		const allUserName=rows.map(e => e.name);
		res.send(allUserName);
		});
	
});

app.get('/user/:name',function(req,res){

	const userName=req.params.name;

	db.all('select * from users_to_pets where name= $name'),
	{
		$name:userName
	},


	(err,rows) => {
		console.log(rows);	
	}
});


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post('/user',(req,res) =>{
	console.log(req.body);
	
	db.run('INSERT into users_to_pets values($name,$job,$pet)',
	{
		$name:req.body.name,
		$job:req.body.job,
		$pet:req.body.pet
	},
	);
});
app.listen(3000);