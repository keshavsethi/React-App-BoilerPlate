import http from "../http-common";

class UploadFilesService {
  constructor() {
    this.state = {
      base: '',
  }
}
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error:', error);
    };
}
 

  upload(file, onUploadProgress) {
    this.getBase64(file, (result) => {
      console.log(result);
    });
    let formData;
    formData =  {
      "name": file.name,
      "size":file.size,
    };  
    return http.post("/", formData, { 
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
  getFiles() {
    return http.get("/");
  }
}

export default new UploadFilesService();
