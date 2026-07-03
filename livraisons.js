 function toggleFilterOptions() {
            document.getElementById('filterPanel').classList.toggle('active');
        }

        function openModal(mode, id = '', commande = '', status = 'En cours') {
            const modal = document.getElementById('deliveryModal');
            document.getElementById('modalTitle').innerText = mode === 'edit' ? "Modifier la Livraison" : "Nouvelle Livraison";
            
            if (mode === 'edit') {
                document.getElementById('deliveryId').value = id;
                document.getElementById('formCommande').value = commande;
                document.getElementById('formStatus').value = status;
            } else {
                document.getElementById('deliveryId').value = '';
                document.getElementById('formCommande').selectedIndex = 0;
                document.getElementById('formStatus').selectedIndex = 0;
            }
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('deliveryModal').classList.remove('active');
        }

        function openDeleteModal(deliveryCode) {
            document.getElementById('deleteDeliveryName').innerText = deliveryCode;
            document.getElementById('deleteModal').classList.add('active');
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.remove('active');
        }