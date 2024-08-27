import { Grid } from '@mui/material'
import React from 'react'

function Report() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        日付
      </Grid>
      <Grid item xs={12} md={4}>
        カテゴリグラフ
      </Grid>
      <Grid item xs={12} md={8}>
        棒グラフ
      </Grid>
      <Grid item xs={12}>
        テーブル
      </Grid>
    </Grid>
  )
}

export default Report
