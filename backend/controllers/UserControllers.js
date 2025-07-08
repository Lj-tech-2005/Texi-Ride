
const UserModels = require("../models/UserModels");



const UserControllers = {

    async register(req, res) {

        try {

            const { email, password, name } = req.body;
            const existingUser = await UserModels.findOne({ email: email });
            if (existingUser) {
                return res.send({ msg: "try diffrent email id", flag: 0 });
            }


            const User = await new UserModels({ name, email, password });

            User.save().then(

                () => {

                    return res.send({msg:"account created successfully",flag:1});
                
                }

            ).catch(

                (err) => {

                    console.log(err)
                    return res.send({msg:"unable to create account",flag:0});

                }

            )


        } catch (error) {
            return res.status(500).send({ msg: 'Internal Server Error', flag: 0 });

        }


    }



}


module.exports = UserControllers;