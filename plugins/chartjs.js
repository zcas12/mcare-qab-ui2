const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('div');

    if (!listContainer) {
        listContainer = document.createElement('div');
        legendContainer.appendChild(listContainer);
    }

    listContainer.className = 'row flex-warp justify-space-between pa-0 ma-0';

    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const container = getOrCreateLegendList(chart, options.container);

        while (container.firstChild) {
            container.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            const child = document.createElement('div');
            child.style.cursor = 'pointer';
            child.style.boxSizing = 'border-box';
            child.className = 'row pl-2 pb-1 justify-space-between align-start flex-warp el-col-sm-24 el-col-md-12 el-col-lg-24 el-col-xl-24';

            child.onclick = () => {
                const { type } = chart.config;
                if (type === 'pie' || type === 'doughnut') {
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }

                chart.update();
            };

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.className = 'w-20p h-20p mr-2';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
            textContainer.style.width = 'calc(100% - 30px)';
            textContainer.className = 'ma-0 pa-0'

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            child.appendChild(boxSpan);
            child.appendChild(textContainer);
            container.appendChild(child);
        });
    }
};

export default htmlLegendPlugin;
