const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async(req, res) => {

  try
  {
    
    const hashedPass=await bcrypt.hash(req.body.password,10);
    const user={Name:req.body.Name,password:hashedPass};
    users.push(user);
    res.status(201).send();

  }
  catch{
    res.status(500).send();
  }
});

app.post('/users/login',async(req,res)=>{
  const user=users.find(user=>user.Name==req.body.Name);
  if(user==null){
    return res.status(404).send('Invalid Username or Password')
  }
  else 
  {
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
          return res.send('Succesfully logged in')
        }
        else
        {
          return res.send('Invalid Username or Password')
        }
    }catch{
      return res.status(500).send()
    }
  }
})

app.listen(3000);
