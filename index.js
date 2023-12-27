import axios from "axios";
import express from "express";
import bodyParser from "body-parser";


const app = express();
let port = 8811;
let API_KEY = "541443ff685654faae0b17326947aef9";

let data;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",data)
})

app.post("/getWeather",async (req,res)=>{
    let city = req.body.cityName;
    let country = req.body.countryName;
    try{
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;
        let result = await axios.get(api);
        // let data = {result.data.main,}

        let cityy = result.data.name;
        let tempe = result.data.main.temp;
        let humie = result.data.main.humidity;


        console.log(result.data);
        res.render("index.ejs",{city:cityy,temp:tempe,Humidity:humie});
        // console.log(temp);
        
    }catch(err){
        console.log(err);
        res.render("index.ejs");
    }
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})