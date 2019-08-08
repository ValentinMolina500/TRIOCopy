import { Page } from "tns-core-modules/ui/page";
import { SettingsViewModel } from "./settings-view-model";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";

export function onLoaded(args: any)
{
    const page: Page = args.object;

    page.bindingContext = new SettingsViewModel();
}