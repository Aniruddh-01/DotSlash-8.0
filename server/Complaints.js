import { v4 as uuidv4 } from 'uuid';

const submitComplaints = async (req, res, sql) => {
    try {
        const { name, issue_area, summary, state_name, address} = req.body;
        const reference_number = 'POL-' + uuidv4().split('-')[0]; 

        const date = new Date();
        const last_action_date = date.toISOString().split('T')[0]; 
        console.log(last_action_date);
        console.log(name , issue_area , summary);
        console.log(state_name,address);
        const result = await sql `INSERT INTO policies (reference_number, name, issue_area, summary, last_action_date, state_name, address) 
                       VALUES (${reference_number}, ${name}, ${issue_area}, ${summary}, ${last_action_date}, ${state_name}, ${address}) RETURNING *`;

        res.status(201).json({ message: "Policy submitted successfully" });
    } catch (error) {
        console.log(error);
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
        const { reference_number, status, reason } = req.body;
        console.log('Received update request:', { reference_number, status, reason });

        if (!reference_number || !status) {
            return res.status(400).json({ 
                message: 'Reference number and status are required' 
            });
        }

        const response = await sql`
            UPDATE policies 
            SET status = ${status}, 
                reason = ${reason},
                last_action_date = CURRENT_DATE
            WHERE reference_number = ${reference_number}
            RETURNING *
        `;

        console.log('Update response:', response);

        if (response.length === 0) {
            return res.status(400).json({ 
                message: 'Update failed' 
            });
        }

        return res.status(200).json({
            message: 'Policy Updated Successfully',
            policy: response[0]
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            message: 'Server error while updating policy',
            error: error.message 
        });
    }
}

const addPolicyComment = async (req, res, sql) => {
    try {
        const { policyId, comment } = req.body;
        const result = await sql`
            INSERT INTO policy_comments (policy_id, comment)
            VALUES (${policyId}, ${comment})
            RETURNING *
        `;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPolicyComments = async (req, res, sql) => {
    try {
        const { policyId } = req.params;
        const comments = await sql`
            SELECT * FROM policy_comments 
            WHERE policy_id = ${policyId}
            ORDER BY created_at DESC
        `;
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { submitComplaints, getAllComplaints, updatePolicyByAdmin, addPolicyComment, getPolicyComments };
