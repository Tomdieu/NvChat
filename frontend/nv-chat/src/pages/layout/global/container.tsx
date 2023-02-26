import { Box, Grid } from '@mui/material'
import React from 'react'
import { useStyles } from './styles'


type Props = {}

const container = (props: Props) => {
  
    const classes = useStyles()

    return (
    <Grid container className={classes.container}>
        <Grid item md={3} className={classes.leftContainer}>
            <Box>
                <Grid container direction={"column"}>
                    <Grid item md={4} sm={12}>

                    </Grid>
                    <Grid item md={8}>

                    </Grid>

                </Grid>
            </Box>
        </Grid>
        <Grid item md={6} className={classes.middleContainer}></Grid>
        <Grid item md={3} className={classes.rightContainer}></Grid>

    </Grid>
  )
}

export default container