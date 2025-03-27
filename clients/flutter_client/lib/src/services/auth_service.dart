import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_client/firebase_options.dart';

class AuthService {
  AuthService._internal();

  static String get authId => FirebaseAuth.instance.currentUser?.uid ?? '';

  static Future<void> initialize() async {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }

  static bool isLoggedIn() {
    return FirebaseAuth.instance.currentUser != null;
    // return true;
  }

  static Future<bool> signIn(String email, String password) async {
    bool success = true;

    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      success = false;
    }

    return success;
  }

  static Future<void> signOut() async {
    await FirebaseAuth.instance.signOut();
  }
}
