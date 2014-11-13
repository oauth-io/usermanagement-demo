OAuth.io - User management Demo
===============================

[Demo](http://thyb.github.io/usermanagement-test)

Documentation
-------------

Installation
------------

You need to enable the feature in your OAuth.io dashboard in the `users` tab. For that, you need to get API Key from stormpath and copy paste them in OAuth.io.

Install the OAuth.io javascript SDK from the branch feature/refactoring: https://github.com/oauth-io/oauth-js/tree/feature/refactoring

Signup
------

### With email/password

```
User.signup(data).done(function(user) {
    //todo with `user`
});
```

`data` is an object that must contains:

* email
* password
* firstname
* lastname

You can add other data if you wish (free structure).

exemple:

```
User.signup({
   email: 'john.doe@gmail.com',
   password: 'St0ngP4ssw0rd',
   firstname: 'John',
   lastname: 'Doe',
   company: 'X Corp',
   age: 47
}).done(function(user) {
   //here, your user is logged in
   console.log(user.data.firstname);
}).fail(function(err) {
   //todo with `err`
});
```

### With social logins

```
OAuth.popup(provider).then(function(res) {
    return User.signup(res)
}).done(function(user) {
   //here, your user is logged in
   console.log(user.data.firstname);
}).fail(function(err) {
   //todo with `err`
});
```

`provider` is the name of a provider on OAuth.io as `facebook`, `twitter`, `google` and 100+ others.

The provider need to have the User API enabled to work properly (you can see it when you add a new provider in your OAuth.io Dashbaord).

### Handling errors

Some provider don't give their user's email in their API (it's the case of Twitter for instance). So, you have to ask your user his email manually and setup the email like this:

```
OAuth.popup('twitter').then(function(twitter) {
    twitter.email = "john.doe@gmail.com";
    return User.signup(twitter);
}).done(function(user) {
    //todo with `user`
});
```

Signin
------

### With email/password

```
User.signin(email, password).done(function(user) {
    console.log(user.data.firstname);
});
```

### With social logins

```
OAuth.popup(provider).then(function(res) {
    return User.signin(res);
}).done(function(user) {
    console.log(user.data.firstname);
}).fail(function(err) {
    //todo with err
});
```

Get the connected user
----------------------

### From cache

```
var user = User.getIdentity();
```

### From the API

```
User.refreshIdentity().done(function(user) {
    //todo with `user`
})
```

Know if the user is authenticated
---------------------------------

```
if (User.isLogged()) {
    //todo with authenticated user
}
else {
    //todo with unauthenticated user
}
```

Update your user data
---------------------

```
var user = User.getIdentity()
user.data.firstname = 'Thomas';
user.save().done(function() {
    //todo when saved
}).fail(function(err) {
    //handle `err``
});
```

Add all custom data you want
----------------------------

```
var user = User.getIdentity();
user.data.someData = {
    a: 42,
    b: "some string"
}
user.save();
```

Reset password (or lost password)
---------------------------------

```
User.resetPassword(email).done(function() {
    //email sent to the user containing a key
});

//then...
User.confirmResetPassword(newPassword, key);
```


Change password
---------------

```
var user = User.getIdentity();
user.changePassword(oldPassword, newPassword);
```

Attach social identity to an account
------------------------------------

```
var user = User.getIdentity();
OAuth.popup('google').then(function(google) {
   return user.addProvider(google);
}).done(function() {
   //provider attached
   //Your user are now able to signin with Google
});
```

The list of providers attached to an account
----------------------------------------------

### From cache

```
var user = User.getIdentity();
console.log(user.providers)
```

### From the API

```
var user = User.getIdentity();
user.getProviders().done(function(providers) {
   console.log(providers);
});
```

Logout
------

```
var user = User.getIdentity();
user.logout().done(function() {
   //todo when logout
});
```
