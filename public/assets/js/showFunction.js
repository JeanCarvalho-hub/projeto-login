const box = document.querySelector('.div-list-form');
const btnForm = document.querySelector('.btn-close');
const btnAdd = document.querySelector('.btn-add-link');

btnAdd.addEventListener('click', e => {
    e.preventDefault();
    box.style.display = 'flex';
})

btnForm.addEventListener('click', e => {
    e.preventDefault();
    box.style.display = 'none';
});