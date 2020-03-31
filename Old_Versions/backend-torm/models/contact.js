var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Contact",
    columns: {
        id: { primary: true, type: Number, generated: true },
        phone_number: { type: String },
    },
    relations: {
        user: { target: "User", type: "many-to-one", joinTable: true },
        supplier: { target: "Supplier", type: "many-to-one", joinTable: true },
    }
});