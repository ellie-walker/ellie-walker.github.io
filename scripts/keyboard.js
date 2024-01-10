// ARROW KEYS 

document.addEventListener('keydown', e => {
    if (e.code.startsWith('Arrow')) {
        switch (e.code) {
            case 'ArrowLeft':
                prevFn(e);
                prevFn2(e);
                break;
            case 'ArrowRight':
                nextFn(e);
                nextFn2(e);
                break;
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