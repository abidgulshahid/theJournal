const express = require('express');
const { signUp } = require('../controllers/user_signup');
const { login } = require('../controllers/user_login');
const { logout } = require('../controllers/user_logout');
const {verifyToken} = require("../middleware/verifyToken")
const {home_api} = require("../controllers/home_api");
const {add} = require("../controllers/crud_journal");
const {list_journel} = require('../controllers/list_journal');
const {delete_entry} = require("../controllers/delete_journal");
const {decrypt_password} = require("../controllers/decrypter");
const {updateProfile} = require("../controllers/update_profile");



const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.post('/home/list', verifyToken, list_journel)
router.post('/home/delete', verifyToken, delete_entry)
router.post('/home',verifyToken ,home_api);
router.post('/home/add', verifyToken, add);
router.post('/home/decrypter', verifyToken, decrypt_password)
router.post('/home/update_profile', verifyToken, updateProfile)

console.log(router.all)

module.exports = router;
