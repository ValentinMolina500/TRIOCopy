// import firebase = require("nativescript-plugin-firebase");
import * as firebase from "nativescript-plugin-firebase";
import dialogs from "./messages";
import { UserViewModel } from "../viewmodels/user";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { throws } from "assert";
import * as Dialogs from "tns-core-modules/ui/dialogs";
import user from "../viewmodels/user";
import * as firestore from "nativescript-plugin-firebase/app";
import { Observable } from "tns-core-modules/ui/page/page";

// const firestore = require("nativescript-plugin-firebase/app");

// const dialogs = <myDialogs>require("./messages").I;
// const user = <UserViewModel>require("../viewmodels/user").I;



export class myFirebase {
    private pushtoken: any;
    private postCollection;
    private resourceCollection;
    private messagesCollection;
    public postArray: ObservableArray<object> = new ObservableArray();
    public resourceArray: ObservableArray<object> = new ObservableArray();
    public messagesArray: ObservableArray<object> = new ObservableArray();
    public retrievedData: boolean = false;
    public retrievedResources: boolean = false;
    public messagesData: boolean = false;
    public User: object;
    public notification: any = null;


    /**
     * This method initializes firebase and sets up event listeners for push tokens and messages.
     *
     * @return a Promise that is resolved when firebase initializes.
     */
    public doInit() {
        return firebase.init({
            showNotificationsWhenInForeground: true,
            showNotifications: true,
            persist: true,
            onAuthStateChanged: function (data) {
                console.log((data.loggedIn ? "Logged in to firebase" : "Logged out of firebase") + "(init's callback)");
                if (data.loggedIn) {
                    
                }
            },

            onPushTokenReceivedCallback: token => {
                console.log("Firebase pushtoken: " + token);
                
                //firebase.update('/users/' + user.getTotalData().uid, { pushtoken: token });
            },
            // onMessageReceivedCallback: message => {
            //     console.log(`message: ${message.title}`);
                
            // }
        })
            .then(() => {
                this.setPostData();
                this.setResourceData();
                console.log("firebase initialized!")
            })
            .catch((error) => console.log(`Error in init: ${error}`));
    }

    /**
     * This method logs out the currently logged in user.
     *
     * @return a Promise that is resolved when the user is logged out.
     */
    public doLogout() {
        // return firebase.logout()
        //     .then(() => console.log('Logout success!'))
        //     .catch(error => console.log(`Error in logout: ${error}`));
        return firebase.logout()
            .then(() => console.log('Logout success!'))
            .catch(error => console.log(`Error in logout: ${error}`));
    }

    public savePushToken() {
        firebase.getCurrentPushToken()
            .then(token => {
                console.log("Current Push token: " + token);
                firebase.update('users/' + user.getTotalData().uid, { pushtoken: token });
            });
    }


    /**
     * This method returns the currently logged in user, and all the data associated with that user,
     * including their email, last logged timestamp and more.
     *
     * @return a Promise that is resolved when the user object is returned from firebase.
     */
    public isLoggedIn() {
        return firebase.getCurrentUser()
            .then(user => { return user; })
            .catch(error => console.log('ERROR IN isLogged in: ' + error))
    }

    /**
     * This method accepts a UserViewModel object to log that user into firebase.
     *
     * @param[in] user The user to login firebase with.
     *
     * @return a Promise that is resolved when the user is logged in.
     */
    public firebaseUID: string;

    public doLogin(user: UserViewModel) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: user.getData()
        })
            .then(result => this.firebaseUID = result.uid);
    }

    /**
     * This method accepts an email string, that is used to reset the email of a user. Note
     * an object is created with that string, since firebase requires an object as a argument.
     *
     * @param[email] email The email to send the reset password email to.
     *
     * @return a Promise that is resolved when the user's password is reset.
     */
    public doResetPassword(email: string) {
        let user = { email: email };
        return firebase.sendPasswordResetEmail(user.email)
            .then(() => {
                dialogs.resetPasswordSuccess()
                    .then(() => console.log("Dialog closed."));
            })
            .catch(error => {
                console.log("Error sending password reset email: " + error);

                // alerting the user that the password reset failed.
                dialogs.genericDialog({
                    title: "Failed Resetting Password",
                    message: "Failed to reset password\n" + error,
                    okButtonText: "Ok"
                })
            });
    }

    /**
     * This method accepts a UserViewModel object to register a user in firebase.
     *
     * @param[in] user The user to be registered with firebase.
     *
     * @return a Promise that is resolved when the user registered.
     */
    public doRegister(user: UserViewModel) {
        return firebase.createUser(user.getData());

    }

    /**
     * This method accepts a UserViewModel object to store in the firestore database in the "users"
     * collection. After the Promise is resolved, a reference to that object is returned.
     *
     * @param[in] user The user to be stored in firestore
     */

    public addUserToColllection(user: UserViewModel): void {
        const User = user.getTotalData();
        firebase.setValue('/users/' + User.uid, User)
            .then(() => console.log('Added User with:" + doc.key'))
    }

    /**
     * This method accepts the id of a collection stored in firestore and returns a reference to it.
     *
     * @param[in] collectionId The name of the collection you want reference to.
     *
     * @return a reference to that collection.
     */
    public getCollection(collectionId: string) {
        return firestore.firestore().collection(collectionId);
    }

    /**
     * This private method gets the posts in the post collection in firestore.
     *
     * @return a Promise that is resolved after calling get on the post collection.
     */
    private getPostData() {
        return this.postCollection.get();
    }

    private getResourceData() {
        return this.resourceCollection.get();
    }

    private getMessagesData() {
        return this.messagesCollection.get();
    }

    public getUser(firebaseUID: string) {
        return firebase.getValue("/users/" + firebaseUID);
    }

    /**
     * For initialization purposes. Sets postCollection to a reference to the posts collection
     * in firestore.
     */
    public setPostData() {
        this.postCollection = this.getCollection("posts");
    }

    public setResourceData() {
        this.resourceCollection = this.getCollection("resources");
    }
    public setMessagesData() {
        this.messagesCollection = this.getCollection("messages");
    }

    /**
     * This method pushes all the posts in the post collection in firestore into the postArray.
     *
     * 
     * @return a Promise that is resolved after all posts are pushed into the postArray.
     */
    public setPosts() {
        return this.getPostData()
            .then(documentRef => {
                documentRef.forEach(doc => {
                    this.postArray.push(doc.data());
                })
            })
    }
    public setMessages() {
        return this.getMessagesData()
            .then(documentRef => {
                documentRef.forEach(doc => {
                    this.messagesArray.push(doc.data());
                })
            })
    }

    /**
     * This method returns the current size of the post ObservableArray.
     *
     * @return the size of the post array.
     */
    public getSizeOfPosts(): number {
        return this.postArray.length;
    }
    public getSizeOfMessages(): number {
        return this.messagesArray.length;
    }

    /**
     * This method accepts a firestore collection, and a key to a document in that collection,
     * in order to return that document. You must call .get() on the returned document
     * to get the data in the document.
     *
     * @param[collection]   A reference to a collection in firestore
     * @param[key] key The key of the document you want to retrieve
     */
    public getDocumentFromCollection(collection: any, key: string) {
        return collection.doc(key);
    }

    public addAdvisor(advisor: object) {
        return firebase.push(
            '/advisors',
            advisor
        )
    }

    public addTutors(tutor: object) {
        return firebase.push(
            '/tutors',
            tutor
        )
    }

    public addAppointments(appointments: object) {
        return firebase.push(
            '/appointments',
            appointments
        )
    }

    /**
     * Gets all current advisors in the advisor category in firebase.
     * @param [callback] function to be called after the query finishes
     */
    public queryTutors(callback?: any): any {
        return firebase.getValue('/tutors')
    }
    public queryUsers(callback?: any): any {
        return firebase.getValue('/users')
    }

    public queryAppoinments(callback?: any): any {
        return firebase.getValue('/appoinments')
    }

    public setResouces() {
        return this.getResourceData()
            .then(documentRef => {
                documentRef.forEach(doc => {
                    this.resourceArray.push(doc.data());
                })
            })
    }

    public getResourceLength() {
        return this.resourceArray.length;
    }

    public doAddAppointment(appointment: any): any {
        let studentId = appointment.studentId;
        let recieverId = appointment.recieverId;

        // // return this.addAppointments(appointment)
        //     /*.then(doc => {
        //         let key = doc.key;

        //         // we add the key to both the student and tutor/advisor so they will be notified
        //         return firebase.push('/users/' + studentId + '/appointments', { key: key })
        //     })
        //     .catch(err => console.log("ERROR IN ADD APPOINTMENT: " + err))

        //             // .then(() =>  {return firebase.push('/tutors/' + recieverId + '/appointments', {key: key})})
        //             // .then(() => 
        //             //  firebase.setValue('/appointments/' + key, {
        //             //     ...appointment,
        //             //     appointmentId: key
        //             // }))
        //            */




            
    }

    public getValueFirebase(path: string) {
        return firebase.getValue(path);
    }

    public appointments: Array<object>;

    public getAppointments(userId: string) {
        return firebase.getValue('/users/' + userId + '/appointments/');
    }

    public getMentorAppointments(userId: string) {
        return firebase.getValue('/tutors/' + userId + '/appointments/');
    }

    // public setAppointmentEventListener(callback, uid) {
    //     firebase.addChildEventListener(callback, '/users/' + uid + '/appointments');
    // }

    public addMessageCallback(callback) {
        firebase.addOnMessageReceivedCallback(callback)
    }
};

let Firebase = new myFirebase();
export default Firebase;