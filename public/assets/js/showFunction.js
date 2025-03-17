const box = document.querySelector('.div-list-form');
const btnForm = document.querySelector('.btn-close');
const btnAdd = document.querySelector('.btn-add-link');
const edit = document.querySelector('.link-show-list');


btnAdd.addEventListener('click', e => {
    e.preventDefault();
    box.style.display = 'flex';
})

btnForm.addEventListener('click', e => {
    e.preventDefault();
    box.style.display = 'none';
});

document.querySelectorAll('.btnEdit').forEach(button => {
    button.addEventListener('click', e => {
        const btnEdit = e.currentTarget;
        btnEdit.style.display = 'none';

        const linkId = btnEdit.getAttribute('data-id');
        const listItem = document.querySelector(`li[data-id="${linkId}"]`);
        const linkShowList = listItem.querySelector('.link-show-list');

        const titulo = linkShowList.querySelector('h3').innerText;
        const link = linkShowList.querySelector('p').innerText;
        
        const token = document.querySelector('meta[name="token"]').getAttribute('value');

        linkShowList.innerHTML = `
            <form class="form-edit-delete" method="POST">
                <input type="hidden" name="_csrf" value="${token}">
                <input type="hidden" name="link[id]" value="${linkId}">
                <input value="${titulo}" type="text" name="link[titulo]">
                <input value="${link}" type="text" name="link[link]">
                <button name="edit" class='salvar' type="submit">Salvar</button>
                <button name="delete" class='delete' type="submit">Excluir</button>
                <button class="cancelar">Cancelar</button>
            </form>
        `;
        const editar = listItem.querySelector('.salvar');
        editar.addEventListener('click', e => {
            const formMod = listItem.querySelector('.form-edit-delete');
            formMod.setAttribute('action', '/edit');

        });
        const del = listItem.querySelector('.delete');
        del.addEventListener('click', e => {
            const formMod = listItem.querySelector('.form-edit-delete');
            formMod.setAttribute('action', '/delete')
        });
        const btnCancelar = listItem.querySelector('.cancelar');
        btnCancelar.addEventListener('click', e => {
            e.preventDefault();
            btnEdit.style.display = 'block';
            linkShowList.innerHTML = `
                <div>
                    <h3>${titulo}</h3>
                </div>
                <div>
                    <p>${link}</p>
                </div>
            `;
        });
    });
});
