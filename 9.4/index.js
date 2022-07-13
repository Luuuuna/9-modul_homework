let downloadImage = document.querySelector(".image");

const btnSubmit = document.querySelector(".btn_submit");

btnSubmit.addEventListener("click", async () => {
    downloadImage.innerHTML = '';
  
  const valueWigth = document.querySelector(".input_width").value;
  const valueHeigth = document.querySelector(".input_heigth").value;
  
const useRequest = () => {
        return fetch(`https://picsum.photos/${valueWigth}/${valueHeigth}`)
        .then((response) => {
            const linkImage = response.url;            
            return linkImage;
        })
        .then((json) => { return json })
        .catch(() => { console.log('error')});
    }

    
    if (valueWigth < 100 || valueWigth > 300 || valueHeigth < 100 || valueHeigth > 300 ||  isNaN(+valueHeigth) ||  isNaN(+valueWigth)) {
        let valueFalse = `<div class="value_false">одно из чисел вне диапазона от 100 до 300</div>`;
        downloadImage.innerHTML = valueFalse;
    } else {
        const requestResult = await useRequest();
        console.log('ok');
        let imageDiv = `<div class="image" style="background-image: url(${requestResult})"></div>`;
        downloadImage.innerHTML += imageDiv; 
    }
})