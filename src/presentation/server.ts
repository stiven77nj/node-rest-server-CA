import express, { Router } from "express";
import path from "path";


/**
 * Interfaz Options.
 * Interfaz para la configuracion del Servidor.
 */
interface Options {
    port: number;
    publicPath?: string;
    routes: Router
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
     * Propiedad para gestionar las rutas.
    */
    private readonly routes: Router;

    /**
     * Metodo constructor.
     * @param options Opciones (Parametros||Argumentos).
     */
    constructor(options: Options) {
        const { port, publicPath = 'public', routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
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
         * Middlewares.
        */
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        /**
         * Rutas
        */
        this.app.use(this.routes);

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
         * Puerto en el que corre la aplicacion...
        */
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}