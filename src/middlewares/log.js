export const errorMiddleWare = (store)=>(next)=>(action)=>{
    if(action.payload && action.payload.error){
        console.error("===there is some error===")
        return;
    }
    return next(action)
}