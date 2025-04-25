function ToolManager() {
    this.currentTool = 'pen'; // Default tool
    this.tools = {
        pen: {
            color: '#000000',
            size: 5
        },
        text: {
            font: 'Arial',
            size: 16,
            color: '#000000',
            alignment: 'left'
        },
        image: {
            src: '',
            width: 100,
            height: 100
        },
        rectangle: {
            border_color: '#000000',
            fill_color: '#ffffff',
            border_size: 2
        },
        circle: {
            border_color: '#000000',
            fill_color: '#ffffff',
            border_size: 2
        },
        line: {
            color: '#000000',
            size: 2
        }
    };
}

ToolManager.prototype.setCurrentTool = function(tool) {
    if (this.tools[tool]) {
        this.currentTool = tool;
    } else {
        console.error('Tool not found:', tool);
    }
};

ToolManager.prototype.getCurrentTool = function() {
    return this.currentTool;
};

ToolManager.prototype.configurePen = function(color, size) {
    this.tools.pen.color = color;
    this.tools.pen.size = size;
};

ToolManager.prototype.configureText = function(font, size, color, alignment) {
    this.tools.text.font = font;
    this.tools.text.size = size;
    this.tools.text.color = color;
    this.tools.text.alignment = alignment;
};

ToolManager.prototype.uploadImage = function(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        this.tools.image.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

ToolManager.prototype.getToolSettings = function() {
    return this.tools[this.currentTool];
};

const toolManager = new ToolManager();
export default toolManager;