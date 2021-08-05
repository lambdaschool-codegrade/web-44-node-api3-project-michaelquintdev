const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model');
const { validateUserId,  validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.user)
    .then(updatedUser => {
      Users.getById(req.params.id)
        .then(db => {
          res.status(200).json(db)
        })
        .catch(next)
    })
    .catch(next)
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;