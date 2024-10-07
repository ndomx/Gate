import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_client/firebase_options.dart';

class AuthService {
  AuthService._internal();

  static Future<void> initialize() async {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );

    await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  }

  static bool isLoggedIn() {
    // FirebaseAuth.instance.
    // final user = FirebaseAuth.instance.currentUser;

    return FirebaseAuth.instance.currentUser != null;
  }

  static Future<bool> signIn(String email, String password) {
    return FirebaseAuth.instance
        .signInWithEmailAndPassword(
          email: email,
          password: password,
        )
        .then((value) => true)
        .catchError((err) => false);
  }
}
