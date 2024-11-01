import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./components/App.vue";
import "./style.css";
import "tippy.js/dist/tippy.css";

createApp(App).use(createPinia()).mount("#app");

// disable the right click menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

function readInputFile(): void {
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;
    if (inputFile.files && inputFile.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const jsonData = JSON.parse(event.target?.result as string);
            // Process jsonData as needed for your application
            console.log(jsonData); // Replace this with your logic
        };
        reader.readAsText(inputFile.files[0]);
    } else {
        alert("Please select a file.");
    }
}

function saveOutputToFile(outputData: any): void {
    const blob = new Blob([JSON.stringify(outputData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.json'; // Specify the filename for download
    link.click();
}
