import { Page, getViewById } from "tns-core-modules/ui/page";
import { AppointmentFormViewModel } from './appointment-form-view-model';
import { ScrollView } from "tns-core-modules/ui/scroll-view";

export function onLoaded(args) {
	const page: Page = args.object;

	let scrollview: ScrollView = getViewById(page, 'main-scrollview') as ScrollView;
	scrollview.scrollBarIndicatorVisible = false;
	
	// page.bindingContext = new AppointmentFormViewModel(page.navigationContext.time, page.navigationContext.date, page.navigationContext.month, page.navigationContext.day);
	page.bindingContext = new AppointmentFormViewModel(page.navigationContext.timeData, page.navigationContext.advisor, page);
}