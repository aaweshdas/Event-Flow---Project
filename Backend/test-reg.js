const http = require('http');

const data = JSON.stringify({
    email: '24B11CS001@adityauniversity.in',
    password: '12345'
});

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}, res => {
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
        const json = JSON.parse(body);
        const token = json.token;

        http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/api/registrations',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, res2 => {
            let body2 = '';
            res2.on('data', chunk => { body2 += chunk; });
            res2.on('end', () => {
                console.log(JSON.stringify(JSON.parse(body2), null, 2));
            });
        });
    });
});

req.write(data);
req.end();
