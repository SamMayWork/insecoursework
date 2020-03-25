let credentials;

function onSignIn (googleUser) {
  googleUser = credentials;
  let profile = googleUser.getBasicProfile();
  console.log(profile.getName());
}