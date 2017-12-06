import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import account from '../model/account';
import {Router} from 'express';



export default({config,db})=>{

    let api = Router();


    api.post('/add',(req,res)=>{
        let acc = new account();
        acc.email = req.body.email;
        acc.password = req.body.password;
        acc.save((err)=>{
            if(err){
                res.send(err);
            }
            res.json({message:"stored"});
        });
    });

    api.get('/get',(req,res)=>{
        account.find({},(err,data)=>{
            if(err){
                res.send(err);
            }
            res.json(data)
        })
        
        
    });

    api.get('/get/:email',(req,res)=>{
        account.findOne({email:req.params.email},(err,data)=>{
            if(err){
                res.send(err);
            }
            res.json(data)
        })
        
        
    });

    api.put('/update/:email',(req,res)=>{
        account.findOne({email:req.params.email},(err,data)=>{
            if(err){
                res.send(err);
            }
            data.email = req.body.email;
            data.password = req.body.password
            data.save(err=>{
                if(err){
                    res.send(err)
                }
                res.send('updated')
            })
          
        })
        
        
    });

api.delete('/delete/:email',(req,res)=>{
    account.remove({email:req.params.email},(err)=>{
        if(err){
            res.send(err);
        }
      res.send("deleted")
    });
});

return api;


} 

