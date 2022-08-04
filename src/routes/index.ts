import { IRouter } from '../interfaces';
import { loginUser, createUser } from '../controllers';
import { authenticateToken } from '../middlewares/jwt';

export default function Public(router: IRouter) {
    router.post('/register', createUser);
    router.post('/login', authenticateToken, loginUser);

    return router;
}