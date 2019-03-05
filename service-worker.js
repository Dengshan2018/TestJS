
webkit.messageHandlers.agaveserviceworker.postMessage('execute');

self.addEventListener('install', event => {
	console.log('install');
	webkit.messageHandlers.agaveserviceworker.postMessage('install');
});

self.addEventListener('activate', event => {
	console.log('active');
	webkit.messageHandlers.agaveserviceworker.postMessage('activate');
});

self.addEventListener('fetch', event => {
	console.log('fetch');
	webkit.messageHandlers.agaveserviceworker.postMessage('fetch');
});