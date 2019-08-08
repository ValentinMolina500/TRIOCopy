import { Couchbase } from "nativescript-couchbase-plugin";
const prefs:any = require("tns-core-modules/application-settings");
export class myCouchbase {
    private database: Couchbase;
    private documentId: string;

    constructor(name: string) {
        this.database = new Couchbase(name);
    }
    //.doucmentId creates ID for document saves it in document
    //.setId saves docment id into prefrence using the word prefsId.
    public createDocument(prefsId: string, document: object): void {
        this.documentId = this.database.createDocument(document);
        this.setId(prefsId, this.documentId);

    }
    // to retrive document it uses the saved id prefsId.
    public getDocument(prefsId): object {
        return this.database.getDocument(this.getId(prefsId));
    }

    public setId(prefsId: string, documentId: string): void {
        prefs.setString(prefsId, documentId);
    }

    public getId(prefsId: string): string {
        return prefs.getString(prefsId);
    }
}

// exports.I = new myCouchbase('trioapp');
let couchbase = new myCouchbase('trioapp');
export default couchbase;