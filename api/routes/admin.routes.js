import express from 'express';
import { verifyAdmin } from '../utils/verifyUser.js';
import { 
    loginAdmin,
    getUsers,
    adminSignout,
    deletetUser,
    addUser,
    editUser 
} from '../controllers/admin.controller.js';


const router = express.Router();

router.post('/signin', loginAdmin);
router.post('/signout', adminSignout);
router.get('/users', verifyAdmin, getUsers);
router.delete('/delete/:id', verifyAdmin, deletetUser);
router.post('/edit/:id', verifyAdmin, editUser);
router.post('/addUser', verifyAdmin, addUser);

export default router;