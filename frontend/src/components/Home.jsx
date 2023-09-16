import { Box, Button, Container } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { LineChart } from "@mui/x-charts";

const Home = () => {
	return (
		<Box p={4}>
			<Container>
				<Grid container spacing={2}>
					<Grid xs={4}>
						<Box color={"primary.main"} fontSize={64} py={24}>
							<strong>Some Text.</strong>
						</Box>
					</Grid>
					<Grid xs={1}>
						<Box borderRadius={3} bgcolor={"darkgray"} height={"100%"} m={5} minWidth={5}></Box>
					</Grid>
					<Grid xs={7}>
						<Box pt={12}>
							<LineChart xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }]}
								series={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }]}
								height={400} />
						</Box>
						<Box>
							<Box display="flex" flexDirection="row" justifyContent="space-around">
								<Button variant="contained">Press Me</Button>
								<Button variant="outlined">Press Me 2!</Button>
								<Button variant="outlined">Water plants</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default Home
