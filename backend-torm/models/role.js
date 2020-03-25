var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Role",
    columns: {
        id: { primary: true, type: Number, generated: true },
        role_name: { type: String },
    }
});