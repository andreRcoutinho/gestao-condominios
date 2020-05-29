import { Supplier } from '../models/supplier';
import { Contact } from '../models/contact';
import { ServiceType } from '../models/service_type';
import * as api_errors from '../api/api_errors';
import { Expense } from '../models/expense';

export async function index() {
    try {
        var suppliers: Supplier[] = await Supplier.find();
        var res: {}[] = [];
        for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i];
            let contacts: Contact[] = await Contact.find({ where: { supplier } });
            let sup_contacts: { id; phone_number }[] = [];
            contacts.forEach((contact) => {
                let c = {
                    id: contact.getId(),
                    phone_number: contact.getPhone_number(),
                };
                sup_contacts.push(c);
            });
            let sup = {
                ...supplier,
                name: `${supplier.getFirst_name()} ${supplier.getLast_name()}`,
                contacts: sup_contacts,
            };
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
        var expenses: Expense[] = await Expense.find({ where: { supplier: supplier } });

        let contacts_res: { id; phone_number }[] = [];
        let expenses_res: { id; description; value; payment_date; payment_record_date }[] = [];
        contacts.forEach((contact) => {
            let c = {
                id: contact.getId(),
                phone_number: contact.getPhone_number(),
            };
            contacts_res.push(c);
        });

        expenses.forEach((expense) => {
            let e = {
                id: expense.getId(),
                description: expense.getDescription(),
                value: expense.getValue(),
                payment_date: expense.getPayment_date(),
                payment_record_date: expense.getPayment_record_date(),
            };
            expenses_res.push(e);
        });

        let res = {
            ...supplier,
            contacts: contacts_res,
            expenses: expenses_res,
        };

        return res;
    } catch (error) {
        return error;
    }
}

export async function create(body: any) {
    try {
        let supplier: Supplier = new Supplier(
            body.first_name,
            body.last_name,
            body.company_name,
            body.email,
            body.NIF,
            body.IBAN
        );
        await supplier.save();

        for (let index = 0; index < body.contacts.length; index++) {
            const contact = body.contacts[index];
            let c: Contact = new Contact(contact, null, supplier);
            await c.save();
        }

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
            throw new Error(api_errors.SUPPLIER_NOT_EXISTS);
        }

        await Supplier.update(Number(supplier.getId()), body);

        return supplier;
    } catch (error) {
        return error;
    }
}

//TO DO
export async function remove() { }

export async function addContact(id: Number, body: any) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        if (!supplier) {
            throw new Error(api_errors.SUPPLIER_NOT_EXISTS)
        }

        let contact: Contact = new Contact(body.phone_number, null, supplier);
        await contact.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function updateContact(body: any) {
    try {

        let contact: Contact = await Contact.findOne({ where: { id: body.contact_id } });
        contact.setPhone_number(body.phone_number);
        await contact.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function deleteContact(id: Number, body: any) {
    try {

        let contact: Contact = await Contact.findOne({ where: { id: body.contact_id } });
        if (!contact) {
            throw new Error("Não existe nenhum contacto com esse id");
        }
        await Contact.remove(contact);

    } catch (error) {
        return error;
    }
}

export async function addServiceTypeSupplier(id: Number, body: any) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        if (!supplier) {
            throw new Error(api_errors.SUPPLIER_NOT_EXISTS);
        }

        let service_type: ServiceType = await ServiceType.findOne({ where: { id: body.service_type_id } });
        if (!service_type) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS);
        }

        let service_types: ServiceType[] = supplier.getService_types();
        service_types.push(service_type);

        supplier.setService_types(service_types);
        await supplier.save();

        return true;
    } catch (error) {
        return error;
    }
}

export async function deleteServiceTypeSupplier(id: Number, body: any) {
    try {
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        if (!supplier) {
            throw new Error(api_errors.SUPPLIER_NOT_EXISTS);
        }

        let service_type_remove: ServiceType = await ServiceType.findOne({ where: { id: body.service_type_id } });
        if (!service_type_remove) {
            throw new Error(api_errors.SERVICE_TYPE_NOT_EXISTS);
        }

        let service_types: ServiceType[] = supplier.getService_types();
        service_types.filter((service_type, index) => {
            if (service_type.getId() === service_type_remove.getId()) {
                delete service_types[index]
            }
        });

        console.log(service_types);
        supplier.setService_types(service_types);
        await supplier.save();

        return true;

    } catch (error) {
        return error;
    }
}
