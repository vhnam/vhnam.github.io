/**
 * Classic Analytics Web Tracking
 * @link https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingOverview
 */

// The Tracking Code Script—Part One
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

// The Tracking Code Script—Part Two
try {
	var pageTracker = _gat._getTracker("UA-66016963-1");
	pageTracker._trackPageview();
} catch(err) {}