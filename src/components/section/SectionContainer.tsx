import { useEffect, useState } from 'react'
import '../../styles/App.css'
import { Product } from '../../constants';
import { parseAdItem } from '../../utils';
import Card from '../card/Card';
import './section.css'
import leavesImg from '../../assets/leaves.png'
import CardMenu from '../card/CardMenu';

interface props {
  sectionProducts: any[];
  sectionTitle: string;
  tagline: string;
}

function SectionContainer(props: props) {
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    let sectionItems = props.sectionProducts[1].map((sectionItem: any) => {
      return parseAdItem(sectionItem)
    });
    //console.log('setting section items', sectionItems)

    setProducts(sectionItems)
  }, [props.sectionProducts])

  const getAdjacentMenuItems = (index: number) => {
    let menuItems: Product[] = [];

    if (products) {
      let isMenu = true;
      let indexMod = 1
      while (isMenu && (index + indexMod < products.length)) {
        let tempItem = products[index + indexMod]
        isMenu = (tempItem.menu == 'menu')
        isMenu && menuItems.push(tempItem)
        indexMod++;
      }
    }
    return menuItems;
  }

  return <>
    <div className='section'>
      <div className='sectionHeader'>

        <div className="taglineContainer">
          <h2 className="tagline" style={{ textTransform: 'capitalize' }}>{props.tagline}</h2>
          <div className="overhang"></div>
        </div>
        <h1 className="title" style={{ textTransform: "capitalize" }}>{props.sectionTitle.toLowerCase()}</h1>
        <img className="headerImg" src={leavesImg} />
      </div>

      {products && products.map((item, index) => {
        if (item.menu == "menu") {
          return
        }

        let menuItems: Product[] = [];
        if (item.menu == "parent") {
          menuItems = getAdjacentMenuItems(index);
          return <>
            <div className="menuContainer">
              <Card key={item.id} item={item}></Card>

              <div className="menuItemContainer">
                {menuItems && menuItems.map((menuItem) => {
                  return <>
                    <CardMenu key={item.id} item={menuItem}></CardMenu>
                  </>
                })}
                <div className="menuSpacer"></div>
              </div>
            </div>
          </>
        }


        return <Card key={index} item={item}></Card>
      })}
    </div>
  </>
}

export default SectionContainer