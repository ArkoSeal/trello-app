
import React, {useReducer} from 'react';
import { CardState, ReducerAction } from '../models/card.model';


const CardContext = React.createContext({
    columns: [{id: '',label: '', cards: [{id: '', detail:''}]}],
    addCard: (colName: string, data: any) => {},
    updateCard: (colName: string, data: any) => {},
    addColumn: (label: string) => {},
    moveCard: (cardId: string, currentColId: string, destinationColId: string) => {}
});


const defaultCardState = {
    columns: []
}

try {
    const persistedData = localStorage.getItem("trello_store");
    if (persistedData) {
      const temp = JSON.parse(persistedData);
      defaultCardState.columns = [...temp ];
    }
  } catch (error) {
    console.log("No persisted data from local storage");
}

const cardReducer = (state: CardState, action: ReducerAction) => {
    
    if(action.type === 'ADD_CARD') {
        const existingCardItemIndex = state.columns.findIndex(item => item.id ===action.value.colId);
        let updatedItems = [...state.columns];
        updatedItems[existingCardItemIndex].cards.push({id: `card-${new Date().toISOString()}` , detail: action.value.value || ''});
        localStorage.setItem('trello_store', JSON.stringify(state.columns))
        return {
            columns: updatedItems
        }
    } else if(action.type === 'UPDATE_CARD') {
        const existingCardItemIndex = state.columns.findIndex(item => item.id ===action.value.colId);
        let updatedItems = [...state.columns];
        updatedItems[existingCardItemIndex].cards.find( card => {
            if( card.id === action.value.cardData.id) {
                card.detail = action.value.cardData.value;
            }
        })
        localStorage.setItem('trello_store', JSON.stringify(state.columns))
        return {
            columns: updatedItems
        }
    } else if (action.type === 'ADD_COL') {
        const colObj = { id: new Date().toISOString(), label: action.value.label as string, cards: []}
        state.columns.push(colObj);
        localStorage.setItem('trello_store', JSON.stringify(state.columns))
        return {
            columns: state.columns
        }
    }
    else if (action.type === 'MOVE_CARD') {
        const currentColumn = state.columns.findIndex(item => item.id === action.value.currentColId);
        const targetColumn = state.columns.findIndex(item => item.id === action.value.destinationColId);

        let updatedItems = [...state.columns];

        const cardData =  updatedItems[currentColumn].cards.find( card => card.id === action.value.cardId);

        updatedItems[currentColumn].cards = updatedItems[currentColumn].cards.filter(card => card.id !== action.value.cardId);
        updatedItems[targetColumn].cards.push(cardData);

        localStorage.setItem('trello_store', JSON.stringify(state.columns))
        return {
            columns: state.columns
        }
    }
    return state;
}

export const CardContextProvider = (props: any) => { 

    const [cardState, dispatchCardAction] = useReducer(cardReducer, defaultCardState);

    const addCardHandler = (id: string, cardData: any) => {
        dispatchCardAction({type: 'ADD_CARD', value: {colId: id, cardData: cardData}});
    };

    const updateCardHandler = (id: string, cardData: any) => {
        dispatchCardAction({type: 'UPDATE_CARD', value: {colId: id, cardData: cardData}});
    }

    const addColHandler = ( label: string) => {
        dispatchCardAction({type: 'ADD_COL', value: {label: label}});
        
    }

    const onMoveCardHandler = (cardId, currentColId, destinationColId) => {
        dispatchCardAction({type: 'MOVE_CARD', value: {cardId, currentColId, destinationColId}});
    }

    const contextValue = {
        columns: cardState.columns,
        addCard: addCardHandler,
        updateCard: updateCardHandler,
        addColumn: addColHandler,
        moveCard: onMoveCardHandler
    };
    return <CardContext.Provider value={contextValue}>{props.children}</CardContext.Provider>;
}

export default CardContext;