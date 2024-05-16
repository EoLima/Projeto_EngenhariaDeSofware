const User = require('../models/authModels');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

async function postAuth(req, res){
    const  {email,password} = req.body;
      try {
        const user = await User.findOne({
          attributes : ['email','password', 'id'],
           where: { email : email } });
           
        if (!user) {
          return res.status(400).json({msg : 'Usuário não cadastrado!'})
        }
          try{
            const checkPassword = await bcrypt.compare(password, user.password); 
            if(checkPassword){
                const tokenPayload = { id: user.id, email: user.email };
                const token = jwt.sign({ tokenPayload }, process.env.SECRET);
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
