//Ahamad Elabd
//2017-04-10
var app = {
        rating: 0
        , image: ""
        , setRating: function (stars) {
        [].forEach.call(stars, function (star, index) {
                if (app.rating > index) {
                    star.classList.add('rated');
                }
                else {
                    star.classList.remove('rated');
                }
            });
        }
        , save: function () {
            let name = document.getElementById("itemName").value;
            if (name == "" || app.rating == 0) {
                alert("fill  all");
            }
            else {
                let data = JSON.parse(localStorage.getItem("reviewR-elab0009"));
                if (data == null) {
                    //create array of people
                    data = [];
                }
                data.push({
                    "id": Date.now()
                    , "name": name
                    , "rating": app.rating
                });
                localStorage.setItem("reviewR-elab0009", JSON.stringify(data));
                app.showList();
                app.closeModal();
               
            }
        }
        , cleanModal: function () {
            app.rating = 0;
            document.getElementById("itemName").value = '';
            app.setRating(document.querySelectorAll("#Addmodal .star"));
            //clear image
        }
        , closeModal: function () {
            app.cleanModal();
            let event = new CustomEvent("touchend", {
                bubbles: true
                , cancelable: true
            });
            document.getElementById("closebutton").dispatchEvent(event);
        }
        ,takePic: function(){
         let options = {
                            quality: 80,
                            destinationType: Camera.DestinationType.FILE_URI,
                            encodingType: Camera.EncodingType.PNG,
                            mediaType: Camera.MediaType.PICTURE,
                            pictureSourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: true,
                            targetWidth: 300,
                            targetHeight: 300
         } 
        
         
         navigator.camera.getPicture( app.successCallback, app.err, options );    
            
        let errorCallback = function( error ){
            alert(error);
        };
        
        let successCallback = function( uri ){
            app.image =  uri;
            document.getElementById("img").classList.remove("hidden");
             };
        },
            
        successCallback: function(imgData){
            
            app.image = imgData;
            
        },
       
    
        showList: function () {
            let data = JSON.parse(localStorage.getItem("reviewR-elab0009"));
            if (data != null) {
                let E = document.getElementById("Reviews");
                E.innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    let listItem = document.createElement("li");
                    listItem.className = "table-view-cell";
                    let a = document.createElement("a");
                    a.className = "navigate-right";
                    a.setAttribute("href","#rmvmodal");
                    let img = document.createElement("img");
                    img.className = "media-object pull-left";
                    img.src = "img/placeholder.jpg";
                    let divMediaBody = document.createElement("div");
                    divMediaBody.className = "media-body";
                    let bodySpan = document.createElement("span");
                    bodySpan.className = "name";
                    bodySpan.textContent = data[i].name;
                    let reveiewStars = document.createElement("div");
                    reveiewStars.className = "stars review-list";
                    let starA = document.createElement("span");
                    starA.className = "star";
                    let starB = document.createElement("span");
                    starB.className = "star";
                    let starC = document.createElement("span");
                    starC.className = "star";
                    let starD = document.createElement("span");
                    starD.className = "star";
                    let starF = document.createElement("span");
                    starF.className = "star";
                    
                    listItem.appendChild(a);
                    a.appendChild(img);
                    a.appendChild(divMediaBody);
                    divMediaBody.appendChild(bodySpan);
                    divMediaBody.appendChild(reveiewStars);
                    reveiewStars.appendChild(starA);
                    reveiewStars.appendChild(starB);
                    reveiewStars.appendChild(starC);
                    reveiewStars.appendChild(starD);
                    reveiewStars.appendChild(starF);
                    
                    app.rating = data[i].rating;
                    app.setRating(reveiewStars.querySelectorAll(".star"));
                    a.addEventListener("touchend", function(){app.openRmvmodal(data[i].id)});
                    
                    E.appendChild(listItem);
                }
            }
        },
        openRmvmodal : function(id){
            let data = JSON.parse(localStorage.getItem("reviewR-elab0009"));
            
             for(let i = 0; i < data.length; i++){ 
            if(id == data[i].id){
                
                document.getElementById("rmvname").textContent = data[i].name;
                app.rating = data[i].rating;
                app.setRating(document.querySelectorAll("#rmvmodal .star"));
                
                document.getElementById("deleteItem").addEventListener("click", function(){app.removeItem(id)});
            }
       }
    },
    
    removeItem : function(id){
    let data = JSON.parse(localStorage.getItem("reviewR-elab0009"));
        for(let i = 0; i < data.length ; i++){
             if(data[i].id == id ){
             
                data.splice(i,1);
                 
                localStorage.setItem("reviewR-elab0009",JSON.stringify(data));
                
                 app.showList();  
                 let event = new CustomEvent("touchend", {
                    bubbles: true
                    , cancelable: true
                });
                document.getElementById("closebuttonM").dispatchEvent(event);
                break;
             }
        }
        
        
        app.showList();
    },      
            
        
     init: function () {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        }
        , onDeviceReady: function () {
            app.showList();
            let stars = document.querySelectorAll("#Addmodal .star");
            //console.log(stars);
        [].forEach.call(stars, function (star, index) {
                star.addEventListener('click', (function (idx) {
                    return function () {
                        app.rating = idx + 1;
                        app.setRating(stars);
                    }
                })(index));
            });
            document.getElementById("saveItem").addEventListener("click", app.save);
            document.getElementById("canItem").addEventListener("click", app.closeModal);
            document.getElementById("closebutton").addEventListener("touchend", app.cleanModal);
            document.getElementById("takeImg").addEventListener("click", app.takePic);
        }
    }
    //app.init();
app.onDeviceReady();