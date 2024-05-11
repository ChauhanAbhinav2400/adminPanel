

const initialstate={
    modelName:[]
}

 export const ModelNameReducer=(state=initialstate,action)=>{
    const {type,payload}=action
     switch (type) {
        case "CAR_MODEL_NAME": 
          return {
            ...state,modelName:payload
          }
         
        default: return state
            
     }
}