/**
 * Created by arthan on 30.10.2017.
 */

let tooltipElement = null;
const createTooltipNode = () => {
    const tool = document.createElement('div');
    tool.className = 'gtd-tooltip';
    document.body.appendChild(tool);
    return tool
};

const calculateTop = (docY, toolHeight, elHeight, offset, mode) => {
    if (mode === 'left' || mode === 'right') {
        return docY - (toolHeight/2) + (elHeight/2);
    }
    if (mode === 'bottom') {
        return docY + elHeight + offset;
    }
    if (mode === 'top') {
        return docY - (toolHeight + offset);
    }

    throw Error(`Unsupported gtd-tooltip mode: '${mode}'`)
};

const calculateTransformOrigin = (mode) => {
    if (mode === 'right') {
        return 'left';
    }
    if (mode === 'left') {
        return 'right';
    }
    if (mode === 'bottom') {
        return 'top';
    }
    if (mode === 'top') {
        return 'bottom';
    }
    throw Error(`Unsupported gtd-tooltip mode: '${mode}'`)
};

let calculateLeft = (docX, toolWidth, elWidth, offset, mode) => {
    if (mode === 'left') {
        return docX - (toolWidth + offset);
    }
    if (mode === 'right') {
        return docX + elWidth + offset;
    }
    if (mode === 'top' || mode === 'bottom') {
        return docX - (toolWidth / 2) + (elWidth / 2);
    }
    throw Error(`Unsupported gtd-tooltip mode: '${mode}'`)
};

const tooltip = {
    bind() {
        if (tooltipElement === null) {
            tooltipElement = createTooltipNode();
        }
    },

    inserted(el, binding) {
        const mode = binding.arg || 'top';

        el.addEventListener('mouseover', (e) => {

            this.timeout && clearTimeout(this.timeout);

            // obtain coordinates
            const coordinates = el.getBoundingClientRect();
            const elWidth = coordinates.width;
            const elHeight = coordinates.height;
            const docX = coordinates.x + window.pageXOffset;
            const docY = coordinates.y + window.pageYOffset;
            const offset = 5;

            tooltipElement.textContent = binding.value;
            const tooltipCoordinate = tooltipElement.getBoundingClientRect();
            const toolWidth = Math.ceil(tooltipCoordinate.width);
            const toolHeight = Math.ceil(tooltipCoordinate.height);

            let toolTop = calculateTop(docY, toolHeight, elHeight, offset, mode);
            let toolLeft = calculateLeft(docX, toolWidth, elWidth, offset,  mode);
            let transformOrigin = calculateTransformOrigin(mode);
            tooltipElement.style = `
                top: ${toolTop}px;
                left: ${toolLeft}px;
                transform-origin: ${transformOrigin};
                min-width: ${toolWidth}px;
                height: ${toolHeight}px;
            `;
            tooltipElement.classList.add('shown');
        });
        el.addEventListener('mouseleave', (e) => {
            this.timeout = setTimeout(() => tooltipElement.classList.remove('shown'), 100);
        })

    }
};

module.exports = tooltip;