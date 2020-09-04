"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      let totalCost = 0;
      let quantityItems = 0;
      data.items.forEach(item => {
        totalCost += item.cost;
        quantityItems += item.quantity;
      });
      data.totalCost = totalCost;
      data.quantityItems = quantityItems;
    },

    async beforeUpdate(params, data) {
      const listData = await strapi.api.list.services.list.findOne(params);
      let totalCost = listData.totalCost;
      let quantityItems = listData.quantityItems;
      if (data.items) {
        data.Items.forEach(item => {
          totalCost += item.cost;
          quantityItems += item.quantity;
        });
      }
      data.totalCost = totalCost;
      data.quantityItems = quantityItems;
    }
  }
};
