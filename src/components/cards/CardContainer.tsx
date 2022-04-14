
import React, { MutableRefObject, useContext, useRef } from 'react';
import CardContext from '../../store/card-context';
import CardColumn from '../UI/CardColumn';
import classes from './CardContainer.module.css';



const CardContainer = () => {
    const cardCtx = useContext(CardContext);
    const inputRef = useRef(null) as MutableRefObject<HTMLInputElement>;

    const onAddCardHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
       cardCtx.addCard(id,{})
    }

    const onAddColumn = () => {
        if(!inputRef.current.value.trim().length) {
            return;
        }
        cardCtx.addColumn(inputRef.current.value);
        inputRef.current.value = null;
    }

    return <div className={classes['card-container']}>
        <div className={classes['add-column']}>
            <input id='addColumnLabel' role='input' type='text' placeholder='add colum name' maxLength={15} ref={inputRef} />
            <button id='addColumnBtn' onClick={onAddColumn}>Add Column</button>
        </div>
        <section className={classes['card-list']}>
            {
                cardCtx.columns.map( col => (
                    <CardColumn label={col.label} key={col.id} colId={col.id} cardItems={col.cards} onAddCard={onAddCardHandler} />
                ))
            }
        </section>
    </div>
}

export default CardContainer;