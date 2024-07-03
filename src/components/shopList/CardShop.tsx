import { useEffect, useState } from 'react'
import '../../styles/App.css'
import { Product } from '../../constants';
import '../card/card.css'
import './cardShop.css'
import { useStore } from '../../store';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface props {
    item: Product;
}

function CardShop({ item }: props) {
    const setQuantity = useStore((state) => state.setItemQuantity);
    const removeItem = useStore((state) => state.removeItemFromList);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    useEffect(() => {
        item.quantity < 1 && setTimeout(() => {
            (removeItem(item.id))
        }, 500);
    }, [item.quantity])

    return <>

        <div className="card--shop" ref={setNodeRef} style={style} {...attributes}>
            {item.menu != 'menu' ? <img src={item.image} /> : undefined}
            <div className="cardTextContainer">
                <h2>{item.description}</h2>
                <p>{item.price}</p>
                <span className="material-symbols-outlined button deleteButton" onClick={() => removeItem(item.id)}>delete</span>
                <div className="quantityControls">
                    <span className="material-symbols-outlined quantityButton quantitySubtract" onClick={() => setQuantity(item.id, item.quantity - 1)}>do_not_disturb_on</span>
                    <span className="quantity">{item.quantity}</span>
                    <span className="material-symbols-outlined quantityButton quantityAdd" onClick={() => setQuantity(item.id, item.quantity + 1)}> add_circle </span>
                </div>
            </div>
            <span className="material-symbols-outlined dragIcon" {...listeners}>drag_indicator</span>
        </div>
    </>
}

export default CardShop