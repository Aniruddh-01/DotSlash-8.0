import { v4 as uuidv4 } from 'uuid';

const submitComplaints = async (req, res, sql) => {
    try {
        const { name, issue_area, summary , state_name , address } = req.body;
        const reference_number = 'POL-' + uuidv4().split('-')[0]; 

        const date = new Date();
        const last_action_date = date.toISOString().split('T')[0]; 
        console.log(last_action_date);
        console.log(name , issue_area , summary);

        const result = await sql `INSERT INTO policies (reference_number, name, issue_area, summary, last_action_date , state_name , address) 
                       VALUES (${reference_number}, ${name}, ${issue_area}, ${summary}, ${last_action_date} , ${state_name} , ${address}) RETURNING *`;

        res.status(201).json({ message: "Policy submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllComplaints = async(req,res,sql)=>{
    try {
        const response = await sql `SELECT * FROM policies`;
        return res.status(200).json({'policies_arr' : response})
    } catch (error) {
        
    }
}

const updatePolicyByAdmin = async(req,res,sql) => {
    try {
        const { reference_number , status , reason } = req.body;
        const response = await sql `UPDATE policies SET status = ${status}, reason = ${reason} WHERE reference_number = ${reference_number}`;

        return res.status(200).json({'message' : 'Policy Updated Successfully'});
    } catch (error) {
        console.log(error);
    }
}


export { submitComplaints , getAllComplaints , updatePolicyByAdmin };
