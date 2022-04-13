import Card from './Card';
import classes from './CardColumn.module.css';

const CardColumn:React.FC<{label: string, cardItems: {detail: string}[] }> = (props) => {
    const { label, cardItems } = props;

    return (
        <div className={classes['card-column']}>
            {label && <h4>{label}</h4>}
            <section>
                {
                    cardItems.map( cardItem=> (
                        <Card>{cardItem.detail}</Card>
                    ))
                }
            </section>
            <div>
                <button>Add Card</button>
            </div>
        </div>
    )
}

export default CardColumn;