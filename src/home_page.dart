import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'post_problem_page.dart';

class HomePage extends StatelessWidget {
  final user = FirebaseAuth.instance.currentUser;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome ${user?.displayName ?? ''}'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              Navigator.pop(context);
            },
          )
        ],
      ),
      body: Center(
        child: ElevatedButton(
          child: Text("Report a Problem"),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => PostProblemPage()),
            );
          },
        ),
      ),
    );
  }
}
