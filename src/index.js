let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addBtn.textContent = "Done adding toys!";
    } else {
      toyFormContainer.style.display = "none";
      addBtn.textContent = "Add a new toy!";
    }
  });

  function addToyToDom(toyobj)
  {
    //console.log("toyobj = " + toyobj);
    console.log("toyobj.name = " + toyobj.name);
    console.log("toyobj.id = " + toyobj.id);
    console.log("toyobj.image = " + toyobj.image);
    console.log("toyobj.likes = " + toyobj.likes);
    //store all of the information in the new card
    //add the new card to the DOM
    //<div class="card">
    //<h2>Woody</h2>
    //<img src="[toy_image_url]" class="toy-avatar" />
    //<p>4 Likes</p>
    //<button class="like-btn" id="[toy_id]">Like ❤️</button>
    //</div>
    let mdiv = document.createElement("div");
    mdiv.className = "card";
    let mdvnm = document.createElement("h2");
    mdvnm.textContent = "" + toyobj.name;
    let mdvpic = document.createElement("img");
    mdvpic.src = toyobj.image;
    mdvpic.className = "toy-avatar";
    let mdvlikes = document.createElement("p");
    mdvlikes.textContent = "" + toyobj.likes + " Likes";
    let mdvlkbtn = document.createElement("button");
    mdvlkbtn.className = "like-btn";
    mdvlkbtn.id = toyobj.id;
    mdvlkbtn.textContent = "Like ❤️";
    //console.log("mdiv = " + mdiv);
    //console.log("mdvnm = " + mdvnm);
    //console.log("mdvpic = " + mdvpic);
    //console.log("mdvlikes = " + mdvlikes);
    //console.log("mdvlkbtn = " + mdvlkbtn);
    //debugger;
    mdiv.appendChild(mdvnm);
    //console.log("added the name to the div");
    mdiv.appendChild(mdvpic);
    //console.log("added the pic to the div");
    mdiv.appendChild(mdvlikes);
    //console.log("added the likes to the div");
    mdiv.appendChild(mdvlkbtn);
    //console.log("added the likes button to the div");
    //need to add this to the dom
    console.log("successfully stored the data!");
    //debugger;
    //console.log(document.getElementById("toy-collection"));
    document.getElementById("toy-collection").appendChild(mdiv);
    console.log("successfully added everything to to the dom!");
    //debugger;
  }

  function addLikeButtonEventListener(buttonobj)
  {
    buttonobj.addEventListener("click", function(event){
      //increase the likes
      //this acknowledges that the the user clicked the button
      //then communicate with the server to tell it to increment the like count
      //on success, increment the like count from the button...
      console.log("clicked the like button!");
      console.log("event.target = " + event.target);
      console.log("event.target.id = " + event.target.id);
      //need to get the card parent of the button
      console.log("event.target.parentNode = " + event.target.parentNode);
      let mcard = event.target.parentNode;
      let tynm = mcard.getElementsByTagName("h2")[0].textContent;
      console.log("toy name = " + tynm);
      //
      //do the DOM update as if the server successfully acknowledged it...
      let oldlikepstr = "" + mcard.getElementsByTagName("p")[0].textContent;
      let exnumlikes = Number(oldlikepstr.substring(0, oldlikepstr.indexOf(" Likes")));
      const configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "likes": (exnumlikes + 1)
        }),
      };
      fetch("http://localhost:3000/toys/" + event.target.id, configurationObject)
      .then(response => response.json())
      .then(function dosomething(response){
        console.log("response = " + response);
        console.log("response.likes = " + response.likes);
        //mcard.getElementsByTagName("p")[0].textContent = "" + (exnumlikes + 1) + " Likes";
        mcard.getElementsByTagName("p")[0].textContent = "" + (response.likes) + " Likes";
        console.log("like count for " + tynm + " successfully updated!");
        //debugger;
      })
      .catch(function (err) {
        console.error("failed to update the information and get it back! Failed with message below:");
        console.error(err);
        });
      //debugger;
    });
  }

  document.getElementsByClassName("add-toy-form")[0].addEventListener("submit", function(event){
    event.preventDefault();
    console.log("form submitted!");
    console.log("event.target = " + event.target);
    //first get the form data
    //second do the post request
    console.log("event.target[0].name = " + event.target[0].name);//name
    console.log("event.target[0].value = " + event.target[0].value);//actual-name
    console.log("event.target[1].name = " + event.target[1].name);//image
    console.log("event.target[1].value = " + event.target[1].value);//url
    let nwnm = "" + event.target[0].value;
    let nwimgurl = "" + event.target[1].value;
    //now do the post
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "name": nwnm,
        "image": nwimgurl,
        "likes": 0
      }),
    };
    fetch("http://localhost:3000/toys/", configurationObject)
    .then(response => response.json())
    .then(function dosomething(response){
      console.log("response = " + response);
      let mytoyitem = response;
      addToyToDom(mytoyitem);
      
      //begin updating the likes here
      let mybuttons = document.getElementById("toy-collection").getElementsByTagName("button");
      console.log("mybuttons = " + mybuttons);
      console.log("mybuttons.length = " + mybuttons.length);
      //
      if (mybuttons.length > 0);
      else throw "illegal number of buttons found!";
      
      console.log("mytoyitem.id = " + mytoyitem.id);
      if (mytoyitem.id > 1 || mytoyitem.id == 1);
      else throw "illegal button id found and used here!";

      addLikeButtonEventListener(mybuttons[mytoyitem.id - 1]);
      console.log("new toy added successfully!");
      debugger;
    })
    .catch(function (err) {
      console.error("failed to update the information and get it back! Failed with message below:");
      console.error(err);
      });
    //debugger;
  });

  //need to fetch the data from the server
  //need to get all of the toys and then add them to the DOM
  fetch("http://localhost:3000/toys").then((res) => res.json()).
  then(function(res){
    //res is the toys array
    console.log("res = " + res);
    let mtoysarr = res;
    console.log("mtoysarr.length = " + mtoysarr.length);
    //add the toys to the document initially
    for(let n = 0; n < mtoysarr.length; n++)
    {
      console.log("mtoysarr[" + n + "] = " + mtoysarr[n]);
      addToyToDom(mtoysarr[n]);
    }//end of n for loop
    //debugger;

    //begin updating the likes here
    let mybuttons = document.getElementById("toy-collection").getElementsByTagName("button");
    console.log("mybuttons = " + mybuttons);
    console.log("mybuttons.length = " + mybuttons.length);
    //
    if (mybuttons.length == mtoysarr.length && mybuttons.length > 0);
    else throw "illegal number of buttons found!";
    //
    for (let n = 0; n < mybuttons.length; n++)
    {
      console.log("buttonid = mybuttons[" + n + "].id = " + mybuttons[n].id);
      addLikeButtonEventListener(mybuttons[n]);
    }//end of n for loop
    //debugger;
  }).
  catch(function(err){
    console.error("failed to get the toys here! Failed with message below:");
    console.error(err);
  });
});
