import axios from 'axios'

const API_URL ='/api/users'
const BASE_URL ='http://localhost:7002'


//Login user
const userLogin = async (data)=>{
    const response = await axios.post(BASE_URL+API_URL+'/login',data)
    if(response.data){
        console.log('settedd');
        localStorage.setItem('user',JSON.stringify(response.data.user))
    }
    return response.data
}



const authService ={

    userLogin,
  

}

export default authService