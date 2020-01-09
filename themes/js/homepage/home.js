var glboldata = [];
var mb;

function opnemm(html, id) {
    console.log(111)
    $.get(html + '.html', function(data) {
        mb = html;
        if (!glboldata[html]) {
            glboldata[html] = [];
        }
        $('#' + id).html(data);
        $('#' + id).show();
    })

}
//add
function aopk333() {
    $('#aeeg112').show();
}

function selectChange(type, id, index) {
    glboldata[mb][type] = index;
    $('.' + type).find('img').hide();
    $('#' + id).find('img').show();
}

function selectChanges(type, id, index) {
    glboldata[mb][type] = index;
    if ($('#' + id).children('img').css('display') == 'block') {
        $('#' + id).children('img').hide();
    } else {
        $('#' + id).children('img').show();
    }
}

function selectShop(goods_id, fangka) {
    if (glboldata.hasOwnProperty('selectgood')) {
        $('#border' + glboldata['selectgood']).hide();
    }
    $('#border' + goods_id).show();

    glboldata['selectgood'] = goods_id;
    glboldata['selectfangkanum'] = fangka;

}

//add
function hideShop() {
    $('#aeeg112').hide();
}

function buyGoods() {
    if (!glboldata.hasOwnProperty('selectgood')) {
        alert('请选择商品');
        return;
    }
    $.post("/logic/user/buygoods", {
        goods_id: glboldata['selectgood']
    }, function(response) {
        //var bodyData = response.body;
        if (response.error_code != 0) {
            alert("购买失败，请重新操作");
        } else {
            var obj_data = response.data;
            WeixinJSBridge.invoke("getBrandWCPayRequest", JSON.parse(obj_data)
                //{
                //appId: obj_data.appId,
                //        timeStamp: obj_data.timeStamp,
                //        nonceStr: obj_data.nonceStr,
                //        "package": "prepay_id=" + obj_data.prepay_id,
                //        signType: obj_data.signType,
                //        paySign: obj_data.paySign
                //}
                ,
                function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        //alert("购买成功");
                        //appData.isShowShopLoading = false;
                        //appData.isShowRechargeOkTips = true;
                        $('#showTipsBuySuccess').show();
                        setTimeout(function() {
                            $('#showTipsBuySuccess').hide();
                        }, 2000);
                        $('#user_fangka').html(parseInt(glboldata['fangka'] + glboldata['selectfangkanum']) + '张');
                        //appData.roomCard = parseInt(appData.roomCard) + parseInt(appData.ticket_count);
                        ////viewMethods.clickHideShop();
                        return 0;
                    } else {
                        $('#showTipsBuyfail').show();
                        setTimeout(function() {
                            $('#showTipsBuyfail').hide();
                        }, 2000);
                        //appData.isShowRechargeFailTips = true;
                        //setTimeout(function(){appData.isShowRechargeFailTips = false;},2000);
                        //alert("购买失败，请重新操作");
                        //appData.isShowShopLoading = false;
                    }
                });
        }
    }, 'json');
}

function zhengzkf() {
    alert('敬请期待');
}

function cancelCreate() {
    $('#room').hide();
}

// 选择房间
function selectBankerMode(index, id) {
    glboldata[mb][index] = index;
    $(".bankerUnSelected").find('img').attr('src', './img/banker_unselected.png')
    $('.selectPart').eq(2).hide();
    $('.selectPart').eq(6).hide();
    $('.selectPart').eq(1).show();

    if (index == 1) {
        $('#' + id).find('img').attr('src', './img/banker_selected.png')
    }
    if (index == 2) {
        $('#' + id).find('img').attr('src', './img/banker_selected.png')
        $('.selectPart').eq(6).show();
    }
    if (index == 3) {
        $('#' + id).find('img').attr('src', './img/banker_selected.png')
    }
    if (index == 4) {
        $('#' + id).find('img').attr('src', './img/banker_selected.png')
    }
    if (index == 5) {
        $('#' + id).find('img').attr('src', './img/banker_selected.png')
        $('.selectPart').eq(2).show();
        $('.selectPart').eq(1).hide();
    }
}

function shoujibd() {
    $('#validePhone').show();
}

function showShop() {
    //var is_recharge = {$user.is_recharge};
    //if(glboldata['is_recharge'] == 0){
    //    return ;
    //}
    //alert('re');
    $('#buyfangka').show();
}

function hideShop() {
    $('#buyfangka').hide();
}

//addfunction
function efda332() {
    $('#eags11').hide();
}

function alertgl() {
    $('#valert').show();
}

function alertqx() {
    $('#valert').hide();
}

function alertqx_no() {
    $('#valert_no').hide();
}
//功能管理  页面
function guanlign() {
    window.location.href = '../gongnsm.html';
}

//个人中心    积分
$(function() {

    $('.daoluan').on('click', function() {
        $('.gameListItem').css('z-index', '99');
        $(this).siblings().css('z-index', '9999');
        showlist($(this).attr('data-id'));
    })

    $('.phoneMask').on('click', function() {
        $('#validePhone').hide();
    })

})
// 红包旋转功能
function xuanzhuan() {

    $('.btnOpen').find('img').addClass('transf')

    setTimeout(function() {

        $('#ropen').show();

    }, 1000);
}

function tipxx(msg) {
    $('#tipmsg').html(msg);
    $('#valert2').show();
}

function guanli() {
    alertqx();
    $.post("/logic/home/ktguanli", {
        zt: 1
    }, function(result) {
        if (result.status == '1') {
            $('.groupMenuDetail').show();
            $('.jiurenyaoqinghan').show();
            $('.jiurenchengyuan').show();
            $('.grzxgl2').show();
            $('.grzxgl3').hide();
            tipxx('开通成功');
            location.reload();
            // window.setTimeout("location.href ='/logic/user/index'", 1000);
        } else {
            tipxx(result.info);
        }
    }, 'json');
}

function guanli_no() {
    alertqx();
    $.post("/logic/home/gbguanli", {
        zt: 1
    }, function(result) {
        if (result.status == '1') {
            $('.groupMenuDetail').hide();
            $('.jiurenyaoqinghan').hide();
            $('.jiurenchengyuan').hide();
            $('.grzxgl2').hide();
            $('.grzxgl3').show();
            tipxx('关闭成功');
            location.reload();
            // window.setTimeout("location.href ='/logic/user/index'", 1000);
        } else {
            tipxx(result.info);
        }
    }, 'json');
}

function chenggong() {
    $('#fasongfk').hide();
}

function fasongfk(index) {
    if (index == 1) {
        $('#qh1').show();
        $('#qh2').hide();
        $('#selectTab').css('left', '14%');
        $('#outRP').css('color', '#fff');
        $('#reveiveRP').css('color', '#000')
    } else {
        $('#qh1').hide();
        $('#qh2').show();
        $('#selectTab').css('left', '51%');
        $('#reveiveRP').css('color', '#fff');
        $('#outRP').css('color', '#000')
    }
}

/**
 * 无用代码以下是tghgh
 */
//==========================开市tt
function testxxyx22() {
    return 'hah3ha';
}

function testhah34() {
    return '12332';
}

//===========================结束tt
