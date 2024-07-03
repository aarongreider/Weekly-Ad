import { useState } from 'react'
import '../../styles/App.css'
import { Product } from '../../constants';
import './card.css'
import './cardMenu.css'
import PriceWidget from './PriceWidget';
import { AddButton } from './AddButton';

interface props {
  item: Product;
  /* addItem: void; */
}

function CardMenu({ item }: props) {

  return <>
    <div className='card card--menu'>

      {/* SAVE WIDGET */}
      {item.save ? <div className="save">
        <div className="star">
        </div>
        <p><span>SAVE</span><br />${typeof item.save === "number" ? Number.isInteger(item.save) ? item.save : item.save.toFixed(2) : item.save}</p>
      </div> : undefined}


      {/* TEXT CONTAINER */}
      <div className="cardTextContainer">
        <h3>{item.brand}</h3>
        <h2>{item.description}</h2>
        {item.priceDisplay == "NORMAL" ? <p className="unit">{item.size} {item.unit}</p> : undefined}
        {/* {getPriceWidget(price.toString(), item.priceDisplay, item.unit)} */}
        <PriceWidget price={(item.price).toString()} priceDisplay={item.priceDisplay} unit={item.unit} ></PriceWidget>
      </div>

      {/* ADD TO LIST BUTTON */}
      <AddButton item={item} menu={item.menu}></AddButton>


      {/* ADDITIONAL TEXT */}
      {item.additional ? <p className="additionalText">{item.additional}</p> : undefined}
    </div>
  </>
}

export default CardMenu