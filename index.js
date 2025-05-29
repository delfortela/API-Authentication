import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "puffpuff";
const yourPassword = "puffpuffisoverrated";
const yourAPIKey = "a150eb61-07c4-4f54-80d1-842275b9184d";
const yourBearerToken = "634f7ccb-2ce4-42df-9c09-0c22a20334e5";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random")
    const data = response.data;

    res.render("index.ejs", {content: JSON.stringify(data)});
  } catch(error){
    console.log(error.message);

  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {auth:{username: yourUsername, password: yourPassword}});
    const data = response.data;

    res.render("index.ejs", {content: JSON.stringify(data)});
  } catch(error){
    console.log(error.message);
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const data = response.data;
    res.render("index.ejs", {content: JSON.stringify(data)});
  } catch(error){
    console.log(error.message);
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  try{
    const response =  await axios.get("https://secrets-api.appbrewery.com/secrets/42", {headers: {Authorization: `Bearer ${yourBearerToken}`}});
    const data = response.data;
    res.render("index.ejs", {content: JSON.stringify(data)});
  } catch(error){
    console.log(error.message);
  }
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
