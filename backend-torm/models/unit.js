var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Unit",
    columns: {
        id: { primary: true, type: Number, generated: true },
        unit: { type: String },
    },
    relations: {
        typology: { target: "Typology", type: "one-to-one", joinColumn: true },
        revenues: { target: "Revenue", type: 'one-to-many' }
    }
});