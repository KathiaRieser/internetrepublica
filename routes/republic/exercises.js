const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');
const exec = require('child_process').exec;

/* GET exercise1. */
router.get('/exercise1', function(req, res, next) {
  res.render('republic/exercise1', { message:'' });
});

/* POST exercise1. */
router.post('/exercise1', function (req, res, next) {

  const name = req.body.name;

  if (name === "") {
    res.render("republic/exercise1", { message: 'Introduzca un nombre' });
    return;
  }
  else{
    res.render("republic/exercise1", { message: `Hola ${name}`});
    return;
  }
  
})

/* GET exercise2. */
router.get('/exercise2', function(req, res, next) {
  res.render('republic/exercise2', { message:'' });
});

/* POST exercise2. */
router.post('/exercise2', function (req, res, next) {

  const name = req.body.name;
  const address = req.body.address;
  const fruits = req.body.fruits;
  
  console.log(req.body);

  if (name === "" || address === "") {
    res.render("republic/exercise2", {message: 'Introduzca un nombre, una dirección y selecciones alguna de las frutas' });
    return;
  }
  else{
    
    res.render("republic/exercise2", { message: `${name} con dirección ${address} ha seleccionado: ${fruits}`});
    return;
  }
  
})

/* GET exercise3. */
router.get('/exercise3', function(req, res, next) {
  res.render('republic/exercise3');
});

/* GET exercise4. */
router.get('/exercise4', function(req, res, next) {
  res.render('republic/exercise4');
});


/* GET exercise56. */
router.get('/exercise5-6', function(req, res, next) {
  Employee.find().exec((err, employees) => {
    res.render('republic/exercise5-6', { employees:employees});
  })
});

router.get('/exercise5-6/delete/:id', (req, res) => {
  const id = req.params.id;

  Employee.findByIdAndRemove(id, (err, employee) => {
    if (err){ return next(err); }
    return res.redirect('/republic/exercise5-6');
  });
});

/* GET exercise5-6/employee/new. */
router.get('/exercise5-6/employee/new', function (req, res, next) {
  res.render('employee/new');
});

/* POST exercise5-6/employee/new. */
router.post('/exercise5-6/employee/new', function (req, res, next) {

  console.log("entramos en el post");
  console.log(req.body);

  const newEmployee = new Employee({
    user: req.body.user,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname
  });

  console.log(newEmployee);

  newEmployee.save((err) => {
    if (err) {
      console.log(err);
      res.render("employee/new", {
        //errorMessage: err.errors.tweet.message
      });

    } else {
      console.log("employee created");
      res.redirect('/republic/exercise5-6')
    }

  });

});



module.exports = router;