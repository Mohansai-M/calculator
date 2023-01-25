import { ACTIONS } from "./Calci";

export default function OperationButton({dispatch,operation})
{
    console.log(operation)
    return(
        <>
        <button className="OP_Item" onClick={() =>
        dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>
            {operation}
        </button>
    </>)
}