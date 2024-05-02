const User = require('../models/authModels');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

async function postAuth(req, res){
    const  {email,password} = req.body;
      try {
        const checkEmail = await User.findOne({
          attributes : ['email','password'],
           where: { email : email } });
           
        if (!checkEmail) {
          return res.status(400).json({msg : 'Usuário não cadastrado!'})
        }
          try{
            const checkPassword = await bcrypt.compare(password, checkEmail.password); 
            if(checkPassword){
                const token = jwt.sign({email : email}, process.env.SECRET,{expiresIn: '1h' });
                return res.status(202).json({ msg: 'Usuário autenticado', token: token });
             } else{
              return res.status(401).json({msg: 'Senha incorreta.'})
             }
         }catch(error){
           return res.status(500).json({msg : 'internal Error!'})
       }
      } catch(error){
          return res.status(500).json({msg : 'Internal Error!'});
      }
        
    }
  
  
    
      

module.exports = {postAuth};
