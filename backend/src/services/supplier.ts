import { Supplier } from '../models/supplier';
import { Contact } from '../models/contact';
import { ServiceType } from '../models/service_type';
import * as api_errors from '../api/api_errors';


export async function index() { }

export async function show(id: Number) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        let contacts: Contact[] = await Contact.find({ where: { supplierId: supplier.getId() } })
        console.log(contacts);
        console.log(supplier);
        return supplier;
    } catch (error) {
        return error;
    }
}

export async function create(body: any) {
    try {
        let supplier: Supplier = new Supplier(body.first_name, body.last_name, body.company_name, body.email, body.NIF, body.IBAN);
        await supplier.save();

        body.contacts.forEach(async contact => {
            let c: Contact = new Contact(contact, null, supplier);
            await c.save();
        });

        let service_types: ServiceType[] = await ServiceType.findByIds(body.service_types);
        if (service_types) {
            supplier.setService_types(service_types);
            await supplier.save();
        }

        return supplier;
    } catch (error) {
        return error;
    }
}

export async function update() { }

export async function remove() { }