import { PaymentMap } from '../models/payment_map';
import { PaymentMapValues } from '../models/payment_map_values';
import { Revenue } from '../models/revenue';

export async function payment_record(body: any) {
    try {
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}