import { Doughnut } from 'react-chartjs-2'

const DonutChart = ({ x, y }) => {
  const data = {
    datasets: [
      {
        data: [x, y - x],
        backgroundColor: ['#94a3b8', '#18181b'],
        hoverBackgroundColor: ['#94a3b8', '#18181b'],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
  }

  return <Doughnut className='w-[300px] h-[300px]' data={data} options={options} />
}

export { DonutChart }
