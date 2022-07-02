export const scatter = (data: number[]) => {
    return {
        xAxis: {
            scale: true
        },
        yAxis: {
            scale: true
        },
        series: [
            {
                symbolSize: 20,
                data,
                type: 'scatter'
            }
        ]
    }
};