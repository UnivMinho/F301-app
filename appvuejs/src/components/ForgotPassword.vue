<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-navbar">
            <div class="container-fluid">
                <!-- Logo or Brand Title -->
                <h1 class="fw-bold text-primary m-0">Go<span class="text-white">Help</span></h1>
            </div>
        </nav>
        <!-- Main content container with custom top margin -->
        <div class="container d-flex justify-content-center" style="margin-top: 80px;">
            <div class="card text-center" style="width: 350px;">
                <div class="card-header h5 text-white bg-primary">Password Reset</div>
                <div class="card-body px-5">
                    <p class="card-text py-2">
                        Introduza o seu email para receber um link de reset da password.
                    </p>
                    <div class="form-outline form-group">
                        <form @submit.prevent="sendResetEmail">
                            <input type="email" v-model="email" class="form-control" placeholder="Enter your email" required />
                            <button id="resetBtn" type="submit" class="btn btn-primary w-100 mt-3">Reset password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
    data() {
        return {
            email: '',
        };
    },
    methods: {
        sendResetEmail() {
            // Replace these values with your EmailJS User ID, Service ID, and Template ID
            const USER_ID = 'B6v_dgycMt9reIwv9';
            const SERVICE_ID = 'service_fpsolkc';
            const TEMPLATE_ID = 'template_svck3ws';

            // Generate a random reset token (replace this with your actual token generation logic)
            const resetToken = Math.random().toString(36).substring(7);

            // Send the reset email using EmailJS
            emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: this.email, resetToken: resetToken }, USER_ID)
                .then(response => {
                    console.log('Reset email sent!', response);
                    alert('Reset email sent! Check your inbox.');
                    // Store reset token and email in localStorage
                    localStorage.setItem('resetToken', resetToken);
                    localStorage.setItem('resetEmail', this.email);
                    this.$router.push('/resetPassword');
                })
                .catch(error => {
                    console.error('Error sending reset email:', error);
                    alert('Failed to send reset email. Please try again later.');
                });
        },
    },
};
</script>

<style scoped>
#resetBtn {
    margin-top: 20px;
}
</style>