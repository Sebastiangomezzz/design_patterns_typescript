//Lo primero que sugiere el patrón Abstract Factory es que declaremos de forma explícita interfaces para cada producto diferente de la familia de productos (por ejemplo, silla, sofá o mesilla). Después podemos hacer que todas las variantes de los productos sigan esas interfaces. Por ejemplo, todas las variantes de silla pueden implementar la interfaz Silla, así como todas las variantes de mesilla pueden implementar la interfaz Mesilla, y así sucesivamente.

interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

class ProductionLogger implements ILogger {
  info(message: string): void {}
  warn(message: string): void {
    console.warn(message);
  }
  debug(message: string): void {}
  error(message: string): void {
    console.error(message);
  }
}
class DevelopmentLogger implements ILogger {
  info(message: string): void {
    console.info(message);
  }
  warn(message: string): void {
    console.warn(message);
  }
  debug(message: string): void {
    console.debug(message);
  }
  error(message: string): void {
    console.error(message);
  }
}

export class LoggerFactory {
    public static createLogger(): ILogger{
        if (process.env.NODE_ENV === 'production') {
            return new ProductionLogger();
        }else return new DevelopmentLogger();
    }
}
