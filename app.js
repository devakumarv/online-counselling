// imports
const express = require('express')
const app = express()
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const alert = require('alert');
const ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.urlencoded({extended:true}));
const dbURI = 'mongodb+srv://devakumarv:test1234@onlinecounselling.iyvxiiw.mongodb.net/onlinecounselling?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      }))
    .catch((err) =>console.log(err));


const tutordetailsSchema = {
    firstname:String,
    lastname:String,
    email:String,
    dateofbirth:String,
    workexp:Number,
    mobilenum:Number,  
    gender:String, 
    counsubject:String,
    streetadd:String,
    city:String,
    state:String,
    country:String,
    pincode:Number
}

const appointmentdetailsSchema = {
    tutorid:String,
    userid:String,
    firstname:String,
    lastname:String,
    email:String,
    gender:String,
    phone:String,  
    time:String, 
    message:String
}

const paymentdetailsSchema = {
    name:String,
    creditcardnumber:String,
    expiry:String,
    cvv:String
}

const userdetailsSchema = {
    firstname:String,
    lastname:String,
    email:String,
    gender:String,
    mobilenum:Number,   
    password:String
}

const admindetailsSchema = {
    name:String,
    email:String, 
    password:String
}

const tutorsSchema = {
     name:String,
     expertise:String,
     fee:String,
     photo:String
}

const feedbackSchema = {
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    experience:String,
    remark:String
}

const contactusSchema = {
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    counsellingsubject:String,
    message:String
}

const Tutordetail = mongoose.model("TutorDetails",tutordetailsSchema);
const UserDetail = mongoose.model("UserDetails",userdetailsSchema);
const AdminDetail = mongoose.model("admindetails",admindetailsSchema);
const Tutor = mongoose.model("Tutors",tutorsSchema);
const AppointmentDetail = mongoose.model("appointmentdetails",appointmentdetailsSchema);
const PaymentDetail = mongoose.model("paymentdetails",paymentdetailsSchema);
const FeedbackDetail = mongoose.model("feedbacks",feedbackSchema);
const ContactusDetail = mongoose.model("contactus",contactusSchema);

//static files
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUnititalized: false

}));

app.get('',(req,res)=>{
    const {userID} = req.session;
    Tutor.aggregate([{$sample: { size: 8 }}],function(err,tutors){
        res.render(__dirname + '/views/index',{
                tutorList:tutors
        })
    })
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
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + '/views/signup.html')
})
app.get('/logout',(req,res)=>{
    res.sendFile(__dirname + '/views/logout.html')
})
app.get('/home',(req,res)=>{
    const {userID} = req.session;
    Tutor.aggregate([{$sample: { size: 8 }}],function(err,tutors){
        res.render(__dirname + '/views/indexlogout',{
                tutorList:tutors
        })
    })
})
app.get('/appointment',(req,res)=>{
    res.render(__dirname + '/views/appointment2')
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
app.get('/adminlogin',(req,res)=>{
    res.sendFile(__dirname + '/views/adminlogin.html')
})
app.get('/admin',(req,res)=>{
    res.render(__dirname + '/views/admin')
})
app.get('/paymentsuccess',(req,res)=>{
    res.sendFile(__dirname + '/views/paymentsuccessful.html')
})
app.get('/angermanagement',(req,res)=>{
    Tutor.find({expertise:'Anger Management'},function(err,tutors){
        res.render(__dirname + '/views/angermanagement',{
                tutorList:tutors
        })
    })
})
app.get('/careercounselling',(req,res)=>{
    Tutor.find({expertise:'Career Counselling'},function(err,tutors){
        res.render(__dirname + '/views/careercounselling',{
                tutorList:tutors
        })
    })

})
app.get('/childdevelopment',(req,res)=>{
    Tutor.find({expertise:'Child Development'},function(err,tutors){
        res.render(__dirname + '/views/childdevelopment',{
                tutorList:tutors
        })
    })
})
app.get('/counsellingforstudents',(req,res)=>{
    Tutor.find({expertise:'Student Counselling'},function(err,tutors){
        res.render(__dirname + '/views/counsellingforstudents',{
                tutorList:tutors
        })
    })
})
app.get('/drugaddiction',(req,res)=>{
    Tutor.find({expertise:'Drug Addiction'},function(err,tutors){
        res.render(__dirname + '/views/drugaddiction',{
                tutorList:tutors
        })
    })
})
app.get('/internetaddiction',(req,res)=>{
    Tutor.find({expertise:'Internet Addiction'},function(err,tutors){
        res.render(__dirname + '/views/internetaddiction',{
                tutorList:tutors
        })
    })
})

app.get('/admindisplay',(req,res)=>{
    Tutor.find({},function(err,tutors){
        res.render(__dirname + '/views/admindisplay',{
                tutorList:tutors
        })
    })
})
app.get('/admindelete/:id',(req,res)=>{
    Tutor.findByIdAndDelete({_id:req.params.id},req.body,(err,users)=>{
        if(err){
            console.log("Error")
           }else{
            alert("Deleted Successfully!")
            res.redirect('/admindisplay')
           }
    })
})

app.get('/adminedit/:id',(req,res)=>{
    //console.log(req.params.id)
    const newid = req.params.id.trim();
    Tutor.findOneAndUpdate({_id: newid},req.body,{new:true},(err,users)=>{
        if(err){
            console.log(err)
           }else{
           res.render('adminedit',{userdata:users})
           }
    })
})

app.post('/adminedit/:id',(req,res)=>{
    //console.log(req.params.id)
    const newid = req.params.id.trim();
    Tutor.findByIdAndUpdate({_id:newid},req.body,(err,users)=>{
        if(err){
         console.log("Error")
        }else{
         res.redirect('/admindisplay')
        }
 
     })
})

app.post('/tutordetails',function(req,res){
    let newTutorDetail = new Tutordetail({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dateofbirth: req.body.date,
        workexp: req.body.workexp,
        mobilenum: req.body.phone,
        gender: req.body.gender,
        counsubject: req.body.countopic,
        streetadd: req.body.streetadd,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode
    });
   newTutorDetail.save();
   alert("Saved Details Successfully!")
   res.redirect('/home')
})

app.post('/signup',function(req,res){
    let newUserDetail = new UserDetail({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        mobilenum: req.body.phone,
        password:req.body.password,
    });
    newUserDetail.save();
    alert("Saved Details Successfully!")
   res.redirect('/login')
})

app.post('/login',function(req,res){
    //req.session.userID = ;
    const email = req.body.email;
    const password  = req.body.password;
    UserDetail.findOne({email:email,password:password}, function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
            alert("Incorrect Username or Password!")
            
             return res.redirect('/login');
        }
        alert("Login Successful!")
        return res.redirect('/home');
    })
    
})
app.get('/appointment/:id',(req,res)=>{
    //console.log(req.params.id)
    res.render(__dirname + '/views/appointment2')

})

app.post('/appointment/:id',(req,res)=>{
    //console.log(req.params.id)
    const email = req.body.email
    UserDetail.findOne({email:email}, function(err,user){
        if(err){
            console.log(err)
        }
        let newAppointmentDetail = new AppointmentDetail({
            tutorid:req.params.id,
            userid:user._id,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,  
            time:req.body.time, 
            message:req.body.message
        });
        newAppointmentDetail.save();
        alert("Add Payment to finish appointment booking!")
        res.redirect('/payment')
    })
})


app.post('/adminlogin',function(req,res){
    //req.session.userID = ;
    const email = req.body.email;
    const password  = req.body.password;
    AdminDetail.findOne({email:email,password:password}, function(err,admin){
        if(err){
            console.log(err)
        } 
        if(!admin){
            alert("Incorrect Username or Password")
             return res.redirect('/adminlogin');
        }
        alert("Login Successful!")
        return res.redirect('/admindisplay');
    })
    
})

app.post('/admin',function(req,res){
    //req.session.userID = ;
    let newTutor = new Tutor({
        name: req.body.name,
        expertise: req.body.expertise,
        fee:req.body.fee
    });
   newTutor.save();
   alert("Saved Details Successfully!")
   res.redirect('/admindisplay')
    
})


app.post('/feedback',function(req,res){
    let newFeedbackDetail = new FeedbackDetail({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        experience:req.body.experience,
        remark:req.body.remark
    });
    newFeedbackDetail.save();
    alert("Sent Successfully!")
    res.redirect('/home')
})

app.post('/contactus',function(req,res){
    let newContactusDetail = new ContactusDetail({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        counsellingsubject:req.body.counsellingsubject,
        message:req.body.message
    });
    newContactusDetail.save();
    alert("Sent Successfully!")
   res.redirect('/home')
})

app.post('/payment',function(req,res){
    let newPaymentDetail = new PaymentDetail({
        name:req.body.name,
        creditcardnumber:req.body.creditcardnumber,
        expiry:req.body.expiry,
        cvv:req.body.cvv
    });
    newPaymentDetail.save();
   res.redirect('/paymentsuccess')
})