var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Revenue",
    columns: {
        id: { primary: true, type: Number, generated: true },
        month: { type: String },
        payment_date: { type: Date },
        is_paid: { type: Boolean }
    },
    relations: {
        unit: { target: "Unit", type: "many-to-one" },
        payment_map: { target: "PaymentMap", type: 'one-to-many' }
    }
});