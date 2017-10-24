<template lang="pug">
    div
        app-header(:mode="'mode:none'")
        div.donation-container
            div.donation
                h3 LiteCoin
                div.qr
                    img(width=200 height=200 src="~images/donation/litecoin-link.gif")
                div.address LLG3gVGuZtkDzHVciHHLpre7Bca8SFEWAs
            div.donation
                h3 BitCoin
                div.qr
                    img(width=200 height=200 src="~images/donation/bitcoin-link.gif")
                div.address 18he4ZpDcpiwkngZnFaTGoSu26MnS17Pcd
            div.donation
                h3 Etherium
                div.qr
                    img(width=200 height=200 src="~images/donation/etherium-link.gif")
                div.address 0x5d1c7220056e9139a68a2123643609370aca5b21


</template>


<style scoped lang="sass">
    .donation-container
        display: flex
        margin-top: 50px
        justify-content: center
        .donation
            background-color: #bcd8c7
            /*box-shadow: 3px 3px 9px 3px #7b8c81;*/
            /*border-radius: 20px*/
            margin: 20px
            width: 350px
            height: 350px
            display: flex
            flex-direction: column
            align-items: center
        h3
            font-size: 40px
            margin-bottom: 10px
            margin-top: 16px
        .qr
            margin-bottom: 10px
            img
                border-radius: 20px
        .address
            font-size: small
            border-bottom: 1px dotted #989898
            padding-bottom: 1px
            cursor: help

</style>