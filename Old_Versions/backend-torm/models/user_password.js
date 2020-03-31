var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "UserPassword",
    columns: {
        id: { primary: true, type: Number, generated: true },
        password_hash: { type: String },
        password_reset_token: { type: String },
        password_expire_date: { type: Date }
    }
});