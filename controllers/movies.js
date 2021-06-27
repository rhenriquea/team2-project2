const Movie = require('../models/movie');
const person = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies
  });
};

exports.getAddMovies = (req, res) => {
  res.render('/add-movie'), {
    title: ' Add Movie',
    path: 'add-movie'
  }
}

exports.postMovies = (req, res) => {

  const movies = new Movie({
    title: req.body.title,
    cover: req.body.cover,
    description: req.body.description,
    genres: [req.body.genres],
    actors: [req.body.actors],
    rating: req.body.rating,
    year: req.body.year
  });

  movies.save(function (err, movies) {
    if (err) {
      return next(err)
    }
    res.json(201, movies)
  })


};


/*******************************************************************
* the route is post sign up it is responsible for user sign-up
* it takes in five parameters email, password, Cpassword,Fname and 
* Lname.
* it make user of bcrypt for encrypting password.
*  author: @adesoji
********************************************************************/

exports.postSignup = (req, res, next) => {
  const name = req.body.Fname + " " + req.body.Lname;
  const email = req.body.email;
  const password = req.body.password;
  const Cpassword = req.body.Cpassword;
  const createdAt= new Date();
  const updatedAt = new Date();

  person.findOne({ email: email }).then(result=>{
    if (result) {
      return res.status(201).json({ response: 'user exist' });
    } else {
      if (password === Cpassword) {
        bcrypt.hash(password, 12).then(result => {
          const user = new person({
            email: email,
            password: result,
            name: name,
            createdAt: createdAt,
            updatedAt: updatedAt
          });
          return user.save();
        })
          .then(result => {
            return res.status(201).json({ response: result });
          })
          .catch(err => {
            next(err);
          })

      } else {
        return res.status(404).json({ response: 'password incorrect' });
      }

      
    }

  })
  .catch(err=>{

    return res.status(404).json({ response: 'working on signup page' });

  })
  

};


/*******************************************************************
* the route is post-login it is responsible for user login.
* it takes in two parameters email and password.
* it make user of bcrypt for encrypting password.
*  author: @adesoji
********************************************************************/
exports.postLogin = (req, res, next) => {
 

  
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  
  
  person.findOne({ email: email }).then(user => {
    if (!user) {
  
      return res.status(404).json({ response: 'invalid email or passward' });
    }
    bcrypt
      .compare(password, user.password)
      .then(result => {
        if (result) {
          console.log(result)
          return res.status(200).json({response : result})
        }
        return res.status(404).json({ response: 'invalid email or passward' })
      })
      .catch(err => {
        return res.status(500).json({ response: 'working on signup page' });

        
      })
  })
    .catch(err => {
      return res.status(500).json({ response: 'working on signup page' });


    })


};