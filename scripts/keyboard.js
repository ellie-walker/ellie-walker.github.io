// ARROW KEYS

document.addEventListener('keydown', e => {
    if (e.code.startsWith('Arrow')) {
        if (modalisopen == true)
        {
            switch (e.code) {
                case 'ArrowLeft':
                    prevFn(e);
                    break;
                case 'ArrowRight':
                    nextFn(e);
                    break;
            }
        }
        else if (modal2isopen == true)
        {
            switch (e.code) {
                case 'ArrowLeft':
                    prevFn2(e);
                    break;
                case 'ArrowRight':
                    nextFn2(e);
                    break;
            }
        }
    }
});

// ESCAPE KEY

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        e.preventDefault();
        closeFn();
        closeFn2();
    }
});
