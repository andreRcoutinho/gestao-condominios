var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "ServiceType",
    columns: {
        id: { primary: true, type: Number, generated: true },
        service_type: { type: String }
    }
});