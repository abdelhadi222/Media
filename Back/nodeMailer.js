import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:'code51507@gmail.com',
        pass:'pouvqlwhdpovmhwo'
    }
})

export const sendConfrmationEmail = (email,token)=>{
    transport.sendMail({
        from:"code51507@gmail.com",
        to:email,
        subject:'Confrmation you Account',
        html : `<h1>Email Confrmation</h1>
           <h3 style={{textAlign: center}}>Welcome To our Website , please click this button to verfy your email</h3>
           <a  href=http://localhost:5173/confirm/${token}> Confirmation Email</a>
        `,

    })
    .catch((err)=>{
        console.log("validation err from nodeMailer : ",err);
    })
}




export const ForgetPassword = (email,token)=>{
    transport.sendMail({
        from:"code51507@gmail.com",
        to:email,
        subject:'Rest paswword',
        html : `<h1> Forget password </h1>
           <h3>Click in This Url please :</h3>
           <a href=http://localhost:5173/AddPassword/${token}> Here !!</a>
        `,

    })
    .catch((err)=>{
        console.log("validation err from nodeMailer : ",err);
    })
}