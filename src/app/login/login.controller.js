var ref = new Firebase("https://vyapi-userauth.firebaseio.com/");

        var authData = ref.getAuth();

        if (authData) {
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
               window.location="https://vyapi.firebaseapp.com";
        }

