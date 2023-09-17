import { Box, Button, Container } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	Message,
	MessageInput,
	MessageList,
} from "@chatscope/chat-ui-kit-react";

import { useEffect, useState } from "react";
	
const Home = () => {
	const [currentText, setCurrentText] = useState("")
	const [messages, setMessages] = useState([{
		message: "Hi! Want to check in on your plants?",
		sentTime: "just now",
		direction: "incoming"
	}])

	async function doSomething(input){
		setMessages([...messages, {message: input, direction: "outgoing"}])
		let output = ""

		fetch('http://127.0.0.1:5000/api?input=' + input)
		.then(response => response.json())
		.then(data => {
			console.log(data.response)
			console.log(data.response.category)

			switch(data.response.category) {
				case 'water':
					if(data.response.error) {
						output = data.response.error
					} else {
						output = `Giving some water to our friend!!`
					}
					break;
				case 'not_water':
					if(data.response.error) {
						output = data.response.error
					} else {
						output = 'Taking away some water to our friend!!'
					}
					break;
				case 'get_all':
					output = 'Your plants are doing well!'
					break;
				case 'get_specific':
					if (data.response.moistureValue < 2000){
						output += `${data.response.name} needs more water! `
					}
					else {
						output += `${data.response.name} does not need any more water. `
					}

					output += `Their moisture is currently at ${Math.round(100 - data.response.moistureValue / 4096)}%. `

					if (data.response.sunExposure < 500){
						output += `${data.response.name} needs more sun!`
					}
					else {
						output += `Consider putting ${data.response.name} in the shade during sunny hours. `
					}

					output += `Their sun light exposure is currently at ${Math.round(100 - data.response.moistureValue / 1024)}%. `

					break;
			}
			setMessages([...messages, {message: input, direction: "outgoing"}, {message: output, direction: "incoming"}])
		})
		
	}

	return (
		<Box p={4}>
			<Container>
				<Grid container spacing={2}>
					<Grid xs={5}>
						<Box color={"primary.main"} fontSize={64} py={24}>
							<strong>RoBotany.</strong>
							<p style={{fontSize: "0.4em"}}>An easier way to care for your plants.</p>
						</Box>
					</Grid>
					<Grid xs={7}>
						<div style={{ position: "relative", height: "600px" }}>
						<MainContainer style={{fontSize: "1.3em"}}>
							<ChatContainer>
								<MessageList>
									{messages.map(message => 
										<Message model = {{
											message: message.message,
											sentTime: message.sentTime,
											direction: message.direction,
											position: "single"
										}}/>)}
								</MessageList>
								<MessageInput onChange={(_, textContent) => setCurrentText(textContent)}
									onSend={() => doSomething(currentText)}
									attachButton={false} placeholder="Type message here" />
								{/* have to use textContent to make calls */}
							</ChatContainer>
						</MainContainer>
						</div>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default Home
