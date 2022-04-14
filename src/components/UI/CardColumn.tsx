import { Cards } from '../../models/card.model';
import Card from './Card';
import classes from './CardColumn.module.css';


const CardColumn:React.FC<{
    label: string,
    colId: string,
    cardItems: Cards[], 
    onAddCard: (e: any, l: string) => void }> = (props) => {

    const { label, colId, cardItems } = props;
    
    const onClickHandler = (event:any) => {
        props.onAddCard(event, colId);
    }

    return (
        <div className={classes['card-column']}>
            {label && <h4>{label}</h4>}
            <section>
                {
                    cardItems.map( cardItem=> (
                        <Card key={cardItem.id} colId={colId} id={cardItem.id} detail={cardItem.detail}></Card>
                    ))
                }
            </section>
            <div>
                <button className={classes['add-card-button']} onClick={onClickHandler}>Add Card</button>
            </div>
        </div>
    );
}

export default CardColumn;