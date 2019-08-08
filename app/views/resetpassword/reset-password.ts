import resetViewModel = require('./reset-view-model');

export function onLoaded(args) {
    const page = args.object;
    page.bindingContext = new resetViewModel.resetViewModel();
}

