
self.addEventListener('install', event => {
	console.log('install');
});

self.addEventListener('activate', event => {
	console.log('active');
});

self.addEventListener('fetch', event => {
	console.log('fetch');
});