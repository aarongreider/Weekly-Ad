import { useState } from 'react';
import { Product } from '../../constants';
import { useStore } from '../../store';
import { dupeCheck } from '../../utils';

interface props {
    item: Product,
    menu: string
}

export function AddButton({ item, menu }: props) {
    const shoppingList = useStore((state) => state.shoppingList);
    const [checked, setChecked] = useState<Boolean>(dupeCheck(item.id, shoppingList)) 
    const addItemToList = useStore((state) => state.addItemToList);

    const openMenu = (e: React.MouseEvent) => {
        // @ts-ignore
        const container = e.target.parentElement.parentElement.querySelector('.menuItemContainer')
        container.classList.toggle("flex")
        container.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return <>
        {/* ADD TO LIST BUTTON */}
        {menu == 'parent' &&
            <p className="buttonInline seeMenuButton" onClick={openMenu}>
                <span className="material-symbols-outlined">read_more</span>See Related Items
            </p>
        }
        <p className={`buttonInline add ${menu == 'parent' && 'lower'} ${checked && 'padding1'}`} onClick={() => { addItemToList(item); setChecked(true) }}>
            {checked ? <span className="material-symbols-outlined">check_circle</span> : <>
                <span className="material-symbols-outlined">add_circle</span>Add to List</>}
        </p>
    </>
}