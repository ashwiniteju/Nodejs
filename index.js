const { render } = require('ejs');
const express=require('express');
const path=require('path');
const port=8000;

// reuqir mogoose for config
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
// Set EJS as templating engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use signifies the middleware
app.use(express.urlencoded());

//this is for accesing static file using mddleware
app.use(express.static('assets'));  

// // 1middleware
// app.use(function(req,res,next){

//     req.myName="Aman"
//     console.log("middle ware one is called");
//     next();
// });
// // middeleware2
// app.use(function(req,res,next){
// console.log("my name is come form mw2",req.myName);
//     // console.log("middle ware two is called");
//     next();
// });






// i'll create contact list

var contactList=[
   {
       name:"Aman",
       phone:"1234566"
   }
  


]



// now we will render on home.ejs page on a certain request by the user
// fecthing data 
app.get('/',(req,res)=>{
 // return res.render('home',
// {
//     name:"Aman",
//     contact_list:contactList
// }
// );
  Contact.find({},function(err,contacts){
if(err){
  console.log("error inside fetching contact from database");
return;
}
return res.render('home',{
 
  contact_list:contacts
 
})
  })

})




app.get('/loop',(req,res)=>{

    return res.render('loop');
    
    });



    // push new data into contact list and contact creation fnction
    app.post('/create-contact',(req,res)=>{
      //push name and phone into array list by user
      /* 
    //   you also do that
      contactList.push{
          name:req.body.name,
          phone:req.body.phone
      }
      */
      //  contactList.push(req.body);


      //  We have created a create function that takes two parameters as name and phone
// because we have defined them in the schema inside the { contact.js} file
       Contact.create({
        name:req.body.name,
        phone:req.body.phone
       },function(err,newContact){
        // if there is an it show error  on console
        if(err)
        {console.log("there is an in ccreation of contact list");}
      console.log("*****",newContact);
    
      return res.redirect('back');
       })

        })


        //  for deleting a contact
        app.get('/delete-contact',(req,res)=>{
          // value comes from delte btn

            let phone =req.query.phone
//  find contactindex if it present then we delete a contct other wise return -1
            let contactindex=contactList.findIndex(contact => contact.phone==phone);
           
            if(contactindex!=-1)
            {
             contactList.splice(contactindex,1);
            }
            return res.redirect('back');


        });



app.listen(port,(err)=>{

    if(err){
        console.log("Error is Runnning on Server",err);

    }
    console.log('server is runnig on port',port);
})