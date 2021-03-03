<?php
include('config.php');
class db
{
    // instancia del singleton
    private static $instance = null;


    // Datos de configuracion de la BD
    private $user = PGUSER;
    private $pass = PGPASSWORD;
    private $dbName = PGDATABASE;
    private $dbHost = PGHOST;
    private $dbPort = PGPORT;

    // Metodo para obtener la instancia del singleton
    public static function getInstance()
    {
        if (!self::$instance instanceof self) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    private function __construct()
    {
        // Conectando y seleccionado la base de datos  
        $dbconn = pg_pconnect('host=' . PGHOST . ' port=' . PGPORT . ' dbname=' . PGDATABASE . ' user=' . PGUSER . ' password=' . PGPASSWORD);      
    }


    // Metodos para hacer consultas a la BD
    public function dbquery($query)
    {
        if (pg_query($query)) {
            return true;
        }
    }

    public function get_result($query)
    {
        $result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());
        return $result;
    }
}
