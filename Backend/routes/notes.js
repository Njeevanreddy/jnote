const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (err) {
        console.log(err)
        res.json({ error: "Internal server error", msg: err.msg });
        }
});
router.post(
    "/addnote",
    [
      body("title", "Title should be atleast one word ").isLength({
        min: 5,
      }),//.custom(value => {return value.split(" ").length>0}),
      body("description", "Description must be at least 5 characters").isLength({
        min: 5,
      })
    ],fetchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const {title,description,tag} =req.body;
        const note = new Notes({title,description,tag,user:req.user.id});
        const savednote = await note.save();
        res.json(savednote)
      } catch (err) {
        console.log(err)
        res.json({ error: "Internal server error", msg: err.msg });
      }
    }
  );

  router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      try {
        const {title,description,tag} =req.body;
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        let note = await Notes.findById(req.params.id);
        if(!note){res.status(401).send("notes not found")}
        if(note.user.toString()!==req.user.id){res.status(401).send("notes not found")}

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note)
      } catch (err) {
        console.log(err)
        res.json({ error: "Internal server error", msg: err.msg });
      }
    }
  );


  router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      try {
        let note = await Notes.findById(req.params.id);
        if(!note){res.status(401).send("notes not found")}
        if(note.user.toString()!==req.user.id){res.status(401).send("notes not found")}

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"sucess":"note has been deleted ", note})
      } catch (err) {
        console.log(err)
        res.json({ error: "Internal server error", msg: err.msg });
      }
    }
  );
module.exports=router
