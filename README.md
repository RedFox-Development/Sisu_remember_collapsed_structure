# Sisu study structure – keep it collapsed

Tampermonkey userscript to fix an annoying feature in Sisu

## Beginning

Have you noticed that in Sisu study structure page, when you collapse part of the structure and refresh or open the site in another tab, the structure is all over the page, completely open?

Well, it doesn't need to be like that.

## Present

Yes – I sent feedback of this unintuitive behavior and they responded that the request was being delivered to the devs. Great!

However – in the mean time, this userscript should be of help in keeping your sanity with the study structure page.

Since it uses wildcards in relevant places, you should be able to use this script with most of the Finnish universities that are using Sisu.

And if it doesn't work directly, just add another `@include` in your own script when loading it to Tampermonkey and it should work!

## Future

Well, I hope the devs add this functionality to the Sisu source code so that this script won't be needed..

But if they don't I think I need to update it in some point (if they change attributes and the script breaks..)

## Usage

Ok, install browser extension 'Tampermonkey' to your browser, Firefox likely is a good choice.

Then, right click the Tampermonkey icon and select 'Create a new script'.

And then the final part: copy-paste the code from the `sisu_remember_collapsed_structure.user.js` -file and save. Now test and be happy!

Not achieving happiness because your Uni using different address format? Add your own `@include` clause and re-try.
