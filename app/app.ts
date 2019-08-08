import * as application from "tns-core-modules/application";
import { myFirebase } from "./utils/firebase";
import Firebase from "./utils/firebase";

Firebase.doInit();
application.run("app-root");
