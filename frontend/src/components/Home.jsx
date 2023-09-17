import { Box, Button, Container } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	ChatContainer,
	Avatar,
	Message,
	MessageInput,
	MessageList,
} from "@chatscope/chat-ui-kit-react";
	
const Home = () => {
	return (
		<Box p={4}>
			<Container>
				<Grid container spacing={2}>
					<Grid xs={5}>
						<Box color={"primary.main"} fontSize={64} py={24}>
							<strong>Some Text.</strong>
						</Box>
					</Grid>
					{/* <Grid xs={1}>
						<Box borderRadius={3} bgcolor={"darkgray"} height={"100%"} m={5} minWidth={5}></Box>
					</Grid> */}
					<Grid xs={7}>
						initialIncomingMessage();
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

function outgoingMessage() {
	<div style={{ position: "relative", height: "500px" }}>
		<ChatContainer>
		<MessageList>
			<Message
			model = {{
				message: "Hello my friend",
				sentTime: "just now",
				direction: "outgoing",
				position: "single"
			}}
			/>
		</MessageList>
		<MessageInput placeholder="Type message here" />
		</ChatContainer>
	</div>;
}

function incomingMessage() {
	<div style={{ position: "relative", height: "500px" }}>
		<ChatContainer>
		<MessageList>
			<Message 
			model = {{
				message: "Hello my friend",
				sentTime: "just now",
				direction: "incoming",
				position: "single"
			}}> <Avatar src="" name="Akane"/> </Message>
		</MessageList>
		</ChatContainer>
	</div>;
}

function initialIncomingMessage() {
	<div style={{ position: "relative", height: "500px" }}>
		<ChatContainer>
		<MessageList>
			<Message 
			model = {{
				message: "Hello my friend",
				sentTime: "just now",
				direction: "incoming",
				position: "single"
			}}> <Avatar src="" name="Akane"/> </Message>
		</MessageList>
		</ChatContainer>
	</div>;
}

export default Home
