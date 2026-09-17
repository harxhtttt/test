//code will go here

function matchOrdersToInventory(orders, inventory, discountCodes) {
  let matchedOrders = [];
  let unmatchedOrders = [];
  let appliedDiscounts = [];

  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    let found = false;

    for (let j = 0; j < inventory.length; j++) {
      let item = inventory[j];

      if (order.sku === item.sku && item.quantity > 0) {
        found = true;

        for (let k = 0; k < order.items.length; k++) {
          let orderItem = order.items[k];

          if (inventory.find(inv => inv.sku === orderItem.sku)) {
            let matchingItem = inventory.find(inv => inv.sku === orderItem.sku);
            matchingItem.quantity = matchingItem.quantity - orderItem.qty;
          }
        }

        matchedOrders.push(order);

        if (discountCodes.includes(order.code)) {
          appliedDiscounts.push(order.id);
        }

        break;
      }
    }

    if (!found) {
      unmatchedOrders.push(order);
    }
  }

  return { matchedOrders, unmatchedOrders, appliedDiscounts };
}

module.exports = { matchOrdersToInventory };
