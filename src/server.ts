import express from 'express';
import { connectMongodb } from './config/mogoose.config'
import { UserModel } from './models/users'
import { routes } from './routes/user.routes';


const app = express()
app.use(express.json())

interface User {
  id: string
  name: string
  email: string
}

connectMongodb()

app.use(routes)


app.listen('3333', () => console.log('Back-end Started'))