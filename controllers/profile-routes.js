const router = require('express').Router();
const { User } = require('../models')

router.get('/', (req, res) => {    
    User.findAll({
        attributes: [
            'id',
            'role',
            'first_name',
            'last_name',
            'knowledgeable_in'
        ]
    })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true }));
        res.render('profile-cards', { 
            users,
            loggedIn: req.session.loggedIn
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;