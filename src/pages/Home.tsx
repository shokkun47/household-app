import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenue from '../components/TransactionMenue'
import TransactionForm from '../components/TransactionForm'

function Home() {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary />
        <Calender />
      </Box>

      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenue />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home
