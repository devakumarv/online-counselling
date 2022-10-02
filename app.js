// imports
const express = require('express')
const app = express()

//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))


app.get('',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/views/login.html')
})
app.get('/feedback',(req,res)=>{
    res.sendFile(__dirname + '/views/feedback.html')
})
app.get('/contactus',(req,res)=>{
    res.sendFile(__dirname + '/views/contactus.html')
})
app.get('/payment',(req,res)=>{
    res.sendFile(__dirname + '/views/payment.html')
})
app.get('/appointment',(req,res)=>{
    res.sendFile(__dirname + '/views/appointment2.html')
})
app.get('/tutordetails',(req,res)=>{
    res.sendFile(__dirname + '/views/tutordetails.html')
})
app.get('/about',(req,res)=>{
    res.sendFile(__dirname + '/views/about.html')
})
app.get('/counsellors',(req,res)=>{
    res.sendFile(__dirname + '/views/counsellors2.html')
})

//listen on port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });