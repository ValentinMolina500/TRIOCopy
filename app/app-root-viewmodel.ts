import { Observable, knownCollections, getViewById } from "tns-core-modules/ui/page/page";
import firebase from "./utils/firebase";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
export class AppRootViewModel extends Observable {

    private messageRecieved: boolean = false;
    private message = "testing123";
    private GL: StackLayout;
    constructor(page) {
        super();

        this.GL = getViewById(page, 'help-text') as StackLayout;
        
        firebase.addMessageCallback((message) => {
            
            this.set('messageRecieved', true);
            this.set('message', message.body);
            this.GL.className = "message-container";
        });
    }

}