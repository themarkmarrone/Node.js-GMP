import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

export default class DirtWatcher extends EventEmitter {
  constructor(dirPath) {
    super();

    this.dirPath = dirPath;
    this.timer = null;
    this.directory = {};
  }

  watch(delay) {
    this.timer = setInterval(() => {
      this.scanDirectory(this.dirPath);
    }, delay);
  }

  scanDirectory(dirPath) {
    fs.readdir(dirPath, (error, files) => {
      if (error) {
        throw error;
      }

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        fs.stat(filePath, (error, stats) => {
          if (error) {
            throw error;
          }

          const fileDetails = {
            fileName: path.basename(filePath),
            size: stats.size,
            filePath,
          };

          if (this.isFileChanged(fileDetails)) {
            this.emit('changed', filePath);
            this.directory[fileDetails.fileName] = fileDetails;
          }
        });
      });
    });

    this.detectDelete();
  }

  isFileChanged(fileDetails) {
    const file = this.directory[fileDetails.fileName];
    if (file) {
      Object.keys(file).forEach(key => {
        if (file[key] !== fileDetails[key]) {
          return true;
        }
      });
    } else {
      return true;
    }

    return false;
  }

  detectDelete() {
    Object.keys(this.directory).forEach(key => {
      if (this.directory[key]) {
        fs.exists(this.directory[key].filePath, exists => {
          if (!exists) {
            this.directory[key] = undefined;
          }
        });
      }
    });
  }

  stopWatch() {
    clearTimeout(this.timer);
  }
}
