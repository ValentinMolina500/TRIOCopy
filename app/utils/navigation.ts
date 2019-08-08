import { Frame } from "tns-core-modules/ui/frame";

export class Navigation {
    private frame: Frame;
    private documentId: string;


    //.doucmentId creates ID for document saves it in document
    // //.setId saves docment id into prefrence using the word prefsId.
    // public navigateToLogin(frame: Frame): void {
    //     frame.navigate("/views/login/login-page");
    // }
}

exports.I = new Navigation();