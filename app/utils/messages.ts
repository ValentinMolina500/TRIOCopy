import ERROR_CODES from "./errorcodes";
import * as Dialogs from "tns-core-modules/ui/dialogs";

interface AlertOptions {
    title: string;
    message: string;
    okButtonText: string;
}
export class myDialogs {
    public genericDialog(alertProps: AlertOptions): any {
        return Dialogs.alert(alertProps);
    }

    public invalidCredentials(): any {
        return Dialogs.alert(ERROR_CODES["INV_CRED"]);
    }

    public resetPasswordSuccess(): any {
        return Dialogs.alert(ERROR_CODES["RESETPASS_OK"]);
    }

}

const dialogs = new myDialogs();
export default dialogs;

