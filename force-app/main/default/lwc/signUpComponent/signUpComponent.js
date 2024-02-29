import { LightningElement, track } from 'lwc';
import  registerUser  from '@salesforce/apex/userController.registerUser'; // Import Apex method for user registration

export default class SignUpComponent extends LightningElement {
    @track fullName = '';
    @track email = '';
    @track password = '';

    handleFullNameChange(event) {
        this.fullName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    async handleSignUp() {
        const newUser = {
            Name: this.fullName,
            Email: this.email,
            Password: this.password // Note: In a real-world scenario, you'd use better security practices, like hashing the password
        };

        try {
            const result = await registerUser({ newUser }); // Call the Apex method for user registration passing newUser as a parameter
            if (result === 'Success') {
                // User registration success message or redirect to login page
                console.log('User registered successfully.');
            } else {
                // Handle registration error
                console.error('Error during user registration.');
            }
        } catch (error) {
            // Handle other errors
            console.error('Error:', error);
        }
    }
}
