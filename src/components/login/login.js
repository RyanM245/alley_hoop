import React, {useState} from 'react'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [proPic, setProPic] = useState("")
    const [newUser, setNewUser] = useState(false)


    return(
        <div>
            <h1>This is the Login page</h1>
        </div>
    )
}

export default Login


