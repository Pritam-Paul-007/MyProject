const smallImage = document.querySelectorAll('.gallery img');
const fullImage = document.querySelector('.full-img');
const modal = document.querySelector('.modal');

// smallImage.forEach((img)=>{
//     img.addEventListener('click',()=>{
//         modal.classList.add('open');
//         fullImage.classList.add('open');

//         const myImage = img.getAttribute("alt");
//         fullImage.src = `img/full/${myImage}.jpg`;

//     });
// });

/* this is an another way of showing the image of gallery */
const img = document.querySelector(".gallery");
img.addEventListener('click',(e)=>{
    const n = e.target.getAttribute("alt");
    fullImage.src = `img/full/${n}.jpg`;
    modal.classList.add("open");
    fullImage.classList.add("open");
    console.log("the image is clicked");
});

modal.addEventListener('click',(e)=>{
    if(e.target.classList.contains("modal")){
        modal.classList.remove("open");
        fullImage.classList.remove("open");
        fullImage.src = null;
    }
});