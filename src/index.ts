import { Favicon } from 'favorite-icon';
import './common';

function setFavicon(url: string) {
    const preview = document.querySelector<HTMLImageElement>('#preview');
    Favicon.set(url, preview);
    Favicon.set(url);
}

let timerId = 0;
let counter = 0;

const radios = document.querySelectorAll<HTMLInputElement>('.icon-list input');
for (let i = 0; i < radios.length; i++) {
    const item = radios[i];
    item.onclick = () => {
        clearInterval(timerId);
        setFavicon(item.value);
    };
}

document.querySelector<HTMLInputElement>('#button-set').onclick = function() {
    const value = document.querySelector<HTMLInputElement>('#favicon-src').value;
    clearInterval(timerId);
    setFavicon(value);    
};

document.querySelector<HTMLInputElement>('#switcher').onclick = function() {
    clearInterval(timerId);

    timerId = setInterval(() => {
        counter++;
        if (counter >= radios.length) {
            counter = 0;
        }

        setFavicon(radios[counter].value);
    }, 1000);
};