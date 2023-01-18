import fs from "fs";

interface IFileReader {
  isJSONFile(filePath: string): boolean;
  readTextFile(filePath: string): string;
  readJSONFile(filePath: string): unknown;
}

class DirectoryScraper {
  constructor(public dirPath: string, public reader: IFileReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>((acc, fileName) => {
        if (this.reader.isJSONFile(fileName)) {
          acc[fileName] = this.reader.readJSONFile(`${this.dirPath}/${fileName}`);
        } else {
          acc[fileName] = this.reader.readTextFile(`${this.dirPath}/${fileName}`);
        }
        return acc;
      }, {});
  }
}

class FileReader implements IFileReader {
  isJSONFile(filePath: string): boolean {
    return filePath.endsWith(".json");
  }
  readTextFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf8").toString();
  }
  readJSONFile(filePath: string): unknown {
    return JSON.parse(fs.readFileSync(filePath, "utf8").toString());
  }
}

const directoryScraper = new DirectoryScraper("./data", new FileReader());
const output = directoryScraper.scanFiles();
console.log(output);
