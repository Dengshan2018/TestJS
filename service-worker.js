var callback;
self.addEventListener('install', event => {
	console.log('install');
});

self.addEventListener('activate', event => {
	console.log('active');
});

self.addEventListener('fetch', event => {
	console.log('fetch');
	if (event.request.url.startsWith("https://www.bing.com"))
	{
		callback = function(data) {
			event.respondWith(data.data);
		};
		self.clients.matchAll().then(function(clients) {
		  clients.forEach(function(client) {
			client.postMessage({
				url: event.request.url,
				data: 'my',
				id: 'id'
			});
		  });
		});

		if ('waitUntil' in event) {
			event.waitUntil(callback);
		}
	}
});

self.addEventListener('message', event => {
	console.log('message');
	switch (event.data.command)
	{
      case 'add':
          event.ports[0].postMessage({
            error: null,
			command: event.data.command,
			result: 'test'
          });
		  return;
	 case 'cache':
		fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
			event.ports[0].postMessage({
            error: null,
			command: event.data.command,
			result: response.clone()
          });
		return;
	case 'externalfetch':
		callback(event.data);
		return;
    }
});