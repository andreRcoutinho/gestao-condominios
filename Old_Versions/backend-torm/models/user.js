var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    columns: {
        id: { primary: true, type: Number, generated: true },
        first_name: { type: String },
        last_name: { type: String },
        IBAN: { type: String },
        NIF: { type: String }
    },
    relations: {
        role: { target: "Role", type: "one-to-one", joinColumn: true },
        contacts: { target: "Contact", type: "one-to-many"},
        user_password: { target: "UserPassword", type: "one-to-one", joinColumn: true },
        units: { target: "Unit", type: "many-to-many", joinTable: true }
    }
});