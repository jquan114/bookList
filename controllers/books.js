// require our dependencies

const express = require('express')// node module using rhe singleton pattern
const Book = require('../models/book')
//seed Data
const bookSeed = require("../models/bookSeed");
// initially router object

//define router/controllers code
const router = express.Router();

// /Routes<!-------------------------
// Routes / Controllers
// Seed
router.get("/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {});

  Book.create(
    bookSeed,

    (error, data) => {
      res.redirect("/books");
    }
  );
});

///////////////////////INDEX//////////////
router.get("/", (req, res) => {
  Book.find({}, (error, allBooks) => {
    res.render("index.ejs", {
      books: allBooks,
    });
  });
});
//////////////////////NEW///////////////////

router.get("/new", (req, res) => {
  res.render("new.ejs");
});
/////////////////////DELETE////////////////
router.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/books");
  });
});

///////////////////UPDATE//////////////////
router.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
  
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedBook) => {
        res.redirect(`/books/${req.params.id}`)
      }
    )
  })

//////////////////Create////////////////////
router.post("/", (req, res) => {
  if (req.body.completed === "on") {
    //if checked, req.body.completed is set to 'on'
    req.body.completed = true;
  } else {
    //if not checked, req.body.completed is undefined
    req.body.completed = false;
  }
  Book.create(req.body, (error, createdBook) => {
    res.redirect("/books");
  });
});

//////////////////EDIT//////////////////////
router.get("/:id/edit", (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    });
  });
});

//////////////////SHOW//////////////////////
router.get("/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", {
      book: foundBook,
    });
  });
});
//export the router object using module.exports
module.exports = router;