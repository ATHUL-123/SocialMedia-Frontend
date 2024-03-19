import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import  postService from "./postService";
import { logout } from "../auth/authSlice";

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



//Add Post
export const addPost = createAsyncThunk('posts/addPost',
    async (postData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            console.log(token);
            
           const newPost =await postService.uploadPost(postData,token)

           thunkAPI.dispatch(getPost())
           return newPost;
        } catch (error) {
            const message = (
                 error.response &&
                 error.response.data &&
                 error.response.data.message) 
                 || error.message 
                 || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Post
export const getPost = createAsyncThunk('posts/getPost',
    async(_,thunkAPI)=>{
        try{
       
            const token = thunkAPI.getState().auth.user.token
         
            return await postService.getposts(token)
        }catch(error){
            console.log('errror');
            console.log(error.message);
            if (error.status === 401) {
                // Logout user if unauthorized
                thunkAPI.dispatch(logout());
            }
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message) 
                || error.message 
                || error.toString()
           return thunkAPI.rejectWithValue(message)
        }
    }
)


export const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isError=false
            state.isSuccess = false;
            state.message=''
        },
 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addPost.pending,(state)=>{
            state.isLoading = true
          })
          .addCase(addPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.message = action.payload
          })
          .addCase(addPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            
          })
          .addCase(getPost.pending,(state)=>{
            state.isLoading = true
          })
          .addCase(getPost.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.posts=action.payload
          })
          .addCase(getPost.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            
          })

        }
    })

export const {reset} = postSlice.actions
export default postSlice.reducer