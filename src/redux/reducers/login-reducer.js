

export const LoginReducers = (state ={userInfo:null},action)=>{
    const {type,payload} = action;
    switch(type){
    case "LOGIN_DATA":
        return {
            ...state,userInfo:payload
        }
        default:return state;
    }
    }