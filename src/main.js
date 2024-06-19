// Define the variables
const audience = 'tasklist.camunda.io';
const clientId = 'NMI~3rlR-xq2GilhHOfGleT55Rz2gR~A';
const clientSecret = 'WxbTAdYTb.A9_dFhzidPQbyiz.giMKOxj~3rCtbDJuxTlZNTX6hb0qsU2.JP96p.';
const processDefinitionKey = '2251799818630281';

        // Step 1: Obtain access token
        const tokenResponse = await fetch('https://login.cloud.camunda.io/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                audience: audience,
                client_id: clientId,
                client_secret: clientSecret
            })
        });

        const tokenData = await tokenResponse.json();
        const TEMP_CAMUNDA_ACCESS_TOKEN = tokenData.access_token;

        // Step 2: Fetch the form schema
        const formResponse = await fetch(`https://bru-2.tasklist.camunda.io/eeba2b51-62fc-4c8a-9292-b9e119b9cbc3/v1/forms/Form_demoRequest?processDefinitionKey=${processDefinitionKey}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TEMP_CAMUNDA_ACCESS_TOKEN}`
            }
        });

        const formData = await formResponse.json();
        const formSchema = formData.schema;

        // Step 3: Store the schema content in a variable
        console.log("Form Schema:", formSchema);
        // You can now use the formSchema variable as needed in your application




  const container = document.querySelector('#form');

  FormViewer.createForm({
    container,
    formSchema
  });