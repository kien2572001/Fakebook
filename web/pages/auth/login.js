import Login from "~/components/auth/Login"
import axios from '~/api/axios'
import {useEffect} from 'react'
function login(){

    useEffect(() => {
        let temp = async () => {
            let res = await axios.get('/web-init')
            console.log(res)
        }
        temp()
    }, [])

    return (
        <div>
            <Login />
        </div>
    );
}

export default login;