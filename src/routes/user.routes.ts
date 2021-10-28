import { Router } from 'express';
import * as user from '../controllers/user.controllers';

const routes = Router();


routes.get('/users', user.Read);

routes.post('/users', user.Create)

routes.put('/users/:id', user.Update)

routes.delete('/users/:id', user.Delete)

export {routes}  