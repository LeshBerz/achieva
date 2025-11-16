# Как задеплоить смарт-контракт

<!-- TOC -->
* [Как задеплоить смарт-контракт](#как-задеплоить-смарт-контракт)
    * [1. Settings](#1-settings)
    * [2. Metadata](#2-metadata)
    * [3. Smart-contracts](#3-smart-contracts)
    * [4. Deploy-n-mint](#4-deploy-n-mint)
    * [5. Final](#5-final)
<!-- TOC -->

### 1. Settings

Заполнить файл .env, опираясь на пример

- Зарегистрироваться в pinata: https://pinata.cloud/
- Зарегистрироваться в toncenter: https://toncenter.com/
- Пополнить баланс в testnet: https://t.me/tnfaucet_bot

### 2. Metadata

Опционально: придумать описание и найти картинки для item-ов, затем заменить их в data и выполнить скрипт `gen metadata`

### 3. Smart-contracts

Опционально: изменить код смарт-контрактов на tolk и запустить скрипт `gen boc`

### 4. Deploy-n-mint

Выполнить скрипты `build` -> `collection deploy` -> `items mint`

### 5. Final

Радоваться, если получилось как [тут](https://testnet.tonviewer.com/kQDAo62bFutQGzu9k7VBAt1R6gEqvUyZhN3uRlTHB1MKM6kr?section=overview) 

_Для минта на 5 разных адресов нужно 5 раз запустить скрипт `items mint`, каждый раз меняя `RECIPIENT_ADDRESS` в .env_

_Для минта 5 item-ов на 1 адрес нужно 1 раз запустить скрипт `items mint` с параметром `SBT_QUANTITY=5`_
