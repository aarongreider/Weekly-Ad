import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import './toolbar.css'
import { handlePrint } from "../../utils";

interface props {
    sections: string[];
    categories: string[];
    printRef: any;
    groupSelect: (group: string) => void;
    openList: () => void
}

function Toolbar({ sections, categories, printRef, groupSelect, openList }: props) {
    /* this is the toolbar at the bottom of the page for viewing, printing, and filtering */
    const [activeSection, setActiveSection] = useState<string>('All Sections')
    const [activeCategory, setActiveCategory] = useState<string>('All Categories')
    const [sectionWidth, setSectionWidth] = useState<number>()
    const [categoryWidth, setCategoryWidth] = useState<number>()
    const shoppingList = useStore((state) => state.shoppingList);
    const categoryCopycat = useRef<HTMLDivElement>(null);
    const sectionCopycat = useRef<HTMLDivElement>(null);
    const categoryDropdown = useRef<HTMLSelectElement>(null);
    const sectionDropdown = useRef<HTMLSelectElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, group: string) => {
        groupSelect(e.target.value)
        if (group == 'section') {
            setActiveSection(e.target.value)
            categoryDropdown.current ? categoryDropdown.current.selectedIndex = 0 : undefined;
            categoryDropdown.current && setActiveCategory(categoryDropdown.current?.value)
        } else {
            setActiveCategory(e.target.value)
            sectionDropdown.current ? sectionDropdown.current.selectedIndex = 0 : undefined;
            sectionDropdown.current && setActiveSection(sectionDropdown.current?.value)
        }
    }

    useEffect(() => {
        // when active group changes, sync width of the correct select with the copycat's width
        sectionCopycat.current && setSectionWidth(sectionCopycat.current.offsetWidth)
        categoryCopycat.current && setCategoryWidth(categoryCopycat.current.offsetWidth)
    }, [activeCategory, activeSection])


    return <>
        <div id='toolbar'>
            {/* SHOPPING LIST BUTTONS */}
            <div tabIndex={0} className="header toolbarButton" onClick={openList} style={{ order: 3 }}>
                <span className="material-symbols-outlined listIcon">receipt_long</span>
                <h1>View Shopping List</h1>
                <span id="listCounter" className="button">{shoppingList.length}</span>
            </div>

            <span tabIndex={0} className="material-symbols-outlined print toolbarButton" onClick={() => handlePrint(printRef)} style={{ order: 4 }}>print</span>

            {/* SECTION DROPDOWN */}
            <label htmlFor="sectionDropdown">Filter Section</label>

            <div className="copycat toolbarButton" ref={sectionCopycat}>
                <p id="copycatSection">{activeSection.toLocaleLowerCase()}</p>
            </div>

            <div className="filter">
                <select id="sectionDropdown" className="toolbarButton" ref={sectionDropdown} style={{ width: `${sectionWidth && sectionWidth + 20}px` }}
                    onChange={(event) => { handleChange(event, 'section') }}>
                    <option value="All Sections">All Sections</option>
                    {sections.map((section, index) => {
                        return <option key={index} value={section}>{section.toLowerCase()}</option>
                    })}
                </select>
                <span className="material-symbols-outlined">keyboard_arrow_up</span>
            </div>

            {/* CATEGORY DROPDOWN */}
            <label htmlFor="categoryDropdown">Filter Category</label>

            <div className="copycat toolbarButton" ref={categoryCopycat}>
                <p id="copycatCategory">{activeCategory.toLocaleLowerCase()}</p>
            </div>

            <div className="filter">
                <select id="categoryDropdown" className="toolbarButton" ref={categoryDropdown} style={{ width: `${categoryWidth && categoryWidth + 20}px` }}
                    onChange={(event) => { handleChange(event, 'category') }}>
                    <option value="All Categories">All Categories</option>
                    {categories.map((category, index) => {
                        return <option key={index} value={category}>{category.toLowerCase()}</option>
                    })}
                </select>
                <span className="material-symbols-outlined">keyboard_arrow_up</span>
            </div>
        </div>
    </>
}
export default Toolbar