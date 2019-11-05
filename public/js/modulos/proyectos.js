import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    // console.log('Diste click en ELIMINAR!');
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                '¡Eliminado!',
                'Su archivo ha sido eliminado.',
                'success'
            )
            // Redireccionar al home
            setTimeout(() => {
                window.location.href = '/'
            }, 3000);
        }
    })
});