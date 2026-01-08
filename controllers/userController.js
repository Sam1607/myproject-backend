const usersData = [
    { id: 1, name: 'Alice',email:"shubhamtrivedi@gmail.com" },
    { id: 2, name: 'Bob',email:"ssamiai@gmail.com "},
    { id: 3, name: 'Charlie',email:"ajay@gmail.com" }
];  


const getUsers = async (req,res) => {
    await res.json({
        success:true,
        data:usersData
    })
   
}

const createUsers = async(req,res) => {
    const {name,email} = req.body;

    if(!name || !email){
        return res.status(400).json({
            status:false,
            message:"Please provide name and email"
        })
    }

    const newUser = {
        id: usersData.length + 1,
        name,
        email
    }

    usersData.push(newUser)

    await res.status(201).json({
        success:true,
        data:newUser
    })
}

const editUser = async(req,res) => {
    const {id } = req.params;
    const {name,email} = req.body;

    if(!name || !email){
        res.status(400).json({
            status:false,
            message:"Please provide name and email"
        })
    }   
    
    const userIndex = usersData.findIndex(user => user.id === parseInt(id));

    if(userIndex === -1){
        res.status(404).json({
            status:false,
            message:"User not found"   
        })
    }

    usersData[userIndex] = {
        id: parseInt(id),
        name,
        email                
    }

    await res.status(200).json({
        success:true,
        data:usersData[userIndex]
    })
    }

    const deleteUser = async (req,res) => {
        const {id} = req.params;

        const userIndex = usersData.findIndex(user => user.id === parseInt(id));
        const deletedUser = usersData.splice(userIndex,1);

        if(userIndex === -1){
            res.status(404).json({
                status:false,
                message:"User not found"   
            })
                }

                res.status(200).json({
                    success:true,
                    data:deletedUser
                })


    }

module.exports = {getUsers,createUsers,editUser,deleteUser}