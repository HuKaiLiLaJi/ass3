<template>
    <div class="conatiner">
        <h1 class="text-center">You Can Ask Me Any Questions</h1>
        <div class="chat-container">
            <div class="messages">
                <div v-for="(message, index) in messages" :key="index"
                    :class="{ 'user-message': message.sender === 'user', 'ai-message': message.sender === 'ai' }">
                    <strong>{{ message.sender === 'user' ? 'You' : 'AI' }}:</strong> {{ message.content }}
                </div>
            </div>
            <div class="input-container">
                <input v-model="userInput" placeholder="Ask something..." @keyup.enter="sendMessage" />
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            messages: [], // Stores chat history
            userInput: "", // Stores user input
            apiUrl: "https://chat-fqquxhhbva-uc.a.run.app/", // Firebase Function URL
        };
    },
    methods: {
        // Send message to the AI API
        async sendMessage() {
            if (this.userInput.trim() === "") return;

            // Add the user's question to the message list
            this.messages.push({
                sender: "user",
                content: this.userInput,
            });

            const question = this.userInput; // Save user input
            this.userInput = ""; // Clear input field

            try {
                // Call Firebase Function to get AI response
                const response = await axios.post(this.apiUrl, {
                    question: question,
                });

                // Assume the returned JSON format is { answer: "AI's response" }
                this.messages.push({
                    sender: "ai",
                    content: response.data,
                });
            } catch (error) {
                console.error("Error:", error);
                this.messages.push({
                    sender: "ai",
                    content: "Sorry, something went wrong.",
                });
            }
        },
    },
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 700px;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #38ced3;
}

.messages {
    flex-grow: 1;
    overflow-y: auto;
    max-height: 900px;
    margin-bottom: 10px;
}

.user-message {
    align-self: flex-end;
    background-color: #d1e7dd;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
}

.ai-message {
    align-self: flex-start;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
}

.input-container {
    display: flex;
    gap: 10px;
}

input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>