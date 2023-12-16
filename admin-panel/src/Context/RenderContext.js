import { createContext, useState } from "react";

const RenderContext = createContext();
const RenderContextProvider = ({children}) => {

    const [render,toggleRender] = useState(false); 

    const rerender = () => {
        toggleRender(!render);
    }
     
    
    return <RenderContext.Provider value={{rerender,render,toggleRender}}>
        {children}
    </RenderContext.Provider>
}

export {RenderContext,RenderContextProvider}