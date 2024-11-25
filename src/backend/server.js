const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rbac_vrv",
});

// Verify DB connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Login Route
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM all_members WHERE mailId=?";
    const { email, password } = req.body;
  
    db.query(sql, [email], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json("Internal Server Error");
      }
  
      if (data.length > 0) {
        const user = data[0];
        if (user.password !== password) {
          // Incorrect password
          return res.status(401).json("Invalid Credentials");
        }
        if (user.status === "Inactive") {
          // User is inactive
          return res.status(403).json("User is Inactive. Please contact admin.");
        }
        // Valid user
        return res.json({
          message: "Login Successfully",
          role: user.role,
          name: user.name,
        });
      } else {
        // Email not found in the database
        return res.status(404).json("No Records Found");
      }
    });
  });

//View List
app.get('/',(req,res)=>
{
    const sql="SELECT * FROM all_members";
    db.query(sql,(err,result)=>
    {
        if(err) return res.json({Message:"Error insider server"});
        return res.json(result);
    })
})

//Create User
app.post("/create", (req, res) => {
    const sql = "INSERT INTO all_members (name, mailId, password, role) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password,req.body.role];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      return res.status(201).json({ message: "User created successfully", result });
    });
  });


//Read User
app.get('/read/:name',(req,res)=>
    {
        const sql="SELECT * FROM all_members WHERE name=?";
        const name=req.params.name;
        db.query(sql,[name],(err,result)=>
        {
            if(err) return res.json({Message:"Error insider server"});
            return res.json(result);
        })
    })


// Update User
app.put('/edit/:name', (req, res) => {
    const { name } = req.params;
    const { newName, mailId, password, role } = req.body; 
    const sql = "UPDATE all_members SET name=?, mailId=?, password=?, role=? WHERE name=?";
  
    db.query(sql, [newName, mailId, password, role, name], (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json({ Message: "User updated successfully", result });
    });
  });
  
//Delete User
app.delete('/delete/:name', (req, res) => {
    const sql="DELETE FROM all_members WHERE name=?";
    const name=req.params.name;
    db.query(sql, [name], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ Message: "User Deleted successfully", result });
      });
  });

// Update User Status
app.put("/update-status/:name", (req, res) => {
    const { status } = req.body; 
    const { name } = req.params; 
  
    const sql = "UPDATE all_members SET status=? WHERE name=?";
    db.query(sql, [status, name], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).json({ message: "Error inside server" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ message: `User status updated to ${status}` });
    });
  });
  

// Start Server
app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
