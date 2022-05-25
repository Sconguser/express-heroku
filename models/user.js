const pool = require("../db");
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.JWTSECRET;

function generateAccessToken(username, id) {
    return jwt.sign({name:username, userId:id}, process.env.JWTSECRET, { expiresIn: '30s' });
  }

class User{
    constructor(userId, username, isAdmin, token, activated){
        this.userId = userId;
        this.username = username;
        this.isAdmin = isAdmin;
        this.token=token;
        this.activated=activated;
    }

    static async findUser (username, password){
        try{
        const newUser = await pool.query('SELECT * FROM userswithactivation WHERE username = ($1) AND password = ($2)', [username, password]);
    
        console.log(newUser.rows.length);
        if(newUser.rows.length>0){
            const nameUser = newUser.rows[0].username;
            const id = newUser.rows[0].id;
            const isAdmin = newUser.rows[0].isadmin;
            const activated = newUser.rows[0].activated;
            const token = generateAccessToken(nameUser, id);
            return new User(id, username, isAdmin, token,activated);
        }else{
            return null;
        }
        }
        catch(error){
            throw(error);
         }
        // pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, result, fields){
        //     if(error){
        //         throw(error);
        //     }else{
        //         console.log('sukces w logowanku')
        //     }
        // })
    }

    getUserId(){
        return this.userId;
    }
    setUserId(userId){
        this.userId = userId;
    }
    getUsername(){
        return this.username;
    }
    setUsername(username){
        this.username = username;
    }
    getIsAdmin(){
        return this.isAdmin;
    }
    setIsAdmin(isAdmin){
        this.isAdmin = isAdmin;
    }
    getToken(){
        return this.token;
    }
    setToken(token){
        this.token = token;
    }
    getActivated(){
        return this.activated;
    }
    setActivated(activated){
        this.activated = activated;
    }
}
module.exports.user = User;