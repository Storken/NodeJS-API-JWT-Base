import { Request, Response } from 'express'
import Mail from 'nodemailer'
import { findUserByEmail } from '../services/users'
import { JWT_SECRET } from '../config'
import jwt from 'jsonwebtoken'
import welcome from './templates/welcome'

const getMailClient = () => {
  return Mail.createTransport({
    host: 'smtp.fastmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD // generated ethereal password
    }
  })
}

export const sendForgotPasswordEmail = async (req: Request, res: Response) => {
  if (process.env.JEST_WORKER_ID !== undefined) return

  const dbUser = findUserByEmail(req.body.data.email)

  if (!dbUser) {
    res.status(400).send('No user found')
    return
  }

  const token = jwt.sign(
    { email: dbUser.email, user_id: dbUser.user_id },
    JWT_SECRET,
    {
      expiresIn: '30m'
    }
  )

  const info = await getMailClient().sendMail({
    from: `"LinkBun Support" <${process.env.MAIL_ALIAS_SUPPORT}>`, // sender address
    to: dbUser.email, // list of receivers
    subject: 'Forgot password', // Subject line
    text: `Forgot password, copy-paste the following link into your browser and you'll be able to choose a new password.
    https://linkbun.io/app/recover-password?token=${token}`, // plain text body
    html: `<h1>Recover password</h1>
    <p>By clicking the link below you'll be able to generate a new password for your account.</p>
    <a href="https://linkbun.io/app/recover-password?token=${token}">Generate a new password</a>
    </br>
    <p>Cheers!</p> 
    <p>LinkBun Support</p>
    ` // html body
  })

  if (info.accepted) res.sendStatus(200)
  else res.status(400).send('Could not generate an email to recipient')
}

export const sendInviteEmail = async (email: string, invitedBy: string) => {
  if (process.env.JEST_WORKER_ID !== undefined) return

  return getMailClient().sendMail({
    from: `"LinkBun Invitation" <${process.env.MAIL_ALIAS_INVITE}>`, // sender address
    to: email, // list of receivers
    subject: 'You have been invited 🎉', // Subject line
    text: `You have been invited to collaborate on a linkbun collection by ${invitedBy},
     create an account on https://linkbun.io/app/sign-up to start collecting links!`, // plain text body
    html: `<h1>Collaboration invitation!</h1>
    <p>You have been invited to collaborate on a linkbun collection by ${invitedBy}, the link below redirects you to our sign up page.</p>
    <a href="https://linkbun.io/app/sign-up">Create a linkbun account!</a>
    </br>
    <p>Cheers!</p> 
    <p>LinkBun</p>
    ` // html body
  })
}

export const sendActivationEmail = async (email: string) => {
  const dbUser = findUserByEmail(email)

  if (!dbUser) {
    return
  }

  const token = jwt.sign(
    { email: dbUser.email, user_id: dbUser.user_id },
    JWT_SECRET,
    {
      expiresIn: '30m'
    }
  )

  return getMailClient().sendMail({
    from: `"LinkBun Account" <${process.env.MAIL_ALIAS_INVITE}>`, // sender address
    to: email, // list of receivers
    subject: 'Welcome to LinkBun! 👋', // Subject line
    text: `You have requested an account at LinkBun, the following link activates your account. 
    https://linkbun.io/app/activate-account?token=${token}`, // plain text body
    html: welcome(token), // html body
    attachments: [
      {
        filename: 'logo.png',
        path: __dirname + '/templates/logo.png',
        cid: 'logo'
      },
      {
        filename: 'welcome.png',
        path: __dirname + '/templates/welcome.png',
        cid: 'welcome'
      }
    ]
  })
}
