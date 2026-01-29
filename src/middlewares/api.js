export const apiMiddleWare = (store) => (next) => (action)=>{
    if(action.type === "API_REQUEST"){
        console.log("============payload",action.payload)
        let {apiURL,onSuccess,onError} = action.payload;

        try {
            const callApi = async(apiURL)=>{
                console.log("==========inside callAPI")
                try {
                const apiResponse = await fetch(apiURL);
                const data = await apiResponse.json();
                console.log("============apiResponse",data);
                } catch (error) {
                    console.log("=============error",error)
                }
            }
            callApi('http://localhost:3001/todos');
        } catch (error) {
            
        }
       

        // const callApi = async(apiURL)=>{
        //     console.log("==========inside callAPI")
        //     try {
        //     const apiResponse = await fetch(apiURL);
        //     const data = await apiResponse.json();
        //     console.log("============apiResponse",data);
        //     } catch (error) {
        //         console.log("=============error",error)
        //     }
        // }
        // callApi('http://localhost:3001/todos');
        
    }
    return next(action);
}