// This file initializes the application, sets up event listeners, and manages the overall application state.

document.addEventListener('DOMContentLoaded', () => {
    const whiteboard = document.getElementById('whiteboard');
    const toolsContainer = document.getElementById('tools');
    const aiAssistantButton = document.getElementById('ai-assistant-button');

    // Initialize the whiteboard
    initWhiteboard(whiteboard);

    // Set up tool event listeners
    setupToolListeners(toolsContainer);

    // Set up AI assistant button listener
    aiAssistantButton.addEventListener('click', () => {
        openAIChat();
    });

    // Function to initialize the whiteboard
    function initWhiteboard(whiteboardElement) {
        // Set up the drawing context and other initial settings
        // This function will be defined in whiteboard.js
        initializeDrawing(whiteboardElement);
    }

    // Function to set up tool listeners
    function setupToolListeners(toolsElement) {
        const toolButtons = toolsElement.querySelectorAll('.tool-button');
        toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const toolType = button.dataset.tool;
                switchTool(toolType);
            });
        });
    }

    // Function to switch tools
    function switchTool(toolType) {
        // This function will be defined in tools.js
        activateTool(toolType);
    }

    // Function to open AI chat
    function openAIChat() {
        // This function will be defined in ai-assistant.js
        startAIChat();
    }
});