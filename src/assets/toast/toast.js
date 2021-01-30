
const toast = (textInput) => {
    const root = document.getElementById('forToast');
    const toastElement = document.createElement("div"); 
    const p = document.createElement("p");
    p.innerHTML = textInput;
    root.appendChild(toastElement);
    toastElement.className = 'toast';
    toastElement.appendChild(p);

    setTimeout(() => {
        toastElement.remove();
    }, 3000);
}

export default toast;