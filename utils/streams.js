#!/usr/bin/env node
const minimist = require('minimist');
const fs = require('fs');
const through = require('through2');
const csv = require('csv-parse');
const JSONStream = require('JSONStream');
const path = require('path');
const StreamConcat = require('stream-concat');
const chalk = require('chalk');

// Main actions to be called

function reverse(str) {
  const transformedFunc = buffer =>
    buffer
      .toString()
      .replace('\n', '')
      .split('')
      .reverse()
      .join('')
      .concat('\n');
  if (str) {
    console.log(chalk.green(transformedFunc(str)));
  } else {
    const input = process.stdin;
    const output = process.stdout;

    transformStream(input, output, transformedFunc);
  }
}

function transform(str) {
  const transformedFunc = buffer => buffer.toString().toUpperCase();

  if (str) {
    console.log(chalk.green(transformedFunc(str)));
  } else {
    const input = process.stdin;
    const output = process.stdout;
    transformStream(input, output, transformedFunc);
  }
}

function outputFile(filePath) {
  if (fs.existsSync(filePath)) {
    const input = fs.createReadStream(filePath);
    const output = process.stdout;

    transformStream(input, output);
  } else {
    throw new Error(chalk.red('File does not exist'));
  }
}

function convertFromFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs
      .createReadStream(filePath)
      .pipe(csv({ columns: true }))
      .pipe(JSONStream.stringify(false))
      .pipe(process.stdout);
  } else {
    throw new Error(chalk.red('File does not exist'));
  }
}

function convertToFile(filePath) {
  if (fs.existsSync(filePath)) {
    const output = fs.createWriteStream(filePath.replace('.csv', '.json'));
    fs
      .createReadStream(filePath)
      .pipe(csv({ columns: true }))
      .pipe(JSONStream.stringify(false))
      .pipe(output);
  } else {
    throw new Error(chalk.red('File does not exist'));
  }
}

function cssBundler(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdir(dirPath, (error, files) => {
      if (error) {
        throw error;
      }

      let extension;
      const streams = files.map(file => {
        extension = path.extname(file);
        const filePath = path.join(dirPath, file);

        return fs.createReadStream(filePath);
      });

      streams.push(fs.createReadStream('./nodejs-homework3.css'));

      const newFilePath = dirPath + '/bundle' + extension;
      const output = fs.createWriteStream(newFilePath);
      const combinedStream = new StreamConcat(streams);

      combinedStream.pipe(output);
    });
  } else {
    throw new Error(chalk.red('Directory does not exist'));
  }
}

function help() {
  console.log('Usage: ');
  console.log('streams [--help] [-h] [--action=<actionName> <param>] [-a <actionName>]\n');
  console.log('Available actions');
  console.log(
    '--action=reverse <string>                      Reverses passed string or terminal input if string not passed reverses',
  );
  console.log(
    '--action=transform <string>                    Transforms passed string or terminal input if string not passed to upper case',
  );
  console.log('--action=outputFile [--file=<filePath>]        Outputs given file to the terminal');
  console.log(
    '--action=convertFromFile [--file=<filePath>]   Converts given file from scv to json and outputs it to the terminal',
  );
  console.log(
    '--action=convertToFile [--file=<filePath>]     Converts given file from scv to json and outputs it to a new file',
  );
  console.log(
    '--action=cssBundler [--path=<dirPath>]         Concats files from given folder and outputs it to a new file',
  );
}

function transformStream(transformInput, transformOutput, transformFunc) {
  const transform = through(function(buffer, encoding, next) {
    const transformedBuffer = transformFunc ? transformFunc(buffer) : null;
    this.push(transformedBuffer || buffer);
    next();
  });

  transformInput.pipe(transform).pipe(transformOutput);
}

// Command line interactions

const args = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    action: 'a',
    file: 'f',
    path: 'p',
  },
});

if (process.argv.length < 3) {
  console.log(chalk.red('Error: wrong input'));
  help();
} else if (args.action) {
  switch (args.action) {
    case 'reverse': {
      const string = args['_'].join(' ');

      reverse(string);
      break;
    }

    case 'transform': {
      const string = args['_'].join(' ');

      transform(string);
      break;
    }

    case 'outputFile': {
      const filePath = args.file;
      if (filePath && typeof filePath === 'string') {
        outputFile(filePath);
      } else {
        console.log(chalk.yellow('Please, pass file path'));
        help();
      }

      break;
    }

    case 'convertFromFile': {
      const filePath = args.file;
      if (filePath && typeof filePath === 'string') {
        convertFromFile(filePath);
      } else {
        console.log(chalk.yellow('Please, pass file path'));
        help();
      }

      break;
    }

    case 'convertToFile': {
      const filePath = args.file;
      if (filePath && typeof filePath === 'string') {
        convertToFile(filePath);
      } else {
        console.log(chalk.yellow('Please, pass file path'));
        help();
      }

      break;
    }

    case 'cssBundler': {
      const dirPath = args.path;
      if (dirPath && typeof dirPath === 'string') {
        cssBundler(dirPath);
      } else {
        console.log(chalk.yellow('Please, pass directory path'));
        help();
      }
      break;
    }

    default:
      console.log(chalk.red('Error: wrong action name'));
      help();
      break;
  }
} else if (args.help) {
    help();
} else {
  console.log(chalk.red('Error: wrong input'));
  help();
}
