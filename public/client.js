const inputFile = document.getElementById('image');
const inputFileLebel = document.querySelector("label[for='image']");
const dropDownArrow = document.querySelector('.selector img');
const options = document.querySelector('.options');
const option = document.querySelectorAll('.option');
const optionSelector = document.querySelector('.selector input')
const operationField = document.querySelectorAll('.operation-field');
const color = document.getElementById('color');
const loader = document.querySelector('.loader');
const resultContainer = document.querySelector('.resultContainer');
const submitButton = document.querySelectorAll("button[type='submit']");
const errorPopupBox = document.querySelector('.errorPopupBox');
const aspectRatio = document.getElementById('aspect-ratio');
const resizeHeightField = document.getElementById('height');
const greyscale = document.getElementById('greyscale');
const blur = document.getElementById('blur');
const allWidthField = document.querySelectorAll('input[name="width"]');
const allHeightField = document.querySelectorAll('input[name="height"]');
let imageFile,apiEndpoint='/api/v1';

window.addEventListener('load', ()=>{
    loader.classList.remove('active');
    loader.children[0].textContent = 'Processing Please Wait...';
})


blur.value = 0;

inputFile.addEventListener('change', async (e)=>{
    imageFile = e.target.files[0];
    let imageName = imageFile.name;
    inputFileLebel.innerHTML = `<i class="fa-solid fa-image"></i> ${imageName}`;

    const uploadingData = new FormData();
    uploadingData.append('image',imageFile);  
    loader.classList.add('active');
    try {
        const {data:{width,height}} = await axios.post(`${apiEndpoint}/imageInfo`, uploadingData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        for (let i = 0; i < allWidthField.length; i++) {
            const element = allWidthField[i];
            element.value = width;
        }
        for (let i = 0; i < allHeightField.length; i++) {
            const element = allHeightField[i];
            element.value = height;
        }
    } catch (error) {
        let errorMessage  = error.response.data.msg;
        errorPopupBox.innerHTML = errorMessage;
        errorPopupBox.classList.add('active');
        setTimeout(()=>{errorPopupBox.classList.remove('active')},3000);
    }
    loader.classList.remove('active');
});

aspectRatio.addEventListener('change', ()=>{
    if(aspectRatio.checked){ resizeHeightField.style.display = 'none'}
    else {resizeHeightField.style.display = 'block';}
    console.log(aspectRatio.checked);
})

dropDownArrow.addEventListener('click', (e)=>{
    options.classList.toggle('active');
    dropDownArrow.classList.toggle('lower');
});

option.forEach(e=>{
    e.addEventListener('click', ()=>{
        optionSelector.value = e.textContent;
        operationField.forEach((field)=> {if(!field.classList.contains('active')) field.classList.add('active')});
        document.querySelector(`.${e.textContent.toLowerCase()}`).classList.toggle('active');
    })
})

var typed = new Typed('#typingAnimatedText', {
    strings: ['Resizing', 'Croping', 'Rotating'],
    typeSpeed: 80,
    backSpeed: 80,   
    loop: true
  });

submitButton.forEach(button=>{
    button.addEventListener('click', async ()=>{
        //Selecting the operation
        const operation = button.className.substring(6).toLowerCase();
        let successOfOperation = true;

        //Appending the image data to the FormData()
        const uploadingData = new FormData();
        uploadingData.append('image',imageFile);
        uploadingData.append('greyScale', greyscale.checked);
        uploadingData.append('blur', 0 ? (!blur) : blur.value);

        //Selecting all child inputs
        let parentChilds = button.parentNode.children;

        for(let i=0; i<parentChilds.length-1; i++){
            if(parentChilds[i].style.display=='none') continue;

            let inputElement  = parentChilds[i].children[0];
            let nameOfData = parentChilds[i].children[1].textContent.split(' ').join('').toLowerCase();

            console.log(nameOfData);
            
            if(!inputElement.value){
                successOfOperation = false;
                parentChilds[i].classList.add('wrong-input');
                setTimeout(()=>{parentChilds[i].classList.remove('wrong-input')},1000);
            }
            else{
                let actualData = inputElement.value;
                if(inputElement.type==='checkbox') actualData = inputElement.checked;
                uploadingData.append(nameOfData, actualData);
            }
        }

        if(successOfOperation){
            loader.classList.add('active');
            try{
                const {data:{src,size}} = await axios.post(`${apiEndpoint}/${operation}`, uploadingData, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });

                resultContainer.innerHTML = `
                    <div class="cancelButton">
                        <span class="material-symbols-outlined">
                        close
                        </span>
                    </div>
                    <div class="childResult">
                        <img src="${src}"/>
                    </div>
                    <div class="childResult">
                        <div class="sizeField">Size: ${size} Bytes</div>
                        <a href='${src}' download><span class="material-symbols-outlined">download</span> Download</a>
                    </div>
                `;
                resultContainer.classList.add('active');
                document.querySelector('.cancelButton').addEventListener('click', ()=>{
                    resultContainer.classList.remove('active');
                });
            }catch(error){
                let errorMessage  = error.response.data.msg;
                errorPopupBox.innerHTML = errorMessage;
                errorPopupBox.classList.add('active');
                setTimeout(()=>{errorPopupBox.classList.remove('active')},3000);
            }
            loader.classList.remove('active');
        }
    })
})