const axios = require('axios');
require('dotenv').config();

const getToken = async () => {
    try {
        const response = await axios.post('https://login.cloud.camunda.io/oauth/token', {
            grant_type: 'client_credentials',
            audience: 'tasklist.camunda.io',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting token:', error);
        throw error;
    }
};

const getFormSchema = async (token) => {
    try {
        const response = await axios.get('https://bru-2.tasklist.camunda.io/eeba2b51-62fc-4c8a-9292-b9e119b9cbc3/v1/forms/Form_demoRequest?processDefinitionKey=2251799818630281', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.schema;
    } catch (error) {
        console.error('Error getting form schema:', error);
        throw error;
    }
};

const main = async () => {
    try {
        const token = await getToken();
        console.log('Access Token:', token);
        const formSchema = await getFormSchema(token);
        console.log('Form Schema:', formSchema);
    } catch (error) {
        console.error('Error in main function:', error);
    }
};

main();