const router = require('express').Router();
let User = require('../models/user.model');

router.route('/size').get((req, res) => {
  User.countDocuments()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:page').get((req, res) => {

  const page = req.params.page
  const limit = 10

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results= {};

  results.next = {
    page: page + 1,
  }

  results.previous = {
    page: page - 1,
  }

   User.find()
    .then(users => {
      res.json(users.slice(startIndex,endIndex))
    })
    .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newUser = new User({
    username,
    gender,
    dob,
    news,
    email,
    photo
  });
  //const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error in user: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(newUser => res.json(newUser))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(newUser => {
        newUser.username = req.body.username;
        newUser.gender = req.body.gender;
        newUser.dob = Date.parse(req.body.dob);
        newUser.news = req.body.news;
        newUser.email = req.body.email;
        newUser.photo = req.body.photo;
        newUser.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;