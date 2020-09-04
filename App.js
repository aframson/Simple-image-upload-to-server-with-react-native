import * as React from 'react';
import { Button, Image, View, Platform,TouchableOpacity,Text,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    imageData: null,
    progress:0,
    isdone:'',
    image:null,
    show_pro:false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         {this.state.image?
         <TouchableOpacity style={styles.upload} onPress={()=>this.sendPhoto()}>
           <Text style={{color:'white'}}>Upload Image</Text>
         </TouchableOpacity>
        :null}
        {this.state.show_pro?
         <View
         style={{ 
           height:20,
           width:'80%',
           backgroundColor:'gray',
           borderRadius:50,
           overflow:'hidden'
         }}
       >
         <View style={{ 
           backgroundColor:'#f45678',
           height:'100%',
           width:this.state.progress+'%',
           borderRadius:50
         }}></View>
        </View>:null}
       
        <Text style={{marginTop:20,color:'green',fontSize:20}}>{this.state.isdone}</Text>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };








    sendPhoto = () => {

      
      let uploadData = new FormData();
      let xhr = new XMLHttpRequest();
  
	   	uploadData.append('submit', 'ok');
      uploadData.append('file', { type: 'image/jpg', uri:this.state.imageData, name: 'uploadimgtmp.jpg' });
  
      xhr.upload.addEventListener('progress', (e) => {   
        this.setState({ progress: Math.round((e.loaded * 100) / e.total) ,show_pro:true});
      });
      xhr.addEventListener('load', () => {
        this.setState({ progress: 100,isdone:'uploaded succesfully !! '}); 
      });
      xhr.open('POST', 'http://172.20.10.4/fred/route.php?func=PostImage');
      xhr.send(uploadData);
    };

 




  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
      if (!result.cancelled) {
        this.setState({ imageData:'data:image/jpeg;base64,'+result.base64,image:result.uri });
        // console.log(this.state.imageData)
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}



const styles = StyleSheet.create({
       upload:{
           height:'auto',
           padding:10,
           width:100,
           backgroundColor:'deeppink',
           borderRadius:50,
           marginTop:10
       }
});