var app;
window.onload = function () {
    app = new Vue({
        el: '#weatherApp', // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            loaded: false,
            // cityName, variable utilisé dans le formulaire via v-model
            formCityName: '',
            message: 'WebApp Loaded.',
            messageForm: '',
            // liste des villes saisies, initialiser avec Paris
            cityList: [{
                name : 'Paris'
            }],
            // cityWeather contiendra les données météo reçus par openWeatherMap
            cityWeather : null,
            // indicateur de chargement
            cityWeatherLoading : false
        },
        mounted : function(){
            this.loaded = true;
            this.readData();
        },
        // ici, on définit les methodes qui vont traiter les données décrites dans DATA
        methods: {
            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère

                console.log('this.loaded:', this.loaded); // va afficher 'this.loaded: true'
            },
            addCity: function (event) {
                event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire
                if(this.isCityExist(this.formCityName)){
                    
                    }
                    else{
                        this.cityList.push({name : this.formCityName});
                        this.messageForm = '';
                        this.formCityName = '';
                    }
                console.log('formCityName:',this.formCityName);     
            },
            isCityExist: function (_cityName){
                if( this.cityList.filter(item => 
                                            item.name.toUpperCase() == _cityName.toUpperCase()
                                        ).length>0){
                    return true;
                }else{
                    return false;
                }
            },
            remove: function (_city) {   
                this.cityList = this.cityList.filter(item => item.name != _city.name);              
            }, 
            meteo: function (_city) {  
                this.cityWeatherLoading = true;

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&apikey=547c0726f5b5615ff60e3c0c1e078ca3')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            app.cityWeatherLoading = false;

            if(json.cod === 200){
                
                app.cityWeather = json;
                app.message = null;
            }else{
                app.cityWeather = null;
                app.message = 'Météo introuvable pour ' + _city.name 
                                + ' (' + json.message+ ')';     
        }
    });
            }
        
        }        
    });        
}