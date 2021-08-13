const express=require('express');
const exphbs=require('express-handlebars');
const app=express();
require('./db/conn');
const myCard=require('./models/card');
const port=process.env.PORT || 8000;
const path=require('path');

app.use(express.static(path.join(__dirname,'static')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','handlebars');
app.engine('handlebars',exphbs());

app.get('/',async (req,res)=>{
    try {
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        if(cards.length>0)
        {
            res.render('index',{
                empty:false,
                cards:JSON.stringify(obj),
            });
        }
        else
        {
            res.render('index',{
                empty:true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/',async (req,res)=>{
    try {
        if(req.body.title!="" || req.body.desc!="")
        {
            let date1=new Date();
            let nDate=date1.toLocaleDateString();
            const newCard=new myCard({
                title:req.body.title,
                desc:req.body.desc,
                date:nDate
            });
            let saveCard=await newCard.save();
            let cards=await myCard.find();
            let obj={};
            n=1;
            for(i of cards)
            {
                obj[`title${n}`]=i.title;
                obj[`desc${n}`]=i.desc;
                obj[`date${n}`]=i.date;
                obj[`id${n}`]=i._id;
                n++;
            }
            res.render('index',{
                flag:true,
                color:"success",
                msg:"Your note has been saved! ",
                empty:false,
                cards:JSON.stringify(obj)
            })
        }
        else
        {
            let cards=await myCard.find();
            let obj={};
            n=1;
            for(i of cards)
            {
                obj[`title${n}`]=i.title;
                obj[`desc${n}`]=i.desc;
                obj[`date${n}`]=i.date;
                obj[`id${n}`]=i._id;
                n++;
            }
            if(cards.length>0)
            {
                res.render('index',{
                    flag:true,
                    color:"danger",
                    msg:"Blank notes cannot be saved! ",
                    empty:false,
                    cards:JSON.stringify(obj)
                })
            }
            else
            {
                res.render('index',{
                    flag:true,
                    color:"danger",
                    msg:"Blank notes cannot be saved! ",
                    empty:true
                })
            }
        }
    } catch (error) {
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        if(cards.length>0)
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:false,
                cards:JSON.stringify(obj)
            })
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:true
            })
        }
    }
})

app.post('/delete',async (req,res)=>{
    try {
        let id=req.body.hid_id;
        let dltCard=await myCard.findByIdAndDelete({_id:id});
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        if(cards.length>0)
        {
            res.render('index',{
                flag:true,
                color:"success",
                msg:"Note Deleted! ",
                empty:false,
                cards:JSON.stringify(obj)
            })
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"success",
                msg:"Note Deleted! ",
                empty:true
            })
        }
    } catch (error) {
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        if(cards.length>0)
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:false,
                cards:JSON.stringify(obj)
            })
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:true
            })
        }
    }
})

app.post('/update',async (req,res)=>{
    try {
        let id=req.body.up_hid;
        let date=new Date();
        let date1=date.toLocaleDateString();
        let upCard=await myCard.findByIdAndUpdate({_id:id},{
            title:req.body.title1,
            desc:req.body.desc1,
            date:date1
        });
        await upCard.save();
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        res.render('index',{
            flag:true,
            color:"success",
            msg:"Note updated! ",
            empty:false,
            cards:JSON.stringify(obj)
        })
    } catch (error) {
        let cards=await myCard.find();
        let obj={};
        n=1;
        for(i of cards)
        {
            obj[`title${n}`]=i.title;
            obj[`desc${n}`]=i.desc;
            obj[`date${n}`]=i.date;
            obj[`id${n}`]=i._id;
            n++;
        }
        if(cards.length>0)
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:false,
                cards:JSON.stringify(obj)
            })
        }
        else
        {
            res.render('index',{
                flag:true,
                color:"danger",
                msg:"Some error occured, try again after sometime! ",
                empty:true
            })
        }
    }
})

app.post('/search',async (req,res)=>{
    try {
        let query=req.body.search;
        let cards=await myCard.find({$or: [{"title" : {$regex : query}} , {"desc" : {$regex : query}}]});
        if(cards.length>0)
        {
            let obj={};
            n=1;
            for(i of cards)
            {
                obj[`title${n}`]=i.title;
                obj[`desc${n}`]=i.desc;
                obj[`date${n}`]=i.date;
                obj[`id${n}`]=i._id;
                n++;
            }
            res.render('index',{
                search:true,
                query:query,
                empty:false,
                cards:JSON.stringify(obj),
                smsg:`${cards.length} result/s found.`
            });
        }
        else
        {
            res.render('index',{
                search:true,
                query:query,
                smsg:"No results found!"
            });
        }
    } catch (error) {
        res.render('index',{
            search:true,
            query:query,
            smsg:"No results found!"
        });
    }
})

app.listen(port,()=>{
    console.log('Listening..');
})