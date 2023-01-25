import { ACTIONS } from "./Calci"

export default function DigitButton({dispatch,digit})
{
    return (
    <>{
        (digit>0 || digit===".")?
        <button className="button_Item" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
        {digit}
        </button>:
         <button className="button_Item Zero_Item" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
        {digit}
        </button>}
    </>)
}