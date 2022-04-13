import { Fragment } from "react";
import classes from './Card.module.css';

const Card = (props: any) => {
    return (
       <div className={classes['card-item-container']}>
           {props.children}
       </div>
    );
}

export default Card;