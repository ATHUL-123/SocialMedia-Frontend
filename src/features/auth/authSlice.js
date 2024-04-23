import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


//Get user form localStorage
const user = JSON.parse(localStorage.getItem('user'))
const unVarified = JSON.parse(localStorage.getItem('unVarified'))
const initialState ={
    user:user ? user: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    // isPrivate:user.isPrivate? true : false,
    unVarified:unVarified ? unVarified :'',
    message:''
    
}




//Login user
export const login = createAsyncThunk('auth/login',
async (data,thunkAPI)=>{
  try {
    return await authService.userLogin(data)
  } catch (error) {
    const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
}
)

export const GoogleLogin = createAsyncThunk('auth/googleLogin',
async (data,thunkAPI)=>{
  try {
    return await authService.GoogleUserLogin(data)
  } catch (error) {
    const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
}
)





export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      reset: (state) => {
        state.user = null;
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.unVarified = null;
        state.message = '';
      },
        setReduxUser: (state, action) => {
          state.unVarified = action.payload;
          localStorage.setItem('unVarified',JSON.stringify(action.payload))
        },
        setUser:(state,action)=>{
          state.user = action.payload.updatedUser
          localStorage.setItem('user',JSON.stringify(action.payload.updatedUser))
        },
        logout:(state,action)=>{
          state.user = null
          state.message=''
          state.isError=false
          localStorage.removeItem('user');
        },
        changePrivacy:(state,action)=>{
          state.user.isPrivate = action.payload
          localStorage.setItem('user',JSON.stringify(state.user))
        },
        changeVerify:(state,action)=>{
          state.user.verified = action.payload
          localStorage.setItem('user',JSON.stringify(state.user))
        },
        changeOnline:(state,action)=>{
          state.user.online = action.payload
          localStorage.setItem('user',JSON.stringify(state.user))
        }
    },
    extraReducers:(builder)=>{
        builder
          .addCase(login.pending,(state)=>{
            state.isLoading = true
            state.user =null;
          })
          .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload.user
            state.message=action.payload.message   
          })
          .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload.message    
            state.user=null
          })
          .addCase(GoogleLogin.pending,(state)=>{
            state.isLoading = true
            state.user =null;
          })
          .addCase(GoogleLogin.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload.user
            state.message=action.payload.message   
          })
          .addCase(GoogleLogin.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload.message    
            state.user=null
          })
         
    }
})


export const {reset ,setReduxUser,setUser,changePrivacy,logout,changeVerify,changeOnline} = authSlice.actions
export default authSlice.reducer