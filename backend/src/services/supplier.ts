import { Supplier } from '../models/supplier';
import { Contact } from '../models/contact';
import { ServiceType } from '../models/service_type';
import * as api_errors from '../api/api_errors';
import { getRepository } from 'typeorm';


export async function index() {
    try {
        var suppliers: Supplier[] = await Supplier.find();
        var res: {}[] = [];
        for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i]
            let contacts: Contact[] = await Contact.find({ where: { supplier } });
            let sup_contacts: { id, phone_number }[] = [];
            contacts.forEach(contact => {
                let c = {
                    id: contact.getId(),
                    phone_number: contact.getPhone_number()
                }
                sup_contacts.push(c);
            });
            let sup = {
                ...supplier,
                contacts: sup_contacts
            }
            res.push(sup);
        }
        return res;
    } catch (error) {
        return error;
    }
}

// TO DO ALL EXPENSEVES 
export async function show(id: Number) {
    try {
        var supplier: Supplier = await Supplier.findOne({ where: { id } });
        var contacts: Contact[] = await Contact.find({ where: { supplier: supplier } });

        let contacts_res: { id, phone_number }[] = [];
        contacts.forEach(contact => {
            let c = {
                id: contact.getId(),
                phone_number: contact.getPhone_number()
            }
            contacts_res.push(c);
        });

        let res = {
            ...supplier,
            contacts_res
        };

        return res;
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
        if (service_types.length === 0) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS);
        }
        supplier.setService_types(service_types);
        await supplier.save();
        return supplier;
    } catch (error) {
        return error;
    }
}

export async function update(id: Number, body: any) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        if (!supplier) {
            throw new Error('Não existe')
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function remove() { }