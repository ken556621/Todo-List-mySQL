const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");
const User = db.User;

module.exports = passport => {
    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ where:{ email: email } })
        .then(user => {
            if(!user){
                return done(null, false, { message: "That email is not been registed yet."})
            }
            if(user.password !== password){
                return done(null, false, { message: "Email or password is incorrect." })
            }
            return done(null, user)
        })
    }
        
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            //將資料庫回傳的物件改成 JavaScript 原生物件，因為 handlebars 傳入的限制
            user = user.get()
            done(null, user)
        })
    });
}