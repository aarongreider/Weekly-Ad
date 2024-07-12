import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import { groupByKey } from './utils';
import { AD_ITEM_KEYS, Product } from './constants';
import SectionContainer from './components/section/SectionContainer';
import Toolbar from './components/toolbar/Toolbar';
import ShoppingList from './components/shopList/ShoppingList';
import Firebase from './Firebase';

function App() {
  const [sections, setSections] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Product[]>([]);
  const [activeGroup, setActiveGroup] = useState<Product[]>([]);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false)
  const printRef = useRef(null);


  useEffect(() => {
    console.log("Loading ad data v1.7");
    console.log(categories)
  }, [categories])
  useEffect(() => {
    console.log(sections)
  }, [sections])

  const handleData = (response: any) => {

    function parseDate(dateStr: string): Date {
      const [month, day, year] = dateStr.split('-').map(Number);
      return new Date(year + 2000, month - 1, day); // Adjust year to be 2000+
    }

    // get the most recent version of the ad procedurally or manually with the target date
    let targetDate = parseDate("10-02-23"); // toggle this line or the next to manually set or procedurally set
    /* let targetDate = new Date(); */

    const dates = response.data.map((item: string) => Object.keys(item)[0]);
    let closestDate = dates[0];
    let minDiff = Math.abs(parseDate(dates[0]).getTime() - targetDate.getTime());

    dates.forEach((dateStr: string) => {
      const date = parseDate(dateStr);
      const diff = Math.abs(date.getTime() - targetDate.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closestDate = dateStr;
      }
    });
    console.log(`Closest date: ${closestDate}`)


    response = response.data[0][`${closestDate}`];

    // set all state variables for rendering below
    setSections(groupByKey(AD_ITEM_KEYS.section, response))
    setCategories(groupByKey(AD_ITEM_KEYS.category, response))
    setActiveGroup(groupByKey(AD_ITEM_KEYS.section, response))
  }

  const handleGroupSelect = (group: string) => {
    if (group == "All Sections") {
      setActiveGroup(sections)
      return
    }
    if (group == "All Categories") {
      setActiveGroup(categories)
      return
    }

    let vals, newGroup

    // @ts-ignore
    vals = sections[`${group}`]
    if (vals) {
      newGroup = { [`${group}`]: vals }
      // @ts-ignore
      setActiveGroup(newGroup)
      return
    }

    // @ts-ignore
    vals = categories[`${group}`]
    if (vals) {
      newGroup = { [`${group}`]: vals }
      // @ts-ignore
      setActiveGroup(newGroup)
      return
    }
  }

  const getKeys = (obj: any) => {
    return Object.entries(obj).map((item) => {
      return item[0]
    })
  }

  const handleToggleList = () => {
    const bool = !listIsOpen
    setListIsOpen(bool)
  }


  return (
    <>
      <Firebase handleData={handleData}></Firebase>
      <div id="ad" className='jcf-ignore' style={{ margin: 0, padding: 0, gap: '18px', display: 'flex', flexDirection: 'column', }}>
        <ShoppingList visible={listIsOpen} printRef={printRef} closeList={handleToggleList}></ShoppingList>
        {activeGroup && Object.entries(activeGroup).map((group, index) => {
          //@ts-ignore
          return <SectionContainer key={index} sectionProducts={group} sectionTitle={group[0]} tagline={group[1][0][AD_ITEM_KEYS.tagline]}></SectionContainer>
        })}
      </div>

      <Toolbar printRef={printRef} openList={handleToggleList} sections={getKeys(sections)} categories={getKeys(categories)} groupSelect={handleGroupSelect}></Toolbar>
    </>
  )
}

export default App