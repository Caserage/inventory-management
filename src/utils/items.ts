import { getItems, updateItem } from "../service/item";
import InventoryItem from "../types/InventoryItem";

function getItemIndex(items: InventoryItem[], item: InventoryItem) {
  const index = items.findIndex((arrayItem) => {
    return arrayItem._id === item._id;
  });

  return index;
}

function getCheckedItems(items: InventoryItem[]) {
  return items.filter((item) => {
    return item.checked;
  });
}

async function updateItems(items: InventoryItem[], subtract: boolean = false) {
  await Promise.all(
    items.map(async (item) => {
      const { _id: id, serial, description, count, list } = item;

      getItems({ list, query: `serial:${serial}` }).then(({ data }) => {
        if (data.length <= 0) throw new Error("Item does not exist in db");

        const modifiedCount = subtract
          ? data[0].count - count
          : data[0].count + count;

        return updateItem(id, {
          serial,
          description,
          count: modifiedCount,
          list,
        });
      });
    })
  );
}

export { getItemIndex, getCheckedItems, updateItems };
