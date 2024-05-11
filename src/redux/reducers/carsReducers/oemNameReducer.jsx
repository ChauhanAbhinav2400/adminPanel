

const initialstate={
    OemName:[]
}

 export const OemNameReducer=(state=initialstate,action)=>{
    const {type,payload}=action
     switch (type) {
        case "OEM_NAME": 
          return {
            ...state,OemName:payload
          }
         
        default: return state
            
     }
}