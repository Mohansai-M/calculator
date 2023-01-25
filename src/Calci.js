import "./style.js";
import DigitButton from "./DigitButton.js";
import { MyBox } from "./style.js";
import { useReducer } from "react";
import "./Calci.css";
import OperationButton from "./OperationButton.js";

  export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
  }



  function reducer(state, { type, payload }) {
    // eslint-disable-next-line default-case
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite)
        {
          return {
          ...state,
          currentOperand:payload.digit,
          overwrite:false, 
        }
        }
        if(payload.digit === "0" && state.currentOperand === "0") 
        {
          return state
        }
        if(payload.digit === '.' && state.currentOperand!== undefined && state.currentOperand.includes('.')) {
             return state;
          }
        return {
          ...state,
          currentOperand:`${state.currentOperand|| ""}${payload.digit}`,
        }

        case ACTIONS.CHOOSE_OPERATION:
          if(state.currentOperand == null && state.previousOperand == null)
          {
            return state
          }

          if(state.currentOperand == null)
          {
            return {
              ...state,
              operation:payload.operation,

            }
          }
          if(state.previousOperand == null)
          {
            return {
              ...state,
              operation:payload.operation,
              previousOperand:state.currentOperand,
              currentOperand:null,
            }
          }

          return {
            ...state,
            previousOperand:evaluate(state),
            operation:payload.operation,
            currentOperand:null,
          }

        case ACTIONS.CLEAR:
          return{}
        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite)
          { return {
            ...state,
            overwrite:false,
            currentOperand: null,
          }
        }
        if(state.currentOperand == null)
        {
          return state
        }
        if(state.currentOperand.length ===1)
        {
          return {...state,currentOperand:null}
        }
        return{
          ...state,
          currentOperand:state.currentOperand.slice(0,-1),

        }
        case ACTIONS.EVALUATE:
          if(
            state.operation == null ||
            state.currentOperand == null ||
            state.previousOperand == null
          )
          {
            return state
          }
          return {
            ...state,
            overwrite :true,
            previousOperand:null,
            operation:null,
            currentOperand:evaluate(state),
          }
  }
} 

function evaluate({currentOperand,previousOperand,operation})
  {
     const prev = parseFloat(previousOperand);
     const curr = parseFloat(currentOperand);
     if(isNaN(prev) || isNaN(curr))
     {
      return ""
     }
     let computaion =""
     switch (operation) {
       case "+":
         computaion = prev + curr;
         break;
       case "-":
         computaion = prev - curr;
         break;
       case "×":
         computaion = prev * curr;
         break;
       case "÷":
         computaion = prev / curr;
         break;
       default:
       ////
     }
     return computaion.toString()
  }
function Calci() {
  const numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
   const [{ currentOperand, previousOperand, operation }, dispatch] =
     useReducer(reducer, {});

  return (
    <div className="Calci_Container">
      <MyBox>
        <div className="Calci_Field">
            <div className="prev-operand">
              {formatOperand(previousOperand)} {operation}
            </div>
            <div className="curr-operand">{formatOperand(currentOperand)}</div>
        </div>
        <div className="operations">
          <div className="Extra_Grid">
            <button
              className="Extra_Item"
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >
              CLEAR
            </button>
            <button
              className="Extra_Item"
              onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            >
              Del
            </button>
            <OperationButton operation="÷" dispatch={dispatch} />
          </div>
          <div className="buttons_Grid">
            <div className="number_Grid">
              {numList.map((operand) => (
                <DigitButton digit={operand} dispatch={dispatch} />
              ))}
            </div>
            <div className="Operation_Grid">
              <OperationButton operation="-" dispatch={dispatch} />
              <OperationButton operation="+" dispatch={dispatch} />
              <OperationButton operation="×" dispatch={dispatch} />
              <button className="button_Item Equals_OP" operation="="  onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
                =
              </button>
            </div>
          </div>
        </div>
      </MyBox>
    </div>
  );
}

export default Calci;
