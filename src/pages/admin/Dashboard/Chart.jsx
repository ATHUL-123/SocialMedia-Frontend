import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { getChartData } from '../../../services/Admin/apiMethods';
import './Chart.css'
function Chart() {
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [reportData, setReportData] = useState([])
    const [year, setYear] = useState('2024')

    const fillMissingMonths = (data) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newData = months.map((month) => {
            const existingData = data.find((item) => item.label === month);
            return existingData || { label: month, count: 0 };
        });
        return newData;
    };
    useEffect(() => {
        getChartData(year)
            .then((res) => {

                setUserData(fillMissingMonths(res.usersMonthlyCounts));
                setPostData(fillMissingMonths(res.PostMonthlyCounts));
                setReportData(fillMissingMonths(res.ReportsMonthlyCounts));
            })
            .catch((err) => {
                console.log('Error', err);
            })
    }, [year]);

    const handleChangeYear = (e) => {
        setYear(e.target.value);
    };



    defaults.maintainAspectRatio = false;
    defaults.responsive = true;
    defaults.plugins.title.display = true;
    defaults.plugins.title.align = "start";
    defaults.plugins.title.font.size = 20;
    defaults.plugins.title.color = "black";


    return (
        <>


            <div className="yearPicker">
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={year} onChange={handleChangeYear}>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    {/* Add more options for other years */}
                </select>
            </div>
            <div className="dataCard revenueCard">
                <Line
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Users',
                                data: userData.map((data) => data.count),
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                            },
                            {
                                label: 'Posts',
                                data: postData.map((data) => data.count),
                                backgroundColor: '#00FF00',
                                borderColor: '#00FF00',
                            },
                            {
                                label: 'Reports',
                                data: reportData.map((data) => data.count),
                                backgroundColor: '#FF3030',
                                borderColor: '#FF3030',
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                        plugins: {
                            title: {
                                text: 'Monthly Counts',
                            },
                        },
                    }}
                />
            </div>

        </>
    )
}

export default Chart