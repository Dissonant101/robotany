import { Box, Button, Container } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	Avatar,
	Message,
	MessageInput,
	MessageList,
} from "@chatscope/chat-ui-kit-react";

import akaneAvatar from "../assets/akane.svg";
import { useState } from "react";
	
const Home = () => {
	const [currentText, setCurrentText] = useState("")
	const [messages, setMessages] = useState([{
		message: "Hi! Want to check in on your plants?",
		sentTime: "just now",
		direction: "incoming"
	}])
	return (
		<Box p={4}>
			<Container>
				<Grid container spacing={2}>
					<Grid xs={5}>
						<Box color={"primary.main"} fontSize={64} py={24}>
							<strong>Talk2Plants.</strong>
						</Box>
					</Grid>
					<Grid xs={7}>
						<div style={{ position: "relative", height: "500px" }}>
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
									onSend={() => setMessages([...messages, {message: currentText, sentTime: "just now", direction: "outgoing"}])}
									attachButton={false} placeholder="Type message here" />
							</ChatContainer>
						</MainContainer>
						</div>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

function OutgoingMessage() {
	return <div style={{ position: "relative", height: "500px" }}>
			<Message
			model = {{
				message: "Hello my friend",
				sentTime: "just now",
				direction: "outgoing",
				position: "single"
			}}
			/>
	</div>;
}

function IncomingMessage() {
	return <div style={{ position: "relative", height: "500px" }}>
		<MainContainer>
			<ChatContainer>
				<MessageList>
					<Message 
					model = {{
						message: "Hello my friend",
						sentTime: "just now",
						direction: "incoming",
						position: "single"
					}}> <Avatar src={akaneAvatar} name="Akane"/> </Message>
				</MessageList>
				<MessageInput placeholder="Type message here" />
			</ChatContainer>
		</MainContainer>
	</div>;
}

function InitialIncomingMessage() {
	return <Message 
			model = {{
				message: "Hello",
				sentTime: "just now",
				direction: "incoming",
				position: "single"
			}}> <Avatar src={akaneAvatar} name="Akane"/> </Message>
}

export default Home
