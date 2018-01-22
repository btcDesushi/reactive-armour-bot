//
// BOT for twitter watch
//

const Twitter = require('twitter');
const minimist = require('minimist');
const bitflyer = require('bitflyer-promise');
const config = require('./config.json');
const product_code = 'FX_BTC_JPY';

// CLI Options
const options = {
    user: minimist(process.argv).u || minimist(process.argv).user,
    keyword: minimist(process.argv).k || minimist(process.argv).keyword
}

let username,keyword;

if (options.user !== true && options.user !== undefined) {
  username = new RegExp(String(options.user).replace(/\,/g, '|'));
} else {
  username = new RegExp('');
}

if (options.keyword !== true && options.keyword !== undefined) {
  keyword = new RegExp(String(options.keyword).replace(/\,/g, '|'), 'i');
} else {
  keyword = new RegExp('');
}

console.log('監視対象:' + username);
console.log('監視キーワード:' + keyword);

const client = new Twitter(config.twitter);
client.stream('user', {}, (stream) => {
    stream.on('data', (obj) => {
      let tweet = {
        'username': obj.user.screen_name,
        'text': obj.text,
        'checkText': obj.text.replace(/(https:\/\/t.co\/([a-z|A-Z|0-9]+))/g, '')
      }
      if (username.test(tweet.username) && keyword.test(tweet.checkText)) {
        console.log(`${new Date()} ${tweet.username}:${tweet.text}`);
        closeAllPosition();
      }
    });

    stream.on('error', (error) => {
      throw error;
    })
});

// bitFlyer
bitflyer.setCredentials(config.bitflyer.apikey, config.bitflyer.secret);
process.on('unhandledRejection', console.dir);

function clearAllOrders() {
	bitflyer.cancelAllChildOrders({
        product_code: product_code
    })
    .then(function(payload) {
        console.log('すべての注文をキャンセルしました');
    });
}

function closeAllPosition() {
	clearAllOrders();

	bitflyer.getPositions({
			'product_code': product_code
    })
    .then(function(payload) {
        var realPosition = JSON.parse(payload);
        if (realPosition.length > 0) {
            var clearSide = 'SELL';
            if (realPosition[0].side == 'SELL') {
                clearSide = 'BUY';
            }
            var size_sum = 0;
            for (var i = 0; i < realPosition.length; i++)
                size_sum += realPosition[i].size;
            size_sum = Math.round(size_sum * 1000) / 1000;
            bitflyer.sendChildOrder({
                    'product_code': product_code,
                    'child_order_type': 'MARKET',
                    'side': clearSide,
                    'size': size_sum,
                    'minute_to_expire': 10000,
                    'time_in_force': 'GTC'
            })
            .then(function(payload) {
                var data = JSON.parse(payload);
                console.log('close order_id:' + data.child_order_acceptance_id);
                console.log('すべての建玉を決済しました');
            })
            .catch(function(error) {
                throw error;
            });
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// 以下は特殊注文のオーダーをnodejsで実行する例
// あくまで例であって無保証です。

function specialOrder(price,side,size,gain_side,gain_price) {
    bitflyer.sendParentOrder({
        'order_method': 'IFD',
        'minute_to_expire': 1,
        'time_in_force': 'GTC',
        'parameters': [
            {
                'product_code': 'FX_BTC_JPY',
                'condition_type': 'LIMIT',
                'price': price,
                'side': side,
                'size': size
            },
            {
                'product_code': 'FX_BTC_JPY',
                'condition_type': 'LIMIT',
                'side': gain_side,
                'price': gain_price,
                'size': size
            }
        ]
    })
    .then(function(payload) {
        console.log(payload);
    })
    .catch(function(error) {
        console.log('ORDER ERROR');
    });
}