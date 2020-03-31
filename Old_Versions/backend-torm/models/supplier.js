var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Supplier",
    columns: {
        id: { primary: true, type: Number, generated: true },
        first_name: { type: String },
        last_name: { type: String },
        company_name: { type: String },
        IBAN: { type: String },
        NIF: { type: String }
    },
    relations: {
        expenses: { target: "Expense", type: "one-to-many", joinTable: true },
        contacts: { target: "Contact", type: "one-to-many", joinTable: true },
        service_type: { target: "ServiceType", type: "many-to-many", joinTable: true }
    }
});