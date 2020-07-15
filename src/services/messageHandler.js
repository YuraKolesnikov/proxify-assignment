import api from './api'

export const messageHandler = {
	sendMessage: async step => {
		try {
			const response = await api.get('./questions.json');
			const { data } = response;

			const messages = [ data[step] ]

			if(!data[step].ask && data.length - 1 > step) {
				messages.push(data[step + 1])
			}

			return messages
		} catch (error) {
			return error
		}	
	}
}