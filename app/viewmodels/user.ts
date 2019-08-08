import { Observable } from "tns-core-modules/data/observable"
import myDialogs from "../utils/messages";
import couchbase from "../utils/couchbase";
import { ImageSource } from "tns-core-modules/image-source/image-source";

// const dialogs = <myDialogs>require("../utils/messages").I;
// const couchbase = <myCouchbase>require("../utils/couchbase").I;

export  class UserViewModel extends Observable {

    private uid: string ;
    private firstName: string ;
    private lastName: string ;
    private wsuId: number ;
    private email: string ;
    private password: string ;
    private document: object;
    private major: string;
    private profilepic: string;

    constructor() {
        super();

 
    }

    public getDataCouchbase() {
        this.document = couchbase.getDocument('User');
        if (this.document) {
            this.setData(this.document);
        }
    }
    public setData(view:any) {

        this.uid = view.uid||'';
        this.firstName = view.firstName;
        this.lastName = view.lastName;
        this.email = view.email;
        this.wsuId = view.wsuId;
        this.password = view.password||'';
        this.major = view.major || '';
        this.profilepic = view.profilepic || "";
    }

    public setEmail(email: string): void {
        this.email = email;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public setFbId(uid: string): void {
        this.uid = uid;
    }

    public getEmail(): any {
        return this.email;
    }
    public getData(): any {
        return {
                email: this.email.trim(),
                password: this.password,
                uid: this.uid
                }
    }
    public getTotalData(): any {
        return {
            uid: this.uid,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            wsuId: this.wsuId,
            major: this.major,
            profilepic:this.profilepic,
                }
    }
    public saveToCouchbase(): any {
        console.log("-----------------");
        console.dir(this.getTotalData());
        couchbase.createDocument('User',this.getTotalData());
    }

}

let user = new UserViewModel();
export default user;