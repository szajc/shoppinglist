
const toast = (textInput, color) => {
    const root = document.getElementById('forToast');
    const toastElement = document.createElement("div"); 
    const p = document.createElement("p");
    p.innerHTML = textInput;
    root.appendChild(toastElement);
    toastElement.className = 'toast';
    toastElement.style.backgroundColor = color==='green' ? '#7EE884' : '#EA3B2D';

    toastElement.appendChild(p);

    setTimeout(() => {
        toastElement.remove();
    }, 3000);
}

export default toast;