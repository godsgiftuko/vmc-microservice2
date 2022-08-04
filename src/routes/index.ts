import { IRouter } from '../interfaces';
import { loginUser, createUser, getUserAQuote } from '../controllers';
import { authenticateToken } from '../middlewares/jwt';

export default function user(router: IRouter) {
    router.post('/auth/register', createUser);
    router.post('/auth/login', loginUser);
    router.get('/user/quote', authenticateToken, getUserAQuote);

    return router;
}