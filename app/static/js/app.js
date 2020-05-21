/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top ">
      <a class="navbar-brand" href="#"><i class="fas fa-camera-retro"> Photogram</i></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" style="margin-left:70%">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/api/posts">Explore </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/api/auth/logout">Logout </router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});



Vue.component('alert', {

    template: `
    <p class="alert alert-success">You have successfully filled out the form!</p>
    `,

});

Vue.component('error', {

    template: `
    <p class="alert alert-danger">Please enter a description and upload a photo </p>
    `,

});


const Explore = Vue.component('explore', {

    template: `
    <div class="container row justify-content-md-center mt-5 w-100">
    
            <div class="post ">
                <div class="card col-8" style="width:750px">
                    <div class="heading card-header">
                        <p class="user card-link" href="#">
                            <img class="card-img-top " src="static/uploads/man_1.jpg"> 
                            Quan 
                        </p>
                    </div>
                    <div class="content card-body">
                        <img src="/static/images/1Beach.jpg" class="pr-4 h-85 w-100"/>
                        <br><br>
                        <p> Beautiful </p>
                    </div>
                    <div class="foot card-footer row mt-5">
                        <p class="likes col" style="width:45%""> <i class="far fa-heart"></i>  Likes: 2 </p>
                        <p class="date col"> January 13, 2020 </p>
                    </div>
             
                </div>
            </div>
        
            <div class="view-button col">
                <router-link :to="{ path: '/api/users/{user_id}/posts'}" class="btn btn-primary btn-lg" style="width:45%"> New Post </router-link>
            </div> 
    </div>
    
    `,

    methods: {

        explore: function() {
        let self = this;

        fetch("/api/posts", {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
        })
                .then(function (response) {
                    return response.json();
        })
                .then(function (jsonResponse) {
            // display a success message
                    console.log(jsonResponse);
        })
            .catch(function (error) {
            console.log(error);
        });

        }
    }


});


const Upload = Vue.component('upload-form', {
    template: `
   
    <div class="container mt-5 bg-light w-50">
        <h2 class="py-4">Upload Form</h2>
            <form @submit.prevent="uploadPhoto"  id="uploadForm" method="post" enctype="multipart/form-data"  >
                <div class="form-group ">
                    <label for="photo" > Photo:       </label>
                    <input type="file"  name="photo" class=" mb-3" placeholder="photo..." >
                </div>
                <div class="form-group">
                    <label for="description"  > Caption: </label>
                    <textarea rows="5" cols="40"  name="description" class="w-100 form-control mb-3" placeholder="caption..."></textarea>
                </div>
                <div class="form-group"
                <router-link :to="{ path: '/api/posts'}" class="btn btn-success btn-lg" style="width:100%"> Submit  </router-link>
                </div>
            </form>
    </div>
    `,
    methods: {

        uploadPhoto: function() {
        let self = this;
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);

            fetch('/api/users/{user_id}/posts', {
                    method: 'POST',
                    body: form_data,
                    headers: {   
                        'X-CSRFToken': token    
                    },     
                    credentials: 'same-origin' 
            })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (jsonResponse) {
                    // display a success message
                        console.log(jsonResponse);
                    })
            .catch(function (error) {
            console.log(error);
            });

        }
    }
});


const Logout = Vue.component('logout', {

    template: `
    <h2 class="alert alert-success">You have successfully logged out!</h2>
    `,

    methods: {

        logout: function() {
        let self = this;

        fetch("/api/auth/logout", {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
        })
                .then(function (response) {
                    return response.json();
        })
                .then(function (jsonResponse) {
            // display a success message
                    console.log(jsonResponse);
        })
            .catch(function (error) {
            console.log(error);
        });

        }
    }


});


const Home = Vue.component('home', {
   template: `
    <div class="mt-5 row ">
        <img src="/static/images/1Beach.jpg"class="pr-4 h-50 w-50"/>
        <div class="card " style="width:500px">
        <div class="card-body">
            <h4 class="card-title" style="font-family:'Passion One',cursive; text-align:center"><i class="fas fa-camera-retro"> Photogram</i></h4>
            <hr/>
            <p class="card-text">Share photos of your favourite moments with friends, family and the world</p>
            <div class="row mt-5">
               <router-link :to="{ path: '/api/users/register'}" class="btn btn-primary btn-lg ml-3 mr-3" style="width:45%">Registration</router-link>
               <router-link :to="{ path: '/api/auth/login'}" class="btn btn-success btn-lg" style="width:45%">Login</router-link>
            </div>
        </div>
        </div>

    </div>
   `,
    data: function() {
       return {}
    }
});

const Login = Vue.component('login', {
    template: `

    <div class="container mt-5 bg-light w-50">
        <h2 class="py-4">Login</h2>
        <form @submit.prevent="login" id="loginForm" method="post">
            <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" name="username" class="w-100 form-control mb-3" placeholder="Your username" required >

            <label for="password">Password:</label>
            <input type="password" name="password" class="w-100 form-control mb-3"  placeholder="Password" required>
            </div>
            <button class="btn btn-lg btn-primary w-50 my-3" type="submit" name="submit" >Sign in</button>
        </form>
    </div>
    `,


    methods: {

        login: function() {
        let self = this;
        let loginForm = document.getElementById('loginForm');
        let form_data = new FormData(loginForm);

        fetch("/api/auth/login", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
        })
                .then(function (response) {
                    return response.json();
        })
                .then(function (jsonResponse) {
            // display a success message
                    console.log(jsonResponse);
        })
            .catch(function (error) {
            console.log(error);
        });

        }
    }


});




const Registration = Vue.component('Registration', {
    template: `

    <div class="container mt-5 bg-light w-50">
        <h2 class="py-4">Registration</h2>
        <form @submit.prevent="registration"  id="registrationForm" method="post" enctype="multipart/form-data">
            <div class="form-group">
            <label for="username">Username</label>
            <input type="text"  name="username" class="w-100 form-control mb-3" placeholder="Your username">

            <label for="password">Password</label>
            <input type="password"  name="password" class="w-100 form-control mb-3"  placeholder="Password">

            <label for="firstName">First Name</label>
            <input type="text"  name="firstname" class="w-100 form-control mb-3" placeholder="Enter your first name">

            <label for="lastName">Last Name</label>
            <input type="text"  name="lastname" class="w-100 form-control mb-3" placeholder="Enter your last name">

            <label for="email">Email</label>
            <input type="email"  name="email" class="w-100 form-control mb-3" placeholder="Enter your email ">

            <label for="location">Location</label>
            <input type="text"  name="location" class="w-100 form-control mb-3" placeholder="Enter your location" >

            <label for="biography">Biography</label>
            <textarea rows="5" cols="40"  name="biography" class="w-100 form-control mb-3" placeholder="Tell us about yourself"></textarea>

            <label for="photo">Photo</label>
            <input type="file"  name="photo" class=" mb-3" placeholder="PHOTO">

            <button name="submit" class="btn btn-block btn-success" >Registration</button>
            </div>

        </form>
    </div>
    `,


    methods: {

        registration: function() {
        let self = this;
        let registrationForm = document.getElementById('registrationForm');
        let form_data = new FormData(registrationForm);

        fetch("/api/users/register", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
        })

                .then(function (response) {
                    return response.json();
        })
                .then(function (jsonResponse) {
            // display a success message
                    console.log(jsonResponse);
        })

            .catch(function (error) {
            console.log(error);
        });

        }
    }

});



const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        { path: '/api/posts', component: Explore },
        // { path: '/api/users/{user_id}/posts', component: Upload},
        // { path: '/api/users/{user_id}', component: Profile},
        // Path to the login page
        { path: '/api/auth/login', component: Login },
        { path: '/api/users/register', component: Registration },
        { path: '/api/auth/logout', component: Logout },
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});



// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router,
    data: {
    messages: false
  }
});

