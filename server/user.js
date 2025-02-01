import bcrypt, { hash } from 'bcrypt';
const UserSignUp = async (req , res , sql) =>{
    const{name , email , password} = req.body;
    try {
        
        // Check if the user is already present
        const userPresent = await sql `SELECT * FROM users WHERE email = ${email}`;
        if(userPresent[0]){
            return res.status(200).json({'already_present' : true});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await sql `INSERT INTO users (name,email,password) VALUES (${name},${email},${hashedPassword})`;
        
        return res.status(200).json({'already_present' : false});


    } catch (error) {
        console.log(error);
    }
}

export {UserSignUp};