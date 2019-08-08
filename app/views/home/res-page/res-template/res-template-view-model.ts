import observableModule = require("tns-core-modules/data/observable");
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import{ getFrameById } from "tns-core-modules/ui/frame";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { myFirebase } from "../../../../utils/firebase";

const firebase = require("../../../../utils/firebase").I as myFirebase;

export class resTempViewModel extends observableModule.Observable {

    public resources: ObservableArray<object> = new ObservableArray();

    constructor(id: string) {
        super();

        switch(id) {
            case "FAQ":
                console.log("this is FAQ");
                break;
            case "WSU":
                console.log("This is WSU");
                break;
            case "Aid":
                console.log("This is Aid");
                break;
            case "Browse":
                console.log("This is Browse");
                break;
            default:
                break;
        }
        
        if(!firebase.retrievedResources)
        {
            firebase.setResouces()
                .then(() => {
                    for( let i = 0; i < firebase.getResourceLength(); i++)
                    {
                        this.resources.push(firebase.resourceArray.getItem(i));
                    }

                })
            firebase.retrievedResources = true;
        } 
        else
        {
            for (let i = 0; i < firebase.getResourceLength(); i++)
            {
                this.resources.push(firebase.resourceArray.getItem(i)); 
            }
        }
    }
    
    public onItemTap(args: ItemEventData)
    {
        const event: any = this.resources.getItem(args.index)

        const frame = getFrameById('topmost');

        frame.navigate({
            moduleName: "/views/webview/webview",
            context: {
                link: event.link
            }
        })
    }

    public goBack(args)
    {
        const button = args.object;
        const page = button.page;

        page.frame.goBack();
    }
}

    
