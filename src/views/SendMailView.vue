<template>
    <div class="container mt-5">
        <div class="row">
            <h1 class="text-center">Send Mail</h1>
            <form @submit.prevent="sendEmail">
                <div class="mb-3">
                    <label for="to" class="form-label">To: (If you need to send multiple users, separate them with
                        comma)</label>
                    <input type="text" class="form-control" id="to" v-model="emailData.to" required />
                    <div v-if="errors.to" class="text-danger">{{ errors.to }}</div>
                </div>
                <div class="mb-3">
                    <label for="subject" class="form-label">subject:</label>
                    <input type="text" class="form-control" id="subject" v-model="emailData.subject" required />
                    <div v-if="errors.subject" class="text-danger">{{ errors.subject }}</div>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message:</label>
                    <textarea class="form-control" name="message" v-model="emailData.message" rows="3"></textarea>
                    <div v-if="errors.message" class="text-danger">{{ errors.message }}</div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary me-2">Send Mail</button>
                </div>
            </form>

            <div class="alert alert-primary status" role="alert" v-if="status == 'Y'">
                Email sent to {{ to }} successfully!
                <button type="button" style="float: right;" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="close"></button>
            </div>

            <div class="alert alert-danger status" role="alert" v-if="status == 'F'">
                Failed to send email
                <button type="button" style="float: right;" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="close"></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            emailData: {
                to: '',
                subject: '',
                message: ''
            },
            errors: {
                to: '',
                subject: '',
                message: ''
            },
            status: ''
        };
    },
    methods: {
        close() {
            this.status = '';
        },
        validateEmail(email) {
            // validate email format
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return re.test(String(email).toLowerCase());
        },

        validateFields() {
            let valid = true;

            // validate to
            const emails = this.emailData.to.split(',').map(email => email.trim());
            if (!this.emailData.to) {
                this.errors.to = 'Recipient emails are required';
                valid = false;
            } else {
                // validate all emails
                for (let email of emails) {
                    if (!this.validateEmail(email)) {
                        this.errors.to = `Invalid email format: ${email}`;
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    this.errors.to = '';
                }
            }


            // validate subject
            if (!this.emailData.subject) {
                this.errors.subject = 'Subject is required';
                valid = false;
            } else {
                this.errors.subject = '';
            }

            // validate message
            if (!this.emailData.message) {
                this.errors.message = 'Message cannot be empty';
                valid = false;
            } else {
                this.errors.message = '';
            }

            return valid;
        },

        async sendEmail() {
            // validate params
            if (!this.validateFields()) {
                return;
            }

            const emails = this.emailData.to.split(',').map(email => email.trim());

            try {
                const response = await axios.post('https://sendmail-fqquxhhbva-uc.a.run.app', {
                    to: emails,
                    subject: this.emailData.subject,
                    text: this.emailData.message,
                    html: `<p>${this.emailData.message}</p>`
                });
                console.log(response)
                this.status = 'Y'
            } catch (error) {
                console.error('Error sending email:', error);
                this.status = 'F';
            }
        }
    }
};
</script>

<style scoped>
.status {
    margin-top: 20px;
}
</style>