import { Supplier } from '../models/supplier';
import { Contact } from '../models/contact';

export async function index() { }

export async function show(id: Number) {
    try {
        console.log('vou entrar suppliers')
        let supplier: Supplier = await Supplier.findOne({ where: { id } });
        console.log('morri')
        let contacts: Contact[] = await Contact.find({ where: { userId: supplier.getId() } })
        console.log(contacts)
        console.log(supplier)
        return supplier;
    } catch (e) {
        console.log(e);
        return;
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

        return supplier;
    } catch (e) {
        console.log(e);
        return;
    }
}

export async function update() { }

export async function remove() { }