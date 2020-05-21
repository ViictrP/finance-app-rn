import Card from "../model/Card";
import getRealm from './Realm';

const UpdateMode = Realm.UpdateMode;

class CardService {

    public async save(card: Card) {
        const realm = getRealm();
        realm.write(() => realm.create(Card.schema.name, card, UpdateMode.Modified));
    }

    public findById(id: number): Card {
        const realm = getRealm();
        return realm.objectForPrimaryKey(Card.schema.name, id);
    }
}

export default new CardService();
