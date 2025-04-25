// This file contains the integration of the built-in AI assistant for the infinite whiteboard application.

const aiInput = document.getElementById('ai-input');
const aiOutput = document.getElementById('ai-output');
const aiButton = document.getElementById('ai-button');

// Function to send user input to the AI backend
async function sendToAI(input, image_data) {
    try {
        const response = await fetch('/api/ai/ask', { // Changed URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: input, image: image_data }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error communicating with AI backend:', error);
        return 'Sorry, I could not process your request.';
    }
}

// Event listener for the AI button
aiButton.addEventListener('click', async () => {
    const userInput = aiInput.value;
    if (userInput.trim() === '') return;

    aiOutput.innerHTML += `<div>User: ${userInput}</div>`;
    aiInput.value = '';

    const aiResponse = await sendToAI(userInput);
    aiOutput.innerHTML += `<div>AI: ${aiResponse}</div>`;
    aiOutput.scrollTop = aiOutput.scrollHeight; // Scroll to the bottom
});

// Optional: Function to handle pressing Enter key for input
aiInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        aiButton.click();
    }
});