import Echo from "laravel-echo"

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '61ced07f1c5be563dc8fy',
    cluster: 'ap1',
    encrypted: true
    });