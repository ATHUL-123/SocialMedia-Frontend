 const validateForm = (formData) => {
    return new Promise((resolve, reject) => {
        const { userName, email, password, password2, phone } = formData;
       
        // Basic validation
        if (!userName || !email || !password || !password2 || !phone) {
            reject('Please fill in all fields');
            return;
        }
       console.log('1');
        // Username validation: Allows only alphabets, numbers, underscores, and hyphens, with a length between 3 and 20 characters
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!usernameRegex.test(userName)) {
            reject('Username should be between 3 and 20 characters and can contain alphabets, numbers, underscores, and hyphens only');
            return;
        }
        console.log('2');
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            reject('Please enter a valid email address');
            return;
        }
        console.log('3');
        // Password validation: Requires at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])[\w!@#$%^&*()_+}{":;'?/>.<,]{8,}$/;

        if (!passwordRegex.test(password)) {
            reject('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
            
        }
        console.log('4');
         // Phone number validation: Requires exactly 10 digits
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            reject('Phone number must contain exactly 10 digits');
            return;
        }
        console.log('5');
        // Password match validation
        if (password !== password2) {
            reject('Passwords do not match');
            return;
        }

       
        console.log('6');

        // If all validations pass, resolve the promise
        resolve();
    });
};

export default validateForm