# reactive-armour-bot

Twiter streaming APIを使い、リアルタイムにTwitterを監視しBitFlyerのAPIを呼び出します。  
使用するにはTwitter API KEYとBitFlyerのAPI KEYが必要です。  
  
例として、すべての注文をキャンセルし、開いているポジションをすべてクローズするロジックを組み込んであります。  

## Install

git clone https://github.com/btcDesushi/reactive-armour-bot

## Usage

config.jsonを編集してAPIキーを設定してください。  
TwiterのAPI KEYは[こちら](https://apps.twitter.com/)で取得できます。
```json
{
    "twitter": {
      "consumer_key": "YOUR_CONSUMER_KEY",
      "consumer_secret": "YOUR_CONSUMER_SECRET",
      "access_token_key": "YOUR_ACCESS_TOKEN_KEY",
      "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
    },
    "bitflyer": {
      "apikey": "YOUR_ACCESS_TOKEN_KEY",
      "secret": "YOUR_CHANNEL_NAME"
    }
}
```

起動するには
```shell
$ node index.js -u user_id1,user_id2 -k keyword1,keyword2
```
それぞれのオプションは「,」区切りで複数指定できます。キーワード監視するユーザーはFollowしている必要があります。

-u 監視ユーザーID1,監視ユーザーID2,,,

-k 監視キーワード1,監視キーワード2,,,

## Issues

ご意見等ありましたら  
https://github.com/btcDesushi/reactive-armour-bot/issues  
こちらかtwitter[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)まで。  
プルリクも歓迎します

## Contributor
[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)  
BTC: 3QsEk7tbNo3JASo7j8s1rCc4JU6kwoZGh9
MONA: MBo7eyvXeaQdP17p4eGcfGpgJQHNkdVqar
ZENY: ZuEdTL9X1iFTHbme8S2pMJJ1f36R5WuAgZ
XP: XM4d1Cggn9LHWtq9nhQXryin2J9BsFsqv2

## License
Code and documentation copyright 2017 by kokushin. Code released under the [MIT License](https://github.com/kokushin/node-twatch/blob/master/LICENSE).
