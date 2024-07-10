import '../../styles/App.css'
import { Product } from '../../constants';
import './card.css'
import PriceWidget from './PriceWidget';
import { AddButton } from './AddButton';


interface props {
  item: Product;
  /* addItem: void; */
}

function Card({ item }: props) {
  // const [item, setItem] = useState<AdItem>(item)
  // const [badges, setBadges] = useState<string[]>(item.badges)
  // console.log(getBadgeSrcs(item.badges))


  const getBadgeSrcs = (badges: string[]) => {
    let srcArr: string[] = [];
    if (badges.length > 0) {
      badges.forEach((badge: string) => {
        //console.log(badge)
        switch (badge) {
          case "JJ Badge":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/JJBadge.png")
            break;
          case "Amish":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/Amish.png")
            break;
          case "Ohio Proud":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/OhioProud.png")
            break;
          case "Organic":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/OrganicSeal.png")
            break;
          case "Non GMO":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/NonGMO.png")
            break;
          case "USDA Select":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/USDASelect.png")
            break;
          case "USDA Choice":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/USDAChoice.png")
            break;
          case "USDA Prime":
            srcArr.push("https://aaron.greider.org/Digital-Weekly-Ad/images/badges/USDAPrime.png")
            break;
          /* case "Mix & Match!":
              badgeImgs = badgeImgs + `<img src="https://aaron.greider.org/Digital-Weekly-Ad/images/badges/MixMatch.png">`;
              break; */
          default:
            break;
        }
      })
    }
    //console.log(srcArr)
    return srcArr;

  }

  const containsAlphabet = (str: string) => /[a-zA-Z]/.test(str);
  const openMenu = (e: React.MouseEvent) => {
    // @ts-ignore
    const container = e.target.parentElement.parentElement.parentElement.querySelector('.menuItemContainer')
    container.classList.toggle("flex")
    container.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return <>
    <div className='card'>
      <img src={item.image}></img>

      {/* BADGE CONTAINER */}
      <div className='badgeContainer'>
        {item.badges.length > 0 ?
          getBadgeSrcs(item.badges).map((badgeSrc, index) => {
            return <img key={index} src={badgeSrc} className="badge"></img>
          }) : undefined}
      </div>

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
        {item.priceDisplay == "NORMAL" ? <p className="unit">{containsAlphabet(item.size) ? parseFloat(item.size) : item.size} {item.unit}</p> : undefined}
        {/* {getPriceWidget(price.toString(), item.priceDisplay, item.unit)} */}
        <PriceWidget price={(item.price).toString()} priceDisplay={item.priceDisplay} unit={item.unit} ></PriceWidget>
      </div>

      <AddButton item={item} menu={item.menu}></AddButton>

      {/* ADDITIONAL TEXT */}
      <div className="additionalText">
        {item.additional ? <p >{item.additional}</p> : undefined}
        {item.menu == 'parent' &&
          <p style={{ textDecoration: 'underline', color: "rgb(44 98 193)", cursor: "pointer" }} onClick={openMenu}>
            See Related Items
          </p>
        }
      </div>
    </div>
  </>
}

export default Card