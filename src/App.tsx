import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import { groupByKey } from './utils';
import { AD_ITEM_KEYS, API_URL } from './constants';
import SectionContainer from './components/section/SectionContainer';
import Toolbar from './components/toolbar/Toolbar';
import ShoppingList from './components/shopList/ShoppingList';

function App() {
  const [sections, setSections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeGroup, setActiveGroup] = useState<any[]>([]);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false)
  const printRef = useRef(null);


  useEffect(() => {
    console.log(categories)
  }, [categories])
  useEffect(() => {
    console.log(sections)
  }, [sections])

  /* LOAD AD DATA */
  useEffect(() => {
    console.log("Loading ad data");
    try {
      fetch(API_URL)
        .then(response => {
          // check the network connection
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then(response => {
          // process JSON here
          response = response.data[0]["10-02-23"];
          //console.log(response)

          // set all state variables for rendering below
          setSections(groupByKey(AD_ITEM_KEYS.section, response))
          setCategories(groupByKey(AD_ITEM_KEYS.category, response))
          setActiveGroup(groupByKey(AD_ITEM_KEYS.section, response))
        })
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, [])

  /* BRUTE FORCE CLEAR RANDOM ASS CLASSES GETTING ADDED FROM ROGUE JQUERY IN FIREFOX */
  useEffect(() => {
    console.log('v 1.0')
    let  tags = ["jcf-select", "jcf-unselectable", "jcf-select-toolbarButton", "jcf-drop-active", "jcf-drop-flipped, jcf-select-opener, jcf-select-text"]
    tags.forEach(tag => {
      let elements = document.getElementsByClassName(tag)
      Array.from(elements).forEach(element => {
        element.remove()
        console.log(`DELETING ${element.outerHTML}`)
      });
    });

    tags = ["jcf-hidden"]
    tags.forEach(tag => {
      let elements = document.getElementsByClassName(tag)
      Array.from(elements).forEach(element => {
        element.classList.remove(tag)
        console.log(`REMOVING ${tag} from ${element.outerHTML}`)
      });
    });
  }, [])


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
      <span className="jcf-select jcf-unselectable jcf-select-toolbarButton jcf-drop-active jcf-drop-flipped"><span className="jcf-select-text"><span className="">All Categories</span></span><span className="jcf-select-opener"></span></span>

      <div id="ad" >
        <ShoppingList visible={listIsOpen} printRef={printRef} closeList={handleToggleList}></ShoppingList>
        {activeGroup && Object.entries(activeGroup).map((group, index) => {
          return <SectionContainer key={index} sectionProducts={group} sectionTitle={group[0]} tagline={group[1][0][AD_ITEM_KEYS.tagline]}></SectionContainer>
        })}
      </div>

      <Toolbar printRef={printRef} openList={handleToggleList} sections={getKeys(sections)} categories={getKeys(categories)} groupSelect={handleGroupSelect}></Toolbar>
    </>
  )
}

export default App