//refactoring.guru/es/design-patterns/builder
import fs from "fs";

interface IFileReader {
  isJSONFile(filePath: string): boolean;
  readTextFile(filePath: string): string;
  readJSONFile(filePath: string): unknown;
}

const directoryScraper = (dirPath: string, reader: IFileReader) => {
  return fs
    .readdirSync(dirPath)
    .reduce<Record<string, unknown>>((acc, fileName) => {
      if (reader.isJSONFile(fileName)) {
        acc[fileName] = reader.readJSONFile(`${dirPath}/${fileName}`);
      } else {
        acc[fileName] = reader.readTextFile(`${dirPath}/${fileName}`);
      }
      return acc;
    }, {});
};

const fileReader: IFileReader = {
  isJSONFile(filePath: string): boolean {
    return filePath.endsWith(".json");
  },
  readTextFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf8").toString();
  },
  readJSONFile(filePath: string): unknown {
    return JSON.parse(fs.readFileSync(filePath, "utf8").toString());
  },
};

const output = directoryScraper("./data", fileReader);
console.log(output);
