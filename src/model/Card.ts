import Invoice from "./Invoice";

class Card {

    public id?: number;
    public description: string;
    public closeDay: number;
    public limit: number;
    public availableLimit: number;
    public flag: string;
    public cardNumber: number;
    public userId: number;
    public invoices: Array<Invoice>;

    static schema: Realm.ObjectSchema = {
        name: 'card',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true },
            description: 'string',
            closeDay: {type: 'int', default: 1},
            limit: { type: 'int', default: 0 },
            availableLimit: { type: 'int', default: 0 },
            flag: 'string',
            cardNumber: 'int',
            userId: 'int?'
        }
    };
}

export default Card;
