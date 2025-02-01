// import bcrypt, { hash } from 'bcrypt';

// const UserSignUp = async (req , res , sql) =>{
//     const{name , email , password} = req.body;
//     try {
//         // Check if user exists
//         const userPresent = await sql `SELECT * FROM users WHERE email = ${email}`;
//         if(userPresent[0]){
//             return res.status(200).json({'already_present' : true});
//         }

//         const hashedPassword = await bcrypt.hash(password,10);
//         const result = await sql `INSERT INTO users (name,email,password) VALUES (${name},${email},${hashedPassword})`;
//         return res.status(200).json({'already_present' : false});

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Server error during signup' });
//     }
// }

// const UserLogin = async (req, res, sql) => {
//     const { email, password } = req.body;
//     try {
//         // Check if user exists
//         const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        
//         if (!user[0]) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'User not found' 
//             });
//         }

//         // Verify password
//         const validPassword = await bcrypt.compare(password, user[0].password);
        
//         if (!validPassword) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid password' 
//             });
//         }

//         // Successful login
//         return res.status(200).json({
//             success: true,
//             user: {
//                 name: user[0].name,
//                 email: user[0].email
//             }
//         });

//     } catch (error) {
//         console.error('Login error:', error);
//         return res.status(500).json({ 
//             success: false, 
//             message: 'Server error during login' 
//         });
//     }
// }

// export { UserSignUp, UserLogin };