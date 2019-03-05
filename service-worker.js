
self.addEventListener('install', event => {
	console.log('install');
});

self.addEventListener('activate', event => {
	console.log('active');
});

self.addEventListener('fetch', event => {
	console.log('fetch');
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
    }
});