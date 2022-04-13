
import CardColumn from '../UI/CardColumn';
import classes from './CardContainer.module.css';

const COLUMNS = [
    {label: 'To Do', cards: [{detail: 'testing card'}, {detail: 'testing card asdasd'}]},
    {label: 'Pending', cards: [{detail: 'testing card 2'}]},
    {label: 'In Progress', cards: [{detail: 'testing card 3'}]}
];

const CardContainer = () => {


    return <div className={classes['card-container']}>
        <section className={classes['card-list']}>
            {
                COLUMNS.map( col => (
                    <CardColumn label={col.label} cardItems={col.cards}/>
                ))
            }
            
        </section>
    </div>
}

export default CardContainer;