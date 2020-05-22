import Card from "../model/Card";
import getRealm from './Realm';
import Constants from "../../constants/Constants";
import console  from 'reactotron-react-native';

const UpdateMode = Realm.UpdateMode;

const SCHEMA = Card.schema.name;

class CardService {

    public save(card: Card) {
        const realm = getRealm();
        const id = realm.objects(SCHEMA).max(Constants.ID);
        card.id = id ? Number(id) + Constants.ONE : Constants.ONE;
        console.log(card);
        realm.write(() => realm.create(SCHEMA, new Card(card)
            , UpdateMode.Modified));
    }

    public findById(id: number): Card | undefined {
        const realm = getRealm();
        return realm.objectForPrimaryKey(SCHEMA, id);
    }

    public findByUser(userId: number): Array<Card> {
        const realm = getRealm();
        return realm.objects(SCHEMA)
            .filtered('userId == $0', userId)
            .map(Card.fromRealmObject);
    }
}

export default new CardService();
