import { UserModel } from "../models/users"
import { Request, Response } from 'express'

// LISTAR USUÁRIOS
async function Read(req: Request, res: Response) {
  try {
    const userIndex = await UserModel.find()
    return res.status(200).json(userIndex)
  } 
  catch (error) {
    return res.status(404).json({ message: "Users not found" })
  }
}

// CRIAR USUÁRIOS
async function Create(req: Request, res: Response) {
  const { name, email } = req.body
  const user = { name, email } 

  try {
    const userResponse = await UserModel.create(user);
    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(404).json({ message: "User not create" })
  }
}

// ATUALIZAR USUÁRIOS
async function Update(req: Request, res: Response) {
   
  const { id } = req.params,
        { name, email } = req.body

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
    
    return res.status(200).json(userIndex);
  } 
  catch (error) {
    console.log();
    return res.json(error)
  }
}

// DELETAR USUÁRIO
async function Delete(req: Request, res: Response) {
  const { id } = req.params,
        { name } = req.body
    try {
      const userIndex = await UserModel.findOneAndDelete({
        _id: id
      });
      return res.status(200).json({ message: "User deleted", id, name })
    } catch (error) {
      res.status(404).json(error)
    }
  
}
export { Read, Create, Update, Delete }                       