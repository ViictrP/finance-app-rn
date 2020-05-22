import CreditCard from "../model/CreditCard";
import getRealm from './Realm';
import Constants from "../../constants/Constants";
import console  from 'reactotron-react-native';

const UpdateMode = Realm.UpdateMode;

const SCHEMA = CreditCard.schema.name;

class CardService {

    public save(card: CreditCard): CreditCard {
        const realm = getRealm();
        const id = realm.objects(SCHEMA).max(Constants.ID);
        card.id = id ? Number(id) + Constants.ONE : Constants.ONE;
        const saved = new CreditCard(card);
        realm.write(() => realm.create(SCHEMA, saved, UpdateMode.Modified));
        return saved;
    }

    public findById(id: number): CreditCard | undefined {
        const realm = getRealm();
        return realm.objectForPrimaryKey(SCHEMA, id);
    }

    public findByUser(userId: number): Array<CreditCard> {
        const realm = getRealm();
        return realm.objects(SCHEMA)
            .filtered('userId == $0', userId)
            .map(CreditCard.fromRealmObject);
    }
}

export default new CardService();
