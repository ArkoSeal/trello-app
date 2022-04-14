import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import CardContext from "../../store/card-context";
import classes from './Card.module.css';

const Card:React.FC<{
    id: string,
    colId: string,
    detail: string}> = (props) => {

    const {colId, id: cardId, detail} = props;

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    const [defaultValue, setDefaultValue] = useState(detail);
    const cardCtx = useContext(CardContext);

    

    useEffect( () => {
        if(!inputRef.current) {
           return; 
        }
        inputRef.current.focus();
        
    }, [isActive]);

    const onClickHandler = () => {
        setIsActive(true);
    }

    const onBlurHandler = () => {
        setDefaultValue(inputRef.current.value);
        cardCtx.updateCard(colId, {id: cardId, value: defaultValue})
        setIsActive(false);
    }

    const onChangeHandler = () => {
        setDefaultValue(inputRef.current.value);
    }

    const onMoveCardHandler = (event) => {
        let currentCol = colId;
        cardCtx.moveCard(cardId, currentCol, event.target.value);
    }

    const moveCard = (<select onChange={onMoveCardHandler}>
            <option value="">move</option>
            {cardCtx.columns.map((column) => (
            <option
                key={column.id}
                value={column.id.toString()}
                id={column.id.toString()}
            >
                {column.label}
            </option>
            ))}</select>);
    

    return (
       <div className={classes['card-item-container']}>
           {!isActive &&
            <div className={classes['display-card-value']}>
                <div onClick={onClickHandler}>{defaultValue || 'enter card details'}</div>
                <div>{moveCard}</div>
            </div> }
           {isActive && <div className={classes['card-input-container']}>
               <textarea
                rows={3}
                className={classes['card-input']}
                value={defaultValue}
                ref={inputRef}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}/>
            </div>}
       </div>
    );
}

export default Card;