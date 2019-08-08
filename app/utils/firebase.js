"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var firestore = require("nativescript-plugin-firebase/app");
var dialogs = require("./messages").I;
var user = require("../viewmodels/user").I;
var myFirebase = /** @class */ (function () {
    function myFirebase() {
        this.postArray = new observable_array_1.ObservableArray();
        this.resourceArray = new observable_array_1.ObservableArray();
        this.messagesArray = new observable_array_1.ObservableArray();
        this.retrievedData = false;
        this.retrievedResources = false;
        this.messagesData = false;
        this.notification = null;
    }
    /**
     * This method initializes firebase and sets up event listeners for push tokens and messages.
     *
     * @return a Promise that is resolved when firebase initializes.
     */
    myFirebase.prototype.doInit = function () {
        var _this = this;
        return firebase.init({
            showNotificationsWhenInForeground: false,
            persist: true,
            onAuthStateChanged: function (data) {
                console.log((data.loggedIn ? "Logged in to firebase" : "Logged out of firebase") + "(init's callback)");
                if (data.loggedIn) {
                }
            },
            onPushTokenReceivedCallback: function (token) {
                console.log("Firebase pushtoken: " + token);
                //firebase.update('/users/' + user.getTotalData().uid, { pushtoken: token });
            },
            onMessageReceivedCallback: function (message) {
                console.log("message: " + message.title);
            }
        })
            .then(function () {
            _this.setPostData();
            _this.setResourceData();
            console.log("firebase initialized!");
        })
            .catch(function (error) { return console.log("Error in init: " + error); });
    };
    /**
     * This method logs out the currently logged in user.
     *
     * @return a Promise that is resolved when the user is logged out.
     */
    myFirebase.prototype.doLogout = function () {
        return firebase.logout()
            .then(function () { return console.log('Logout success!'); })
            .catch(function (error) { return console.log("Error in logout: " + error); });
    };
    myFirebase.prototype.savePushToken = function () {
        firebase.getCurrentPushToken()
            .then(function (token) {
            console.log("Current Push token: " + token);
            firebase.update('users/' + user.getTotalData().uid, { pushtoken: token });
        });
    };
    /**
     * This method returns the currently logged in user, and all the data associated with that user,
     * including their email, last logged timestamp and more.
     *
     * @return a Promise that is resolved when the user object is returned from firebase.
     */
    myFirebase.prototype.isLoggedIn = function () {
        return firebase.getCurrentUser()
            .then(function (user) { return user; });
    };
    myFirebase.prototype.doLogin = function (user) {
        var _this = this;
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: user.getData()
        })
            .then(function (result) { return _this.firebaseUID = result.uid; });
    };
    /**
     * This method accepts an email string, that is used to reset the email of a user. Note
     * an object is created with that string, since firebase requires an object as a argument.
     *
     * @param[email] email The email to send the reset password email to.
     *
     * @return a Promise that is resolved when the user's password is reset.
     */
    myFirebase.prototype.doResetPassword = function (email) {
        var user = { email: email };
        return firebase.resetPassword(user)
            .then(function () {
            dialogs.resetPasswordSuccess()
                .then(function () { return console.log("Dialog closed."); });
        })
            .catch(function (error) {
            console.log("Error sending password reset email: " + error);
            // alerting the user that the password reset failed.
            dialogs.genericDialog({
                title: "Failed Resetting Password",
                message: "Failed to reset password\n" + error,
                okButtonText: "Ok"
            });
        });
    };
    /**
     * This method accepts a UserViewModel object to register a user in firebase.
     *
     * @param[in] user The user to be registered with firebase.
     *
     * @return a Promise that is resolved when the user registered.
     */
    myFirebase.prototype.doRegister = function (user) {
        return firebase.createUser(user.getData());
    };
    /**
     * This method accepts a UserViewModel object to store in the firestore database in the "users"
     * collection. After the Promise is resolved, a reference to that object is returned.
     *
     * @param[in] user The user to be stored in firestore
     */
    myFirebase.prototype.addUserToColllection = function (user) {
        var User = user.getTotalData();
        firebase.setValue('/users/' + User.uid, User)
            .then(function () { return console.log('Added User with:" + doc.key'); });
    };
    /**
     * This method accepts the id of a collection stored in firestore and returns a reference to it.
     *
     * @param[in] collectionId The name of the collection you want reference to.
     *
     * @return a reference to that collection.
     */
    myFirebase.prototype.getCollection = function (collectionId) {
        return firestore.firestore().collection(collectionId);
    };
    /**
     * This private method gets the posts in the post collection in firestore.
     *
     * @return a Promise that is resolved after calling get on the post collection.
     */
    myFirebase.prototype.getPostData = function () {
        return this.postCollection.get();
    };
    myFirebase.prototype.getResourceData = function () {
        return this.resourceCollection.get();
    };
    myFirebase.prototype.getMessagesData = function () {
        return this.messagesCollection.get();
    };
    myFirebase.prototype.getUser = function (firebaseUID) {
        return firebase.getValue("/users/" + firebaseUID);
    };
    /**
     * For initialization purposes. Sets postCollection to a reference to the posts collection
     * in firestore.
     */
    myFirebase.prototype.setPostData = function () {
        this.postCollection = this.getCollection("posts");
    };
    myFirebase.prototype.setResourceData = function () {
        this.resourceCollection = this.getCollection("resources");
    };
    myFirebase.prototype.setMessagesData = function () {
        this.messagesCollection = this.getCollection("messages");
    };
    /**
     * This method pushes all the posts in the post collection in firestore into the postArray.
     *
     *
     * @return a Promise that is resolved after all posts are pushed into the postArray.
     */
    myFirebase.prototype.setPosts = function () {
        var _this = this;
        return this.getPostData()
            .then(function (documentRef) {
            documentRef.forEach(function (doc) {
                _this.postArray.push(doc.data());
            });
        });
    };
    myFirebase.prototype.setMessages = function () {
        var _this = this;
        return this.getMessagesData()
            .then(function (documentRef) {
            documentRef.forEach(function (doc) {
                _this.messagesArray.push(doc.data());
            });
        });
    };
    /**
     * This method returns the current size of the post ObservableArray.
     *
     * @return the size of the post array.
     */
    myFirebase.prototype.getSizeOfPosts = function () {
        return this.postArray.length;
    };
    myFirebase.prototype.getSizeOfMessages = function () {
        return this.messagesArray.length;
    };
    /**
     * This method accepts a firestore collection, and a key to a document in that collection,
     * in order to return that document. You must call .get() on the returned document
     * to get the data in the document.
     *
     * @param[collection]   A reference to a collection in firestore
     * @param[key] key The key of the document you want to retrieve
     */
    myFirebase.prototype.getDocumentFromCollection = function (collection, key) {
        return collection.doc(key);
    };
    myFirebase.prototype.addAdvisor = function (advisor) {
        return firebase.push('/advisors', advisor);
    };
    myFirebase.prototype.addTutors = function (tutor) {
        return firebase.push('/tutors', tutor);
    };
    myFirebase.prototype.addAppointments = function (appointments) {
        return firebase.push('/appointments', appointments);
    };
    /**
     * Gets all current advisors in the advisor category in firebase.
     * @param [callback] function to be called after the query finishes
     */
    myFirebase.prototype.queryTutors = function (callback) {
        return firebase.getValue('/tutors');
    };
    myFirebase.prototype.queryUsers = function (callback) {
        return firebase.getValue('/users');
    };
    myFirebase.prototype.queryAppoinments = function (callback) {
        return firebase.getValue('/appoinments');
    };
    myFirebase.prototype.setResouces = function () {
        var _this = this;
        return this.getResourceData()
            .then(function (documentRef) {
            documentRef.forEach(function (doc) {
                _this.resourceArray.push(doc.data());
            });
        });
    };
    myFirebase.prototype.getResourceLength = function () {
        return this.resourceArray.length;
    };
    myFirebase.prototype.doAddAppointment = function (appointment) {
        var studentId = appointment.studentId;
        var recieverId = appointment.recieverId;
        return this.addAppointments(appointment);
        /*.then(doc => {
            let key = doc.key;

            // we add the key to both the student and tutor/advisor so they will be notified
            return firebase.push('/users/' + studentId + '/appointments', { key: key })
        })
        .catch(err => console.log("ERROR IN ADD APPOINTMENT: " + err))

                // .then(() =>  {return firebase.push('/tutors/' + recieverId + '/appointments', {key: key})})
                // .then(() =>
                //  firebase.setValue('/appointments/' + key, {
                //     ...appointment,
                //     appointmentId: key
                // }))
               */
    };
    myFirebase.prototype.getValueFirebase = function (path) {
        return firebase.getValue(path);
    };
    myFirebase.prototype.getAppointments = function (userId) {
        return firebase.getValue('/users/' + userId + '/appointments/');
    };
    myFirebase.prototype.getMentorAppointments = function (userId) {
        return firebase.getValue('/tutors/' + userId + '/appointments/');
    };
    return myFirebase;
}());
exports.myFirebase = myFirebase;
;
exports.I = new myFirebase();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaXJlYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEwRDtBQUcxRCwyRUFBeUU7QUFJekUsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDOUQsSUFBTSxPQUFPLEdBQWMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRCxJQUFNLElBQUksR0FBa0IsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBSTVEO0lBQUE7UUFLVyxjQUFTLEdBQTRCLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQzNELGtCQUFhLEdBQTRCLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQy9ELGtCQUFhLEdBQTRCLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQy9ELGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5QixpQkFBWSxHQUFRLElBQUksQ0FBQztJQStUcEMsQ0FBQztJQTdURzs7OztPQUlHO0lBQ0ksMkJBQU0sR0FBYjtRQUFBLGlCQTJCQztRQTFCRyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakIsaUNBQWlDLEVBQUUsS0FBSztZQUN4QyxPQUFPLEVBQUUsSUFBSTtZQUNiLGtCQUFrQixFQUFFLFVBQVUsSUFBSTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3hHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtpQkFFbEI7WUFDTCxDQUFDO1lBRUQsMkJBQTJCLEVBQUUsVUFBQSxLQUFLO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFD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SUFDckMsQ0FBQztJQUVNLHFDQUFnQixHQUF2QixVQUF3QixXQUFnQjtRQUNwQyxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFFeEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3BDOzs7Ozs7Ozs7Ozs7OztpQkFjUztJQU1qQixDQUFDO0lBRU0scUNBQWdCLEdBQXZCLFVBQXdCLElBQVk7UUFDaEMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFJTSxvQ0FBZSxHQUF0QixVQUF1QixNQUFjO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLGdCQUFnQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVNLDBDQUFxQixHQUE1QixVQUE2QixNQUFjO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLGdCQUFnQixDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQTNVRCxJQTJVQztBQTNVWSxnQ0FBVTtBQTJVdEIsQ0FBQztBQUVGLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgbXlEaWFsb2dzIGZyb20gXCIuL21lc3NhZ2VzXCI7XHJcbmltcG9ydCBVc2VyVmlld01vZGVsIGZyb20gXCIuLi92aWV3bW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IHRocm93cyB9IGZyb20gXCJhc3NlcnRcIjtcclxuaW1wb3J0ICogYXMgRGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcblxyXG5jb25zdCBmaXJlc3RvcmUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcbmNvbnN0IGRpYWxvZ3MgPSA8bXlEaWFsb2dzPnJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpLkk7XHJcbmNvbnN0IHVzZXIgPSA8VXNlclZpZXdNb2RlbD5yZXF1aXJlKFwiLi4vdmlld21vZGVscy91c2VyXCIpLkk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBteUZpcmViYXNlIHtcclxuICAgIHByaXZhdGUgcHVzaHRva2VuOiBhbnk7XHJcbiAgICBwcml2YXRlIHBvc3RDb2xsZWN0aW9uO1xyXG4gICAgcHJpdmF0ZSByZXNvdXJjZUNvbGxlY3Rpb247XHJcbiAgICBwcml2YXRlIG1lc3NhZ2VzQ29sbGVjdGlvbjtcclxuICAgIHB1YmxpYyBwb3N0QXJyYXk6IE9ic2VydmFibGVBcnJheTxvYmplY3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgcHVibGljIHJlc291cmNlQXJyYXk6IE9ic2VydmFibGVBcnJheTxvYmplY3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgcHVibGljIG1lc3NhZ2VzQXJyYXk6IE9ic2VydmFibGVBcnJheTxvYmplY3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgcHVibGljIHJldHJpZXZlZERhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyByZXRyaWV2ZWRSZXNvdXJjZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtZXNzYWdlc0RhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBVc2VyOiBvYmplY3Q7XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaW5pdGlhbGl6ZXMgZmlyZWJhc2UgYW5kIHNldHMgdXAgZXZlbnQgbGlzdGVuZXJzIGZvciBwdXNoIHRva2VucyBhbmQgbWVzc2FnZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGZpcmViYXNlIGluaXRpYWxpemVzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9Jbml0KCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5pbml0KHtcclxuICAgICAgICAgICAgc2hvd05vdGlmaWNhdGlvbnNXaGVuSW5Gb3JlZ3JvdW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgcGVyc2lzdDogdHJ1ZSxcclxuICAgICAgICAgICAgb25BdXRoU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKGRhdGEubG9nZ2VkSW4gPyBcIkxvZ2dlZCBpbiB0byBmaXJlYmFzZVwiIDogXCJMb2dnZWQgb3V0IG9mIGZpcmViYXNlXCIpICsgXCIoaW5pdCdzIGNhbGxiYWNrKVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvblB1c2hUb2tlblJlY2VpdmVkQ2FsbGJhY2s6IHRva2VuID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWJhc2UgcHVzaHRva2VuOiBcIiArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9maXJlYmFzZS51cGRhdGUoJy91c2Vycy8nICsgdXNlci5nZXRUb3RhbERhdGEoKS51aWQsIHsgcHVzaHRva2VuOiB0b2tlbiB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogbWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgbWVzc2FnZTogJHttZXNzYWdlLnRpdGxlfWApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9zdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzb3VyY2VEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlIGluaXRpYWxpemVkIVwiKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhgRXJyb3IgaW4gaW5pdDogJHtlcnJvcn1gKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBsb2dzIG91dCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgdXNlciBpcyBsb2dnZWQgb3V0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9Mb2dvdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmxvZ291dCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdMb2dvdXQgc3VjY2VzcyEnKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGBFcnJvciBpbiBsb2dvdXQ6ICR7ZXJyb3J9YCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlUHVzaFRva2VuKCkge1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRQdXNoVG9rZW4oKVxyXG4gICAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgUHVzaCB0b2tlbjogXCIgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoJ3VzZXJzLycgKyB1c2VyLmdldFRvdGFsRGF0YSgpLnVpZCwgeyBwdXNodG9rZW46IHRva2VuIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXIsIGFuZCBhbGwgdGhlIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoYXQgdXNlcixcclxuICAgICAqIGluY2x1ZGluZyB0aGVpciBlbWFpbCwgbGFzdCBsb2dnZWQgdGltZXN0YW1wIGFuZCBtb3JlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgdXNlciBvYmplY3QgaXMgcmV0dXJuZWQgZnJvbSBmaXJlYmFzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzTG9nZ2VkSW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcclxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7IHJldHVybiB1c2VyOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGFjY2VwdHMgYSBVc2VyVmlld01vZGVsIG9iamVjdCB0byBsb2cgdGhhdCB1c2VyIGludG8gZmlyZWJhc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtW2luXSB1c2VyIFRoZSB1c2VyIHRvIGxvZ2luIGZpcmViYXNlIHdpdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpcmViYXNlVUlEOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGRvTG9naW4odXNlcjogVXNlclZpZXdNb2RlbCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB1c2VyLmdldERhdGEoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB0aGlzLmZpcmViYXNlVUlEID0gcmVzdWx0LnVpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhY2NlcHRzIGFuIGVtYWlsIHN0cmluZywgdGhhdCBpcyB1c2VkIHRvIHJlc2V0IHRoZSBlbWFpbCBvZiBhIHVzZXIuIE5vdGVcclxuICAgICAqIGFuIG9iamVjdCBpcyBjcmVhdGVkIHdpdGggdGhhdCBzdHJpbmcsIHNpbmNlIGZpcmViYXNlIHJlcXVpcmVzIGFuIG9iamVjdCBhcyBhIGFyZ3VtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbVtlbWFpbF0gZW1haWwgVGhlIGVtYWlsIHRvIHNlbmQgdGhlIHJlc2V0IHBhc3N3b3JkIGVtYWlsIHRvLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgdXNlcidzIHBhc3N3b3JkIGlzIHJlc2V0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9SZXNldFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdXNlciA9IHsgZW1haWw6IGVtYWlsIH07XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnJlc2V0UGFzc3dvcmQodXNlcilcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5yZXNldFBhc3N3b3JkU3VjY2VzcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEaWFsb2cgY2xvc2VkLlwiKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNlbmRpbmcgcGFzc3dvcmQgcmVzZXQgZW1haWw6IFwiICsgZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHBhc3N3b3JkIHJlc2V0IGZhaWxlZC5cclxuICAgICAgICAgICAgICAgIGRpYWxvZ3MuZ2VuZXJpY0RpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRmFpbGVkIFJlc2V0dGluZyBQYXNzd29yZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHJlc2V0IHBhc3N3b3JkXFxuXCIgKyBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhY2NlcHRzIGEgVXNlclZpZXdNb2RlbCBvYmplY3QgdG8gcmVnaXN0ZXIgYSB1c2VyIGluIGZpcmViYXNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbVtpbl0gdXNlciBUaGUgdXNlciB0byBiZSByZWdpc3RlcmVkIHdpdGggZmlyZWJhc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIHJlZ2lzdGVyZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1JlZ2lzdGVyKHVzZXI6IFVzZXJWaWV3TW9kZWwpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuY3JlYXRlVXNlcih1c2VyLmdldERhdGEoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgYWNjZXB0cyBhIFVzZXJWaWV3TW9kZWwgb2JqZWN0IHRvIHN0b3JlIGluIHRoZSBmaXJlc3RvcmUgZGF0YWJhc2UgaW4gdGhlIFwidXNlcnNcIlxyXG4gICAgICogY29sbGVjdGlvbi4gQWZ0ZXIgdGhlIFByb21pc2UgaXMgcmVzb2x2ZWQsIGEgcmVmZXJlbmNlIHRvIHRoYXQgb2JqZWN0IGlzIHJldHVybmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbVtpbl0gdXNlciBUaGUgdXNlciB0byBiZSBzdG9yZWQgaW4gZmlyZXN0b3JlXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgYWRkVXNlclRvQ29sbGxlY3Rpb24odXNlcjogVXNlclZpZXdNb2RlbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IFVzZXIgPSB1c2VyLmdldFRvdGFsRGF0YSgpO1xyXG4gICAgICAgIGZpcmViYXNlLnNldFZhbHVlKCcvdXNlcnMvJyArIFVzZXIudWlkLCBVc2VyKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnQWRkZWQgVXNlciB3aXRoOlwiICsgZG9jLmtleScpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgYWNjZXB0cyB0aGUgaWQgb2YgYSBjb2xsZWN0aW9uIHN0b3JlZCBpbiBmaXJlc3RvcmUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gaXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtW2luXSBjb2xsZWN0aW9uSWQgVGhlIG5hbWUgb2YgdGhlIGNvbGxlY3Rpb24geW91IHdhbnQgcmVmZXJlbmNlIHRvLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gYSByZWZlcmVuY2UgdG8gdGhhdCBjb2xsZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmaXJlc3RvcmUuZmlyZXN0b3JlKCkuY29sbGVjdGlvbihjb2xsZWN0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBwcml2YXRlIG1ldGhvZCBnZXRzIHRoZSBwb3N0cyBpbiB0aGUgcG9zdCBjb2xsZWN0aW9uIGluIGZpcmVzdG9yZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIGFmdGVyIGNhbGxpbmcgZ2V0IG9uIHRoZSBwb3N0IGNvbGxlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UG9zdERhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENvbGxlY3Rpb24uZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZURhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDb2xsZWN0aW9uLmdldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TWVzc2FnZXNEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzQ29sbGVjdGlvbi5nZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXNlcihmaXJlYmFzZVVJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmdldFZhbHVlKFwiL3VzZXJzL1wiICsgZmlyZWJhc2VVSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9yIGluaXRpYWxpemF0aW9uIHB1cnBvc2VzLiBTZXRzIHBvc3RDb2xsZWN0aW9uIHRvIGEgcmVmZXJlbmNlIHRvIHRoZSBwb3N0cyBjb2xsZWN0aW9uXHJcbiAgICAgKiBpbiBmaXJlc3RvcmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3N0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLnBvc3RDb2xsZWN0aW9uID0gdGhpcy5nZXRDb2xsZWN0aW9uKFwicG9zdHNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFJlc291cmNlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnJlc291cmNlQ29sbGVjdGlvbiA9IHRoaXMuZ2V0Q29sbGVjdGlvbihcInJlc291cmNlc1wiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRNZXNzYWdlc0RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlc0NvbGxlY3Rpb24gPSB0aGlzLmdldENvbGxlY3Rpb24oXCJtZXNzYWdlc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHB1c2hlcyBhbGwgdGhlIHBvc3RzIGluIHRoZSBwb3N0IGNvbGxlY3Rpb24gaW4gZmlyZXN0b3JlIGludG8gdGhlIHBvc3RBcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgYWZ0ZXIgYWxsIHBvc3RzIGFyZSBwdXNoZWQgaW50byB0aGUgcG9zdEFycmF5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UG9zdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9zdERhdGEoKVxyXG4gICAgICAgICAgICAudGhlbihkb2N1bWVudFJlZiA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudFJlZi5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3N0QXJyYXkucHVzaChkb2MuZGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZXNEYXRhKClcclxuICAgICAgICAgICAgLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRSZWYuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXNBcnJheS5wdXNoKGRvYy5kYXRhKCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgcG9zdCBPYnNlcnZhYmxlQXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB0aGUgc2l6ZSBvZiB0aGUgcG9zdCBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNpemVPZlBvc3RzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEFycmF5Lmxlbmd0aDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRTaXplT2ZNZXNzYWdlcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzQXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgYWNjZXB0cyBhIGZpcmVzdG9yZSBjb2xsZWN0aW9uLCBhbmQgYSBrZXkgdG8gYSBkb2N1bWVudCBpbiB0aGF0IGNvbGxlY3Rpb24sXHJcbiAgICAgKiBpbiBvcmRlciB0byByZXR1cm4gdGhhdCBkb2N1bWVudC4gWW91IG11c3QgY2FsbCAuZ2V0KCkgb24gdGhlIHJldHVybmVkIGRvY3VtZW50XHJcbiAgICAgKiB0byBnZXQgdGhlIGRhdGEgaW4gdGhlIGRvY3VtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbVtjb2xsZWN0aW9uXSAgIEEgcmVmZXJlbmNlIHRvIGEgY29sbGVjdGlvbiBpbiBmaXJlc3RvcmVcclxuICAgICAqIEBwYXJhbVtrZXldIGtleSBUaGUga2V5IG9mIHRoZSBkb2N1bWVudCB5b3Ugd2FudCB0byByZXRyaWV2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RG9jdW1lbnRGcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnksIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEFkdmlzb3IoYWR2aXNvcjogb2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnB1c2goXHJcbiAgICAgICAgICAgICcvYWR2aXNvcnMnLFxyXG4gICAgICAgICAgICBhZHZpc29yXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRUdXRvcnModHV0b3I6IG9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5wdXNoKFxyXG4gICAgICAgICAgICAnL3R1dG9ycycsXHJcbiAgICAgICAgICAgIHR1dG9yXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRBcHBvaW50bWVudHMoYXBwb2ludG1lbnRzOiBvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucHVzaChcclxuICAgICAgICAgICAgJy9hcHBvaW50bWVudHMnLFxyXG4gICAgICAgICAgICBhcHBvaW50bWVudHNcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFsbCBjdXJyZW50IGFkdmlzb3JzIGluIHRoZSBhZHZpc29yIGNhdGVnb3J5IGluIGZpcmViYXNlLlxyXG4gICAgICogQHBhcmFtIFtjYWxsYmFja10gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGFmdGVyIHRoZSBxdWVyeSBmaW5pc2hlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcXVlcnlUdXRvcnMoY2FsbGJhY2s/OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5nZXRWYWx1ZSgnL3R1dG9ycycpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcXVlcnlVc2VycyhjYWxsYmFjaz86IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMnKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWVyeUFwcG9pbm1lbnRzKGNhbGxiYWNrPzogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuZ2V0VmFsdWUoJy9hcHBvaW5tZW50cycpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFJlc291Y2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlRGF0YSgpXHJcbiAgICAgICAgICAgIC50aGVuKGRvY3VtZW50UmVmID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50UmVmLmZvckVhY2goZG9jID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlQXJyYXkucHVzaChkb2MuZGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlc291cmNlTGVuZ3RoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb0FkZEFwcG9pbnRtZW50KGFwcG9pbnRtZW50OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBzdHVkZW50SWQgPSBhcHBvaW50bWVudC5zdHVkZW50SWQ7XHJcbiAgICAgICAgbGV0IHJlY2lldmVySWQgPSBhcHBvaW50bWVudC5yZWNpZXZlcklkO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRBcHBvaW50bWVudHMoYXBwb2ludG1lbnQpXHJcbiAgICAgICAgICAgIC8qLnRoZW4oZG9jID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBkb2Mua2V5O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHdlIGFkZCB0aGUga2V5IHRvIGJvdGggdGhlIHN0dWRlbnQgYW5kIHR1dG9yL2Fkdmlzb3Igc28gdGhleSB3aWxsIGJlIG5vdGlmaWVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlyZWJhc2UucHVzaCgnL3VzZXJzLycgKyBzdHVkZW50SWQgKyAnL2FwcG9pbnRtZW50cycsIHsga2V5OiBrZXkgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhcIkVSUk9SIElOIEFERCBBUFBPSU5UTUVOVDogXCIgKyBlcnIpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbigoKSA9PiAge3JldHVybiBmaXJlYmFzZS5wdXNoKCcvdHV0b3JzLycgKyByZWNpZXZlcklkICsgJy9hcHBvaW50bWVudHMnLCB7a2V5OiBrZXl9KX0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4oKCkgPT4gXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIGZpcmViYXNlLnNldFZhbHVlKCcvYXBwb2ludG1lbnRzLycgKyBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLi4uYXBwb2ludG1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFwcG9pbnRtZW50SWQ6IGtleVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgKi9cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZUZpcmViYXNlKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5nZXRWYWx1ZShwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXBwb2ludG1lbnRzOiBBcnJheTxvYmplY3Q+O1xyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBvaW50bWVudHModXNlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuZ2V0VmFsdWUoJy91c2Vycy8nICsgdXNlcklkICsgJy9hcHBvaW50bWVudHMvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1lbnRvckFwcG9pbnRtZW50cyh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5nZXRWYWx1ZSgnL3R1dG9ycy8nICsgdXNlcklkICsgJy9hcHBvaW50bWVudHMvJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnRzLkkgPSBuZXcgbXlGaXJlYmFzZSgpOyJdfQ==