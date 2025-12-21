const http = require('http');

const makeRequest = (path, method, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(responseBody));
                    } catch (e) {
                        resolve(responseBody);
                    }
                } else {
                    reject({ status: res.statusCode, body: responseBody });
                }
            });
        });

        req.on('error', (e) => reject({ message: e.message }));
        req.write(data);
        req.end();
    });
};

const runVerification = async () => {
    const testUser = {
        name: 'Test Student',
        email: `teststudent_${Date.now()}@example.com`,
        password: 'securePassword123', // Admin-created password
        department: 'Computer Science',
        year: '2',
        studentId: `ROLL${Date.now()}`
    };

    console.log('--- STARTING VERIFICATION ---');
    console.log('1. Admin creates student:', testUser.studentId);

    try {
        // Step 1: Register
        await makeRequest('/users/student/register', 'POST', testUser);
        console.log('✅ Registration Successful');

        // Step 2: Login
        console.log('\n2. Student attempts login with Roll Number & Password...');
        const loginPayload = {
            rollNumber: testUser.studentId,
            password: testUser.password
        };

        const loginRes = await makeRequest('/users/student/login', 'POST', loginPayload);
        console.log('✅ Login Successful!');
        console.log('   Token received:', loginRes.token ? 'Yes' : 'No');
        console.log('   Role:', loginRes.role);
        console.log('   User:', loginRes.name);

        console.log('\n--- VERIFICATION COMPLETE: SUCCESS ---');
        console.log('Confirmed: Student can login using the password set by Admin.');

    } catch (error) {
        console.error('\n❌ VERIFICATION FAILED');
        console.error('Error:', error);
    }
};

runVerification();
