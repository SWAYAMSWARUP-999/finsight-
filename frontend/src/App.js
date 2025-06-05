import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [growthData, setGrowthData] = useState([]);

  const calculateSIP = () => {
    const n = years * 12;
    const r = annualRate / 100 / 12;
    let total = 0;
    const chartPoints = [];

    for (let i = 1; i <= n; i++) {
      total = total * (1 + r) + parseFloat(monthlyInvestment);
      chartPoints.push({ month: i, value: total.toFixed(2) });
    }

    setGrowthData(chartPoints);

    // Save to backend
    axios.post('http://localhost:5000/api/sip', {
      monthly_investment: monthlyInvestment,
      annual_rate: annualRate,
      years: years,
    });
  };

  return (
    <div style={{ maxWidth: 700, margin: '50px auto', textAlign: 'center' }}>
      <h2>SIP Calculator 📈</h2>
      <input type="number" placeholder="Monthly Investment" value={monthlyInvestment} onChange={e => setMonthlyInvestment(e.target.value)} />
      <input type="number" placeholder="Annual Rate (%)" value={annualRate} onChange={e => setAnnualRate(e.target.value)} />
      <input type="number" placeholder="Years" value={years} onChange={e => setYears(e.target.value)} />
      <br /><br />
      <button onClick={calculateSIP}>Calculate & Visualize</button>

      {growthData.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <Line
            data={{
              labels: growthData.map((d) => `M${d.month}`),
              datasets: [{
                label: 'SIP Growth Over Time',
                data: growthData.map((d) => d.value),
                fill: true,
                borderColor: 'green',
                backgroundColor: 'rgba(0,200,100,0.2)'
              }]
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

