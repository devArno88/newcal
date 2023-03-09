import { getRandomArrayElement } from "./arr";

export const appColors = {
    primary: "#1976d2",
    secondary: "#8CBBE9",
    caption: "#C0C0C0",
    dark: "#0d1117",
    background: "#161b22",
    card: "#0d1117",
    border: "#555",
    panel: "#22272D",
    text: {
        primary: "#ccc",
        secondary: "#fff",
    },
};

export const getFlatColor = () =>
    getRandomArrayElement([
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#95a5a6",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7",
        "#7f8c8d",
    ]);
