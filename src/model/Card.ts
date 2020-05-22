import Invoice from "./Invoice";
import Constants from "../../constants/Constants";

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

    constructor(card?: Card) {
        this.id = card?.id
        this.description = card?.description!;
        this.closeDay = Number(card?.closeDay);
        this.limit = Number(card?.limit);
        this.availableLimit = Number(card?.limit);
        this.flag = card?.flag!;
        this.cardNumber = Number(card?.cardNumber);
        this.userId = Constants.ONE;
    }

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

    static fromRealmObject(object: Realm.Object): Card {
        const card = new Card();
        card.id = object['id'];
        card.description = object['description'];
        card.closeDay = object['closeDay'];
        card.limit = object['limit'];
        card.availableLimit = object['availableLimit'];
        card.flag = object['flag'];
        card.cardNumber = object['cardNumber'];
        card.userId = object['userId'];
        return card;
    }
}

export default Card;
