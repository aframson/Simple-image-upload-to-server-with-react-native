<?php 


function PostImage()
{
    include 'db.php';

    $data = array('status'=>false);

    if (isset($_POST['submit'])) {

     
        $target_file = basename($_FILES['file']['name']);
        $file_type = pathinfo($target_file,PATHINFO_EXTENSION);
        $is_image = getimagesize($_FILES['file']['tmp_name']);
        $data['image'] = time().'.'.$file_type;
        $file_ = $data['image'];
        if (mysqli_query($con,"INSERT INTO uploads(name) VALUES('$file_')")) {
        
            if ($is_image !== false){
                if (move_uploaded_file($_FILES['file']['tmp_name'],'images/'.$data['image'])) {
                    $data['status'] = $_POST['submit'];
                }else{
                    $data['message'] = 'file is not an image';
                }
            }
        }
       
    }

    // header('Acces-Control-Allow-Origin:*');
    header('Content-type:Application/json*');

    echo json_encode($data);


}

