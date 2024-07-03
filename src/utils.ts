import { AD_ITEM_KEYS, Product } from "./constants";

export function groupByKey(key: string, arr: any[]) {
    // take in the json response and return an object containing each section as an array of items in that section

    const groupedData: any = {};

    // Loop through the data and group by the "SECTION" column
    arr.forEach(item => {

        const group = item[`${key}`];

        // If the section doesn't exist in the groupedData object, create it
        if (!groupedData[group]) {
            groupedData[group] = [];
        }

        // Add the item to the corresponding section
        groupedData[group].push(item);
    });

    return groupedData;

}

export function parseAdItem(obj: any): Product | null {
    // this method is mostly for type safety
    // return new <Product> from a object of keys and values

    let badgesStr: string = obj[`${AD_ITEM_KEYS.badges}`];
    try {
        const adItem: Product = {
            page: obj[`${AD_ITEM_KEYS.page}`],
            block: obj[`${AD_ITEM_KEYS.block}`],
            section: obj[`${AD_ITEM_KEYS.section}`],
            tagline: obj[`${AD_ITEM_KEYS.tagline}`],
            menu: obj[`${AD_ITEM_KEYS.menu}`],
            brand: obj[`${AD_ITEM_KEYS.brand}`],
            description: obj[`${AD_ITEM_KEYS.description}`],
            category: obj[`${AD_ITEM_KEYS.category}`],
            price: obj[`${AD_ITEM_KEYS.price}`],
            size: obj[`${AD_ITEM_KEYS.size}`],
            unit: obj[`${AD_ITEM_KEYS.unit}`],
            priceDisplay: obj[`${AD_ITEM_KEYS.priceDisplay}`],
            save: obj[`${AD_ITEM_KEYS.save}`],
            badges: badgesStr ? JSON.parse(badgesStr) : [], // parse this as json
            additional: obj[`${AD_ITEM_KEYS.additional}`],
            instructions: obj[`${AD_ITEM_KEYS.instructions}`],
            image: obj[`${AD_ITEM_KEYS.image}`],
            id: obj[`${AD_ITEM_KEYS.id}`],
            quantity: 1
        };
        return adItem;
    } catch (error) {
        console.error('Error parsing ad item:', error);
        return null;
    }
}

export const handlePrint = (printRef: any) => {
    // i was having significant trouble getting printing to function normally, so i open a new window and inject the DOM elements
    // then auto open a print dialogue
    if (printRef.current) {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'height=600,width=825');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Print</title>');
            // Include stylesheets or inline styles
            printWindow.document.write('<link rel="stylesheet" href="/src/styles/print.css" />'); // Include necessary CSS
            printWindow.document.write('</head><body>');
            printWindow.document.write(printContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        }
    }
};


export function dupeCheck(id: number, list: Product[]): boolean {
    for (const item of list) {
      if (id == item.id) {
        return true
      }
    }
    return false
  }