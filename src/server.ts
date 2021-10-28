import express from 'express';
import { connectMongodb } from './config/mogoose.config'
import { UserModel } from './models/users'


const app = express()
app.use(express.json())

interface User {
  id: string
  name: string
  email: string
}


connectMongodb()

app.get('/users', async (request, response) => {
  const userIndex = await UserModel.find()
  return response.status(200).json(userIndex)
})

app.post('/users', async (request, response) => {
  // Receber os dados criados
  const { name, email } = request.body

  // Setando o id autoamticamente
  const user = { name, email } 

  // Adicionado o usuário criado

  const userResponse = await UserModel.create(user);
  
  // Retornando a o usuário criado
  return response.status(201).json(userResponse);
})


app.put('/users/:id', async (request, response) => {
    // Receber os dados 
    const { id } = request.params,
          { name, email } = request.body

    // Localizar o usuário
    try {
      const userIndex = await UserModel.findOneAndUpdate({
        _id: id
      },
      {
        name: name,
        email: email
      },
      {
        new: true
      });
      
      return response.status(200).json(userIndex);
    } catch (error) {
      console.log();
      return response.json(error)
    }

});

app.delete('/users/:id', async(request, response) => {
  const { id } = request.params
  try {
    const userIndex = await UserModel.findOneAndDelete({
      _id: id
    });
    return response.status(200).json({ message: "User deleted", userIndex })
  } catch (error) {
    response.status(404).json(error)
  }
});

app.listen('3333', () => console.log('Back-end Started'))