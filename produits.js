function openModal(mode, code = '', ref = '', desc = '', qty = 0) {
    const modal = document.getElementById('productModal');
            const title = document.getElementById('modalTitle');
            const submitBtn = document.getElementById('formSubmitBtn');

            if (mode === 'edit') {
                title.innerText = "Modifier le Produit";
                submitBtn.innerText = "Sauvegarder les modifications";
                document.getElementById('formCode').value = code;
                document.getElementById('formReference').value = ref;
                document.getElementById('formDescription').value = desc;
                document.getElementById('formQty').value = qty;
            } else {
                title.innerText = "Ajouter un Nouveau Produit";
                submitBtn.innerText = "Enregistrer le produit";
                document.getElementById('formCode').value = '';
                document.getElementById('formReference').value = '';
                document.getElementById('formDescription').value = '';
                document.getElementById('formQty').value = 0;
            }
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('productModal').classList.remove('active');
        }

        // Ouvre le pop-up de Suppression
        function openDeleteModal(productName) {
            document.getElementById('deleteProductName').innerText = productName;
            document.getElementById('deleteModal').classList.add('active');
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('active');
        }