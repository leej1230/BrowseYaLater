import { Dexie } from '../node_modules/dexie/dist/dexie.mjs';
var DBName = 'browseyalater';

const db = new Dexie(DBName);
db.version(1).stores({
    URL: '++id, URLAddress'
});
export default db;