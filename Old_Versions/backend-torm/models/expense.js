var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Expense",
    columns: {
        id: { primary: true, type: Number, generated: true },
        value: { type: String },
        description: { type: String },
        payment_date: { type: Date }
    },
    relations: {
        supplier: { target: 'Supplier', type: 'many-to-one', joinTable: true }
    }
});