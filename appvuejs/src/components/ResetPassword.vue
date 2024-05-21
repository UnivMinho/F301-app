<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-navbar">
            <div class="container-fluid">
                <!-- Logo or Brand Title -->
                <h1 class="fw-bold text-primary m-0">Go<span class="text-white">Help</span></h1>
            </div>
        </nav>

        <!-- Main content container with password reset card -->
        <div class="container d-flex justify-content-center" style="margin-top: 80px;">
            <div class="card text-center" style="max-width: 350px;">
                <div class="card-header h5 text-white bg-primary">Password Reset</div>
                <div class="card-body px-5">
                    <p class="card-text py-2">
                        Introduza o seu email para receber um link de reset da password.
                    </p>
                    <div class="form-outline">
                        <form @submit.prevent="resetPassword">
                            <div class="mb-3">
                                <input type="email" v-model="email" class="form-control w-100" placeholder="Enter your email" required />
                            </div>
                            <div class="mb-3">
                                <input type="text" v-model="resetToken" class="form-control w-100" placeholder="Enter reset token" required />
                            </div>
                            <div class="mb-3">
                                <input type="password" v-model="newPassword" class="form-control w-100" placeholder="Enter new password" required />
                            </div>
                            <button id="resetBtn" type="submit" class="btn btn-primary w-100">Reset password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
export default {
    data() {
        return {
            email: localStorage.getItem('resetEmail') || '',
            resetToken: '', // Reset token entered by the user
            newPassword: '',
        };
    },
    methods: {
        resetPassword() {
            const storedResetToken = localStorage.getItem('resetToken');
            console.log('Stored reset token:', storedResetToken);
            if (this.resetToken === storedResetToken) {
                // falta a logica de mudar password
                alert('Password reset successfully!');
                // Clear stored reset token and email
                localStorage.removeItem('resetToken');
                localStorage.removeItem('resetEmail');
                // Redirect to login page
                this.$router.push('/');
            } else {
                alert('Invalid reset token');
            }
        },
    },
};
</script>

<style scoped>
#resetBtn {
    margin-top: 10px;
}

.form-outline {
    margin-top: 20px;
    width: 100%;
}
</style>