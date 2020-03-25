var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "PaymentMapValues",
    columns: {
        id: { primary: true, type: Number, generated: true },
        value: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        reserve_fund: { type: String }
    },
    relations: {
        payment_map: { target: "PaymentMap", type: "many-to-one" },
    }
});