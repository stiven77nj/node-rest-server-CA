import express from "express";
import path from "path";

interface Options {
    port: number;
    publicPath?: string;
}

/**
 * Clase Server.
 * Gestion del servidor express.
 */
export class Server {
    /**
     * Propiedad para gestionar express.
    */
    private app = express();

    /**
     * Puerto donde corre el servidor.
    */
    private readonly port: number;

    /**
     * Ruta del contenido que muestra el servidor.
    */
    private readonly publicPath: string;

    /**
     * Metodo constructor.
     * @param options Opciones (Parametros||Argumentos).
     */
    constructor(options: Options) {
        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    /**
     * Metodo para inicializar el servidor.
     */
    async start() {
        /**
         * Carpeta publica.
        */
        this.app.use(express.static(this.publicPath));

        /**
         * Cualquier peticion que sea haga y en caso de 
         * que no exista esa ruta, se redirecciona 
         * a la carpeta publica.
        */
        this.app.get('*', (req, res) => {
            const indexPath = path.join(
                __dirname + `../../../${this.publicPath}/index.html`
            );
            res.sendFile(indexPath);
        });

        /**
         * Servidor escuchando...
        */
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        })
    }
}