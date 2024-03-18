import  {query}  from "express";
import {db} from "../db.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import moment from 'moment';

export const register = (req,res)=>{

    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email, req.body.username], (err, data)=> {

        if(err) return res.json(err);
        if(data.length) return res.status(409).json("user already exists!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const img="1703959955277dontmental.jpg"

        const q = "INSERT INTO users (username,email,password,img) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
            img
        ]

        db.query(q, [values], (err, data)=> {
            if(err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    })

};
export const login = (req,res)=>{

    //Check user

    const q = "SELECT * FROM users WHERE username = ? ";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("user not found!")

        //Check password

        const isPasswordCorrect=bcrypt.compareSync(req.body.password, data[0].password); // true

        if(!isPasswordCorrect)  return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({id:data[0].id},"jwtkey")

        const{password,...other}=data[0]

        res.cookie("access_token" ,token ,{
            httpOnly:true
        }).status(200).json(other)
    })


};
export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out!");
};

export const addpersonaldata = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO personaldata(height, weight, gender, age, activity, calory, uid) VALUES (?)";
  
      const values = [
        req.body.height,
        req.body.weight,
        req.body.gender,
        req.body.age,
        req.body.activity,
        req.body.calory,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal sadsadssadsdsa Error");
        }
  
        return res.json("Post has been created");
      });
    });
  };

  export const checkpersonaldata = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "SELECT * FROM personaldata WHERE uid = ? ";
  
      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
  
        // Check if data exists for the user
        if (data.length > 0) {
          return res.json({ exists: true, data: data[0] });
        } else {
          return res.json({ exists: false });
        }
      });
    });
  };

  export const updatepersonaldata = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "UPDATE personaldata SET height=?,weight=?,gender=?,age=?,activity=?,calory=? WHERE uid = ?";
  
      const values = [
        req.body.height,
        req.body.weight,
        req.body.gender,
        req.body.age,
        req.body.activity,
        req.body.calory,
        userInfo.id,
      ];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
  
        return res.json("Post has been updated");
      });
    });
  };


  
  



  export const addpersonaldiet = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO diets(Food, Measure, Grams, Calories, Protein, Fat, Fiber, Carbs, Category, Meal, Date, uid) VALUES (?)";
  
      const values = [
        req.body.Food,
        req.body.Measure,
        req.body.Grams,
        req.body.Calories,
        req.body.Protein,
        req.body.Fat,
        req.body.Fiber,
        req.body.Carbs,
        req.body.Category,
        req.body.Meal,
        req.body.Date,
        userInfo.id,

      ];
  
      db.query(q, [values], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal sadsadssadsdsa Error");
        }
  
        return res.json("Post has been created");
      });
    });
  };

  export const getpersonaldata = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      console.error("Not authenticated!");
      return res.status(401).json("Not authenticated!");
    }
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) {
        console.error("Token is not valid!", err);
        return res.status(403).json("Token is not valid!");
      }
  
      const uid = userInfo.id;
      
      
      const q = "SELECT * FROM personaldata WHERE uid = ?";
      db.query(q, [uid], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal Server Error");
        }
  
        console.log("Query result:", data);
        return res.status(200).json(data);
      });
    });
  };

  export const getpersonalmeals = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      console.error("Not authenticated!");
      return res.status(401).json("Not authenticated!");
    }
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) {
        console.error("Token is not valid!", err);
        return res.status(403).json("Token is not valid!");
      }
  
      const uid = userInfo.id;
      const todayDate = moment().format("YYYY-MM-DD HH");
      
      const q = "SELECT * FROM diets WHERE uid = ? AND DATE_FORMAT(Date, '%Y-%m-%d %H') = ?";
      db.query(q, [uid, todayDate], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal Server Error");
        }
  
        console.log("Query result:", data);
        return res.status(200).json(data);
      });
    });
  };


  export const getpersonalmealsfortrack = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      console.error("Not authenticated!");
      return res.status(401).json("Not authenticated!");
    }
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) {
        console.error("Token is not valid!", err);
        return res.status(403).json("Token is not valid!");
      }
  
      const uid = userInfo.id;
      
      
      const q = "SELECT * FROM diets WHERE uid = ?";
      db.query(q, [uid], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal Server Error");
        }
  
        console.log("Query result:", data);
        return res.status(200).json(data);
      });
    });
  };

  export const getcalory = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = "SELECT calory FROM personaldata WHERE uid = ?";

      db.query(q, [userInfo.id], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json("Internal Server Error");
        }

        if (data.length > 0) {
          // If data is found, return the calory value
          return res.json({ calory: data[0].calory });
        } else {
          // If no data is found, you might want to handle this case accordingly
          return res.status(404).json("Calory data not found for the user");
        }
      });
    });
  };



 