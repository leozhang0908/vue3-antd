export const line = (categorys: string[], data: number[]) => {
    return {
        xAxis: {
            type: 'category',
            data: categorys
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data,
                type: 'line',
                smooth: true
            }
        ]
    };
}