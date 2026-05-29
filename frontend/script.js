/* API URL */

const API =
"https://blog-platform1-wncj.onrender.com";

/* PROTECT DASHBOARD */

if(
  window.location.pathname.includes("dashboard.html")
){

  const token =
  localStorage.getItem("token");

  if(!token || token === "undefined"){

    alert("Please Login First");

    window.location.href =
    "login.html";
  }
}

let posts = [];

/* FETCH POSTS */

async function fetchPosts(){

  try{

    const response = await fetch(
      `${API}/api/posts/all`
    );

    posts = await response.json();

    displayPosts();

  }

  catch(error){

    console.log(error);
  }
}

/* DISPLAY POSTS */

function displayPosts(){

  const postsDiv =
  document.getElementById("posts");

  if(!postsDiv){
    return;
  }

  postsDiv.innerHTML = "";

  posts.forEach(post => {

    postsDiv.innerHTML += `

    <div class="card">

      <h4>👤 ${post.username}</h4>

      <h2>${post.title}</h2>

      <p>${post.content}</p>

      <button onclick="deletePost('${post._id}')">
        Delete
      </button>

      <button onclick="editPost('${post._id}')">
        Edit
      </button>

      <button onclick="likePost('${post._id}')">
        ❤️ Like (${post.likes})
      </button>

      <br><br>

      <input
        type="text"
        id="comment-${post._id}"
        placeholder="Write comment"
      >

      <button onclick="addComment('${post._id}')">
        Add Comment
      </button>

      <div>

        ${post.comments.map(comment => `
          <p>💬 ${comment}</p>
        `).join("")}

      </div>

    </div>

    `;
  });

  /* UPDATE STATS */

  const totalPosts =
  document.getElementById("totalPosts");

  const totalLikes =
  document.getElementById("totalLikes");

  const totalComments =
  document.getElementById("totalComments");

  if(totalPosts){

    totalPosts.innerText =
    posts.length;
  }

  if(totalLikes){

    let likes = 0;

    posts.forEach(post => {

      likes += post.likes;
    });

    totalLikes.innerText =
    likes;
  }

  if(totalComments){

    let comments = 0;

    posts.forEach(post => {

      comments +=
      post.comments.length;
    });

    totalComments.innerText =
    comments;
  }
}

/* ADD POST */

async function addPost(){

  const title =
  document.getElementById("title").value;

  const content =
  document.getElementById("content").value;

  if(title === "" || content === ""){

    alert("Please fill all fields");

    return;
  }

  try{

    const response = await fetch(
      `${API}/api/posts/create`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          username:
          localStorage.getItem("username"),

          title,

          content
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById("title").value = "";

    document.getElementById("content").value = "";

    fetchPosts();

  }

  catch(error){

    console.log(error);

    alert("Server Error");
  }
}

/* SEARCH POSTS */

function searchPosts(){

  const searchInput =
  document.getElementById("searchInput");

  if(!searchInput){
    return;
  }

  const searchValue =
  searchInput.value.toLowerCase();

  const filteredPosts =
  posts.filter(post =>

    post.title.toLowerCase()
    .includes(searchValue)

  );

  const postsDiv =
  document.getElementById("posts");

  postsDiv.innerHTML = "";

  filteredPosts.forEach(post => {

    postsDiv.innerHTML += `

    <div class="card">

      <h4>👤 ${post.username}</h4>

      <h2>${post.title}</h2>

      <p>${post.content}</p>

    </div>

    `;
  });
}

/* DARK MODE */

function toggleDarkMode(){

  document.body.classList.toggle("dark");
}

/* ADD COMMENT */

async function addComment(id){

  const commentInput =
  document.getElementById(`comment-${id}`);

  const comment =
  commentInput.value;

  if(comment === ""){
    return;
  }

  try{

    const response = await fetch(

      `${API}/api/posts/comment/${id}`,

      {
        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          comment
        })
      }

    );

    const data = await response.json();

    alert(data.message);

    fetchPosts();

  }

  catch(error){

    console.log(error);

    alert("Comment Failed");
  }
}

/* DELETE POST */

async function deletePost(id){

  try{

    const response = await fetch(

      `${API}/api/posts/delete/${id}`,

      {
        method:"DELETE"
      }

    );

    const data = await response.json();

    alert(data.message);

    fetchPosts();

  }

  catch(error){

    console.log(error);

    alert("Delete Failed");
  }
}

/* EDIT POST */

async function editPost(id){

  const newTitle =
  prompt("Enter New Title");

  const newContent =
  prompt("Enter New Content");

  if(!newTitle || !newContent){
    return;
  }

  try{

    const response = await fetch(

      `${API}/api/posts/edit/${id}`,

      {
        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          title:newTitle,

          content:newContent

        })
      }

    );

    const data = await response.json();

    alert(data.message);

    fetchPosts();

  }

  catch(error){

    console.log(error);

    alert("Edit Failed");
  }
}

/* LIKE POST */

async function likePost(id){

  try{

    const response = await fetch(

      `${API}/api/posts/like/${id}`,

      {
        method:"PUT"
      }

    );

    const data = await response.json();

    alert(data.message);

    fetchPosts();

  }

  catch(error){

    console.log(error);

    alert("Like Failed");
  }
}

/* LOGIN USER */

async function loginUser(){

  const email =
  document.getElementById("loginEmail").value;

  const password =
  document.getElementById("loginPassword").value;

  try{

    const response = await fetch(
      `${API}/api/users/login`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if(data.message === "Login Successful"){

      localStorage.setItem(
        "username",
        data.user.username
      );

      localStorage.setItem(
        "token",
        data.token
      );

      window.location.href =
      "dashboard.html";
    }

  }

  catch(error){

    console.log(error);

    alert("Server Error");
  }
}

/* SIGNUP USER */

async function signupUser(){

  const username =
  document.getElementById("signupUsername").value;

  const email =
  document.getElementById("signupEmail").value;

  const password =
  document.getElementById("signupPassword").value;

  try{

    const response = await fetch(
      `${API}/api/users/signup`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          username,
          email,
          password
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if(
      data.message ===
      "User Registered Successfully"
    ){

      window.location.href =
      "login.html";
    }

  }

  catch(error){

    console.log(error);

    alert("Server Error");
  }
}

/* LOGOUT USER */

function logoutUser(){

  localStorage.clear();

  alert("Logged Out");

  window.location.href =
  "login.html";
}

/* LOAD POSTS */

fetchPosts();