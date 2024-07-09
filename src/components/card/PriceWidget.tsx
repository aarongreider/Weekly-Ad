import '../../styles/App.css'
import './card.css'

interface props {
    price: string;
    priceDisplay: string;
    unit: string;
}

function PriceWidget({ price, priceDisplay, unit }: props) {
    /* 
     * there are three different typographic layouts to display the price of a weekly ad item.  
     *  1. Basic price, dollar sign and decimal
     *  2. Basic price, 0 dollar and cents sign
     *  3. 2 for $3, quantity and dollar amnt
     *  4. % off, basic display
     */

    let formattedString, quantity;
    if (priceDisplay == "SPECIALTY") {
        // splice out any characters preceding the dollar sign ad save them to a new variable called amount. Use regex to splice out / and For in the string
        let indexOfDivider = price.indexOf("/");
        quantity = parseFloat(price.slice(0, indexOfDivider));
        price = price.slice(indexOfDivider + 1, price.length)
    }

    // removes anything that is not a number or a '.'
    formattedString = price.replace(/[^0-9.]/g, '');

    // Parse the numeric string into a floating-point number (e.g., 13.99)
    const floatValue = parseFloat(formattedString);

    // Convert the float value into dollars and cents as integers
    const dollars = Math.floor(floatValue);
    const cents = Math.round((floatValue - dollars) * 100);

    let belowOne = dollars < 1.0;
    let isFree = dollars == 0 && cents == 0;
    let hasPercent = price.includes("%")

    return <>
        {isFree ? <div className="priceContainer">
            <p className="free">FREE</p>
        </div> : hasPercent ? <div className="priceContainer">
            <p className="percentOff">{price}</p>
        </div> : <div className="priceContainer">
            {quantity ? <div className="specialtyAmnt" style={quantity > 9 ? { marginRight: '.3em', textAlign: 'right', /* fontSize: '21px' */ } : undefined}><p><span>{quantity}</span><br />FOR</p></div> : undefined}
            {belowOne ? undefined : <sup style={{ marginTop: '.25em' }}>$</sup>}
            <p className="dollar">{belowOne ? cents : dollars}</p>
            <div>
                {!belowOne && cents != 0 ? <sup>{cents}</sup> : undefined}
                {belowOne ? <sup>¢</sup> : undefined}
                {priceDisplay == "BY WEIGHT" ? <p className="unit" style={{ margin: ' 0 .2em' }}>{unit}</p> : undefined}
            </div>
        </div >}
    </>
}

export default PriceWidget