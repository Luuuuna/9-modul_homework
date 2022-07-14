let downloadImage = document.querySelector(".image");


const btnClick = document.querySelector(".btn");


if(localStorage.length > 0){
    const raw = localStorage.getItem('imageList');
    const imageReturn = JSON.parse(raw);
    for (let key of imageReturn) {
        let imageDiv = `<div class="image" style="background-image:url(${key.download_url})"></div>`;
        downloadImage.innerHTML += imageDiv;
    }
}


btnClick.addEventListener("click", async () => {
    downloadImage.innerHTML = '';
    let valuePage = +document.querySelector(".input_page").value;
    let valueLimit = +document.querySelector(".input_limit").value;
    
    if ((valuePage < 1 || valuePage > 10 || isNaN(valuePage)) && (valueLimit < 1 || valueLimit > 10 || isNaN(valueLimit))) {
        localStorage.clear();
        const allFalse = `<div class="result">Номер страницы и лимит вне диапазона от 1 до 10</div>`;
        downloadImage.innerHTML = allFalse;
    } else {
        if (valuePage < 1 || valuePage > 10 || isNaN(valuePage)) {
            localStorage.clear();
            const pageFalse = `<div class="result">Номер страницы вне диапазона от 1 до 10</div>`;
            downloadImage.innerHTML = pageFalse;
        } else {
            if (valueLimit < 1 || valueLimit > 10 || isNaN(valueLimit)) {
                localStorage.clear();
                const limitFalse = `<div class="result">Лимит вне диапазона от 1 до 10</div>`;
                downloadImage.innerHTML = limitFalse;
            } else {
                let listLink = `https://picsum.photos/v2/list?page=${valuePage}&limit=${valueLimit}`;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', listLink);
                xhr.send();
                xhr.onload = function() {
                    if (xhr.status != 200) { 
                        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                    } else { 
                        const data = JSON.parse(xhr.response);
                        localStorage.clear();
                        localStorage.setItem('imageList', JSON.stringify(data));
                        data.forEach((image, index) => {
                            let imageDiv = `<div class="image" style="background-image:url(${data[index].download_url})"></div>`;
                            downloadImage.innerHTML += imageDiv;
                        });
                    }
                }
            }
        }
    }
});