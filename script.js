async function createHeatmap() {
    try {
        const response = await fetch('assessment.json');
        if (!response.ok) throw new Error('Failed to load JSON data.');
        const jsonData = await response.json();

        const zValues = jsonData.data.map(console => console.data.map(feature => feature.value));
        const yLabels = jsonData.data.map(console => console.name);
        const xLabels = jsonData.data[0].data.map(feature => feature.label.replace('_', ' '));

        const heatmapData = [{
            z: zValues,
            x: xLabels,
            y: yLabels,
            type: 'heatmap',
            colorscale: 'Blues',
            hoverinfo: 'x+y+z',
            showscale: true
        }];

        const layout = {
            title: 'Gaming Console Ratings Heatmap',
            xaxis: {
                title: 'Features',
                tickangle: -45
            },
            yaxis: {
                title: 'Consoles'
            },
            margin: { l: 100, r: 20, t: 50, b: 100 },
            width: 900
        };

        Plotly.newPlot('heatmap', heatmapData, layout);
    } catch (error) {
        console.error('Error:', error);
    }
}

createHeatmap();