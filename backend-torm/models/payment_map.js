var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "PaymentMap",
    columns: {
        id: { primary: true, type: Number, generated: true },
        name: { type: String },
        description: { type: String }
    },
    relations: {
        revenue: { target: "Revenue", type: "many-to-one" },
        payment_map_values: { target: "PaymentMap", type: 'one-to-many' }
    }
});