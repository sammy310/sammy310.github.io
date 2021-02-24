var firebaseConfig = {
    apiKey: "AIzaSyDqCc2p0HfKQ8hZeeftvy_BAImqOpDKD1U",
    authDomain: "trian-49247795.firebaseapp.com",
    databaseURL: "https://trian-49247795.firebaseio.com",
    projectId: "trian-49247795",
    storageBucket: "trian-49247795.appspot.com",
    messagingSenderId: "119385446960",
    appId: "1:119385446960:web:9ddf2dbcde8d35bc412bf5"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const analytics = firebase.analytics();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var userInfo = document.getElementById("user_info");
      userInfo.innerHTML = user.displayName + " | 로그아웃";
      userInfo.style.display = "inline-block";
  } else {
    var userInfo = document.getElementById("user_info").style.display = "none";
  }
});
document.getElementById("user_info").onclick = function(){
    if (firebase.auth().currentUser){
        firebase.auth().signOut();
    }
};