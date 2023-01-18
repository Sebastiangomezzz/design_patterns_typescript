import fs from "fs";

abstract class DirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>((acc, fileName) => {
        if (this.isJSONFile(fileName)) {
          acc[fileName] = this.readJSONFile(
            `${this.dirPath}/${fileName}`
          );
        } else {
          acc[fileName] = this.readTextFile(
            `${this.dirPath}/${fileName}`
          );
        }
        return acc;
      }, {});
  }
  abstract isJSONFile(filePath: string): boolean;
  abstract readTextFile(filePath: string): string;
  abstract readJSONFile(filePath: string): unknown;
}

class FileReader extends DirectoryScraper {
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

const directoryScraper = new FileReader("./data");
const output = directoryScraper.scanFiles();
console.log(output);
