const db = require("../database");

module.exports = {
  register: async (req, res) => {
      
      
    inputData = {
      email_address: req.body.email_address,
      login_name: req.body.login_name,
      real_name: req.body.real_name,
      password: req.body.password,
      birth_date: req.body.birth_date,
      country: req.body.country,
      confirm_password: req.body.confirm_password,
    };

    
    var hasErrors = false;
    var msg = "";

    const existingEmail = await db.promise(`SELECT * FROM users WHERE 
    email_address = "${inputData.email_address}"`);

    const existingName = await db.promise(`SELECT * FROM users WHERE 
        login_name = "${inputData.login_name}"`);

    if (existingEmail.length) {
      hasErrors = true;
      msg = inputData.email_address + " was already exist";
    }

    if (existingName.length) {
      hasErrors = true;
      msg = inputData.login_name + " was already exist";
    }

    if (!inputData.email_address.includes("@")) {
      hasErrors = true;
      msg = "Please enter valid email!";
    } 

    if (inputData.login_name.length < 3 || inputData.login_name.length > 10) {
      hasErrors = true;
      msg = "Name length must be between 3 and 10 characters!";
    }

    if (inputData.password.length < 3) {
      hasErrors = true;
      msg = "Password length must be at least 3 characters!";
    }

    if (inputData.confirm_password !== inputData.password) {
      hasErrors = true;
      msg = "Passwords mismatched!";
    }

    if (hasErrors) {
      const countries = await db.promise("SELECT * from continents");
      return res.render("registration-form", {
        country_data: countries,
        alertMsg: msg,
      });
    }

    var sql = "INSERT INTO users SET ?";
    db.query(
      sql,
      {
        email_address: req.body.email_address,
        login_name: req.body.login_name,
        real_name: req.body.real_name,
        password: req.body.password,
        birth_date: req.body.birth_date,
        country: req.body.country,
      },
      function (err) {
        if (err) throw err;
      }
    );
    req.session.loggedin = true;
    req.session.email = req.body.email_address;
    req.session.login = inputData.real_name;
    var msg = "Your are successfully registered";
    return res.redirect("/dashboard");
  },
  registerGet: async (req, res) => {
    const continents = await db.promise("SELECT * from continents");
    return res.render("registration-form", { country_data: continents});
  },
  login: async (req, res) => {
    var emailAddress = req.body.email_address;
    var password = req.body.password;

    var sql = "SELECT * FROM users WHERE email_address =? AND password =?";
    db.query(sql, [emailAddress, password], function (err, data) {
      if (err) {
        throw err;
      }

      if (data.length > 0) {
        req.session.loggedin = true;
        req.session.login = data[0].real_name;
        req.session.email = req.body.email_address;
        res.redirect("/dashboard");
      } else if (!emailAddress.length || !password.length) {
        res.render("login-form", {
          alertMsg: "Please enter valid data",
        });
      } else {
        res.render("login-form", {
          alertMsg: "Your Email Address or password is wrong",
        });
      }
    });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};


