const loadingDirective = {
    mounted(el, binding) {
        const isLoading = binding.value;
        if (isLoading) {
            el.style.position = 'relative';
            const boxMask = document.createElement('div');
            boxMask.className = 'box-loading-mask';
            const loader = document.createElement('div')
            loader.className = 'box-loading-loader'
            boxMask.appendChild(loader)
            el.appendChild(boxMask)
        }
    },
    updated(el, binding) {
        const isLoading = binding.value;
        if (isLoading) {
            // 防止多次挂载
            if (el.querySelector('.box-loading-mask')) {
                return
            }
            el.style.position = 'relative';
            const boxMask = document.createElement('div');
            boxMask.className = 'box-loading-mask';
            const loader = document.createElement('div')
            loader.className = 'box-loading-loader'
            boxMask.appendChild(loader)
            el.appendChild(boxMask)
        } else {
            const boxMask = el.querySelector('.box-loading-mask');
            if (boxMask) {
                el.removeChild(boxMask);
            }
        }
    }
};
export default loadingDirective;