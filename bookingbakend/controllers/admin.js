const User=require('../models/user');

exports.postAddUser=async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const data=await User.create({
            name: name,
            email: email,
            phone: phone
        });
        res.status(201).json({newUserDetail:data})
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }   
};
exports.deleteUser=async (req, res, next) => {
    const id=req.body.id;
    User.findByPk(id)
    .then((user) =>{
        user.destroy();
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.getUser= (req, res, next) => {
    User.findAll()
    .then(user => {
        res.status(200).json({user:user});
    })
    .catch(err => {
        console.log(err);
    });
};