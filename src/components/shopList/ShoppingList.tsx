import { useEffect, useState } from "react"
import { useStore } from '../../store';
import CardShop from "./CardShop";
import './shoppingList.css'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { handlePrint } from "../../utils";

interface props {
    visible: boolean;
    printRef: any;
    closeList: () => void;
}

function ShoppingList({ visible, printRef, closeList }: props) {
    const shoppingList = useStore((state) => state.shoppingList);
    const reorderList = useStore((state) => state.reorderList);

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        let sum = 0;
        shoppingList.forEach(item => {
            sum += (sanitizePrice(item.price) * item.quantity)
        });
        setTotal(parseFloat(sum.toFixed(2)))
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList])


    const sanitizePrice = (price: string | number): number => {
        if (typeof price == 'string') {
            let index = price.indexOf('$');
            if (index > -1) {
                return parseFloat(price.slice(index + 1))
            } else {
                return 0
            }
        } else {
            return price;
        }
    }

    const onDragEnd = (event: any) => {
        console.log('onDragEnd', (event));
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }
        const oldIndex = shoppingList.findIndex((user) => user.id == active.id)
        const newIndex = shoppingList.findIndex((user) => user.id == over.id)
        reorderList(oldIndex, newIndex)
    }



    return <>
        <div ref={printRef} className="scrollContainer" style={visible ? { display: "flex" } : { display: "none" }}>
            <div id="listCardContainer">
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={shoppingList} strategy={verticalListSortingStrategy}>
                        {shoppingList.map((item) => {
                            return <>
                                <CardShop item={item} key={item.id}></CardShop>
                            </>
                        })}
                    </SortableContext>
                </DndContext>
            </div>
            <div id="listControls">
                <span id="scrollPrint" className="material-symbols-outlined print" onClick={() => handlePrint(printRef)}>print</span>
                <p id="totalButton">Total: $<span id="total">{total}</span></p>
            </div>
            <span className="material-symbols-outlined button close" onClick={closeList}>close</span>
        </div>

    </>
}

export default ShoppingList