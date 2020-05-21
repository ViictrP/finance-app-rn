import Realm from 'realm';
import Card from '../model/Card';

let instance: Realm | null;

export default function getRealm() {
    if (!instance) instance = new Realm({ schema: [Card.schema] });
    return instance!;
}
