import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import UploadService from "../services/upload-files.service";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
      selectedFilesInfo: []
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  addNewFiles = (FileList,isMultiple) => {
    let files={};
    for (let file of FileList) {
      if (file.size <= 5000000) {
        if (!isMultiple) {
          return { file };
        }
        console.log(file.name);
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  callUpdateFilesCb = (files) => {
    let filesAsArray = this.convertNestedObjectToArray(files);
    this.setState({
      selectedFilesInfo: filesAsArray,
    });
  };

  selectFile(event) {
    let newFiles;
    newFiles = this.addNewFiles(event.target.files,true);
    console.log(newFiles);
    this.setState({
      selectedFiles: newFiles,
    });
    this.callUpdateFilesCb(newFiles);
  }

  upload() {
    let files = this.state.selectedFilesInfo;
    for(let currentFile of files){
    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          isError: false,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true
        });
      });
    }
    this.setState({
      selectedFiles: undefined,
      selectedFilesInfo:[],
    });

    setTimeout(
      () => this.setState({ currentFile: undefined }), 
      1000
    );
    
  }

  removeFile = name => event  => {
    delete this.state.selectedFiles[name];
    this.callUpdateFilesCb(this.state.selectedFiles);

  }


  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      selectedFilesInfo,
      isError
    } = this.state;
    
    return (
      <div className="mg20">
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        <label htmlFor="btn-upload">
          <input
            multiple
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span"
            color="primary" >
             Choose Files
          </Button>
        </label>
        <div className="file-name" style={{color:'red' }}>
        {selectedFiles && selectedFiles.length > 0 ? `${selectedFiles.length}  files selected` :  null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={this.upload}>
          Upload
        </Button>

        <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
          {message}
        </Typography>

        {selectedFilesInfo.size>0?<Typography variant="h6" className="list-header">
          List of Files to Upload
          </Typography>:null}
        <ul className="list-group">
          {selectedFilesInfo &&
            selectedFilesInfo.map((file, index) => (
              <ListItem
                divider
                color="primary"
                key={index}>
                <span style={{ textDecoration: 'none', color:'grey' }} >{`${file.name} ${file.size<500000 ? '🚀' : '❌' }`}</span>
                {console.log(file.name)} 
                  <IconButton aria-label="delete" color="secondary" disabled={!selectedFilesInfo} onClick={this.removeFile(file.name)}>
                    <DeleteIcon />
                  </IconButton>
              </ListItem>
            ))}
        </ul>

        <Typography variant="h6" className="list-header">
          List of Files
          </Typography>
        <ul className="list-group">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <ListItem
                divider
                color="primary"
                key={index}>
                <a style={{ textDecoration: 'none', color:'grey' }} href={file.avatar}>{file.name}</a>
              </ListItem>
            ))}
        </ul>
      </div >
    );
  }
}
