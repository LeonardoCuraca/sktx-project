import React from 'react';
import SalesService from '../../Services/SalesService';

export default function SalesOverview() {

    const [charData, setCharData] = React.useState([]);

    const getCharData = React.useCallback(async () =>{
        SalesService.getSalesByMonth()
        .then(data => {
            console.log(data)
            if (data.code === 200) {
                setCharData(data.sales);
            }
        })
    }, [])

    React.useEffect(() => {
        getCharData()
    }, [])

    React.useEffect(() => {
        const labels = [];
        const data = [];
        charData.map(e => {
            labels.push(e.weekDaySale);
            data.push(e.sales);
        })
        const label = 'Total de Ventas por Semana';
        window['showChart'](labels, data, label);
    }, [charData])
    return (
        <div className="ui centered stackable grid">
            <div className="ten wide column" style={{maxHeight: '400px'}}>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </div>
    )
}