import { Page, getViewById } from "tns-core-modules/ui/page";
import { resTempViewModel } from "./res-template-view-model";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "image-source";
import { ListView } from "tns-core-modules/ui/list-view";

export function onNavigatedTo(args) {
    let page: Page = args.object as Page;
    let feed: ListView = getViewById(page, 'feed') as ListView;
    feed.
    page.bindingContext = new resTempViewModel(page.navigationContext.id);
}

export function onShareTap(event) {
    if (event.image) {
        let image = event.image;
        return SocialShare.shareUrl(image, "How would you like to share this?");
    }
    else {
        let image = event.link
        return SocialShare.shareUrl(image, "How would you like to share this?");
    }
}


export function onLikeTap(args) {
    console.log(args.object.color);
    let icon = args.object;
    if (icon.color == "#8A1515") {
        icon.color = "gray";
    }

    else {
        icon.color = "#8A1515";
    }
}

export function onFavTap(args) {
    console.log(args.object.color);
    let icon = args.object;
    if (icon.color == "#FFD700") {
        icon.color = "gray";
    }

    else {
        icon.color = "#FFD700";
    }
}

export function resourceTemplateSelector(item) {
    if (item.type === "FAQ") {
        return "FAQ";
    }

    if (item.type === "Financial Aid") {
        return "Financial Aid";
    }

    if (item.type === "Resource") {
        return "Resource";
    }

    else {
        return "Browse All";
    }

}