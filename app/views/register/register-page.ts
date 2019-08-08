/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { registerViewModel } from "./register-view-model"
import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";


export function onNavigatedTo(args) {
    const page = args.object;
    page.bindingContext = new registerViewModel();

}


export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    this.major = this.WSU_Majors[args.newIndex];
}


