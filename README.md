# reactive-armour-bot

Twiter streaming APIを使い、リアルタイムにTwitterを監視し、BitFlyerのAPIを呼び出します。
使用するにはTwitter API KEYとBitFlyerのAPI KEYが必要です。

例として、すべての注文をキャンセルし、開いているポジションをすべてクローズするロジックを組み込んであります。

## install

git clone

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
```json

起動するには
```shell
$ node index.js -u user_id1,user_id2 -k keyword1,keyword2
```
それぞれのオプションは「,」区切りで複数指定できます
-u 監視ユーザーID1,監視ユーザーID2,,,
-k 監視キーワード1,監視キーワード2,,,

## Issues

ご意見等ありましたら
https://github.com/btcDesushi/reactive-armour-bot/issues
こちらかtwitter[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)まで。
プルリク歓迎します

## Contributor
[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)

## License
Code and documentation copyright 2017 by kokushin. Code released under the [MIT License](https://github.com/kokushin/node-twatch/blob/master/LICENSE).
