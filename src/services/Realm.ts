import Realm from 'realm';
import CreditCard from '../model/CreditCard';
import InvoiceItem from "../model/InvoiceItem";
import Invoice from "../model/Invoice";

let instance: Realm | null;

export default function getRealm() {
    if (!instance) instance = new Realm({ schema: [CreditCard.schema, Invoice.schema, InvoiceItem.schema] });
    return instance!;
}
