let submitButton = document.getElementById('submit');

// FETCHING CONFIG FILE DATA
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');

$('#loadingDiv').fadeOut(300);

// ADD LISTENERS WHILE THE PAGE GETS LOADED
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	let tab = tabs[0];
	console.log('sampleFunction', sampleFunction); // here the helper function is working
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: sampleListener,
	});
});

submitButton.addEventListener('click', async () => {
	const [tab, url] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	const data = { data: { personName: 'sathish' }, configObject: { function: sampleFunction, valueFromPopup: 'fromPopup' } };
	console.log('popup data', data);
	await chrome.tabs.sendMessage(tab.id, data);
});

// PAGE LISTENER RECEIVES THE DATA FROM POPUP
function sampleListener() {
	chrome.runtime.onMessage.addListener(function onMessage({ data: msg, configObject }) {
		console.table('listener data', msg, configObject);
		// console.log('sampleFunction', sampleFunction); //here we need helper function
	});
}
