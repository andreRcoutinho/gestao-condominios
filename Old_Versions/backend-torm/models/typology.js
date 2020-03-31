var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Typology",
    columns: {
        id: { primary: true, type: Number, generated: true },
        typology: { type: String },
    }
});