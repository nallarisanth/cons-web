import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class PostProblemPage extends StatefulWidget {
  @override
  _PostProblemPageState createState() => _PostProblemPageState();
}

class _PostProblemPageState extends State<PostProblemPage> {
  TextEditingController _descController = TextEditingController();
  File? _image;
  bool _loading = false;
  LocationData? _location;

  Future<void> pickImage() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.camera);
    if (picked != null) _image = File(picked.path);
    setState(() {});
  }

  Future<void> getLocation() async {
    Location location = Location();
    _location = await location.getLocation();
  }

  Future<void> postProblem() async {
    if (_image == null || _descController.text.isEmpty) return;

    setState(() { _loading = true; });
    await getLocation();

    // Upload image
    String fileName = '${DateTime.now().millisecondsSinceEpoch}.jpg';
    Reference ref = FirebaseStorage.instance.ref('problems/$fileName');
    await ref.putFile(_image!);
    String url = await ref.getDownloadURL();

    // Save to Firestore
    await FirebaseFirestore.instance.collection('problems').add({
      'user': FirebaseAuth.instance.currentUser?.displayName,
      'description': _descController.text,
      'image': url,
      'latitude': _location?.latitude,
      'longitude': _location?.longitude,
      'timestamp': DateTime.now(),
      'status': 'unsolved',
    });

    setState(() { _loading = false; });
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Problem posted!")));
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Report a Problem")),
      body: _loading ? Center(child: CircularProgressIndicator()) : Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _descController,
              decoration: InputDecoration(labelText: "Description"),
            ),
            SizedBox(height: 20),
            _image != null ? Image.file(_image!, height: 150) : Container(),
            ElevatedButton(
              onPressed: pickImage,
              child: Text("Take Photo"),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: postProblem,
              child: Text("Post Problem"),
            )
          ],
        ),
      ),
    );
  }
}
