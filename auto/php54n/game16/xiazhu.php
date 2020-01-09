<?php
global $Room;
$id = $connection->user['room'];
if (($data2['time'] != $Room[$id]['timexx']) || ($connection->user['index'] != $Room[$id]['list'][$Room[$id]['next']])) {
	return false;
}
clearuserdjs($Room[$id]['djs'], $id);
$Room[$id]['timexx'] = 0;
$Room[$id]['count'] = $Room[$id]['count'] + 1;
if ($connection->user['tpzt'] == 1) {
	$list = $Room[$id]['cm2'];
} else {
	$list = $Room[$id]['cm'];
}
if ($Room[$id]['beishu'] < $data2['xz']) {
	$Room[$id]['beishu'] = $data2['xz'];
}
$roomInfo = $db->getOne("SELECT rule,uid FROM jz_room WHERE id='{$id}'");
$rules = json_decode($roomInfo["rule"], true);
$credits = $Room[$id]['user'][$connection->user['id']]->user['dqjf'] - $list[$data2['xz']];
$mem = $db->getOne("SELECT * FROM jz_qun WHERE open='{$roomInfo["uid"]}' AND uid='{$connection->user["id"]}'");
if($rules["mode"]) {
  	$msg = false;
  	if($roomInfo["uid"] == $connection->user["id"]) {
    	if(0 > ($connection->user['credits'] + $credits)) {
        	$msg = "积分不足，请联系客服上分！";
        }
    } else {
    	if(0 > ($mem['credits'] + $credits)) {
        	$msg = "积分不足，请联系群主上分！";
        }
    }
  	if($msg) {
        $msg = array("msg" =>  $msg, "isBackHome" => false);
        act('tipAlert',$msg, $connection);
        act('operationButton', '4', $connection);
        return false;
    }
}
$msg = array();
$msg['id'] = 'Buttons';
$msg['html'] = '';
act('html', $msg, $connection);
if ($connection->user['tpzt'] != 1) {
	act('hidebook', '', $connection);
}
$msg = array();
$msg['index'] = $connection->user['index'];
$msg['jf'] = $list[$data2['xz']];
$Room[$id]['total'] = $Room[$id]['total'] + $list[$data2['xz']];
$Room[$id]['cmlist'][] = $list[$data2['xz']];
$Room[$id]['user'][$connection->user['id']]->user['djjf'] = $Room[$id]['user'][$connection->user['id']]->user['djjf'] - $list[$data2['xz']];
$Room[$id]['user'][$connection->user['id']]->user['dqjf'] = $Room[$id]['user'][$connection->user['id']]->user['dqjf'] - $list[$data2['xz']];
$connection->user['slxzzt']=1;
foreach ($Room[$id]['user'] as $key => $connection3) {
	act('scoresArea', $msg, $connection3);
	act('mp3play', $list[$data2['xz']] . 'fen', $connection3);
}
if ($Room[$id]['sx'] > 0 && $Room[$id]['total'] >= $Room[$id]['sx']) {
	$time_interval = 1;
	$Room[$id]['timexx'] = time();
	djs($time_interval, 'over', $id, $Room[$id]['timexx']);
} else {
	$data = array();
	$Room[$id]['time1'] = time();
	$data['act'] = 'next';
	$data['time'] = $Room[$id]['timexx'];
	$data['room'] = $id;
	reqact($data, '');
} 