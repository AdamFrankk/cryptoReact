import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3/dist/web3.min.js'
import style from "./board.module.scss";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

const minABI = [
    // balanceOf
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];

async function getBalance() {
    const provider = await detectEthereumProvider();
    const web3: any = new Web3(provider);
    const accounts: [string] = await web3.eth.getAccounts();
    const balance: number = await web3.eth.getBalance(accounts[0]);
    return balance
}

async function getTokenBalance(token: string) {
    const provider = await detectEthereumProvider();
    const web3: any = new Web3(provider);
    const accounts: [string] = await web3.eth.getAccounts();
    const tokenAddress = token;
    const walletAddress = accounts[0];
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    const result = await contract.methods.balanceOf(walletAddress).call(); 
    const format = web3.utils.fromWei(result);
    return format
}

const Board = () => {
    const [data, setData] = useState({
        address: "",
        isLogged: false
    });
    const [balanceBnb, setBnbBalance] = useState(0)
    const [balanceUsdt, setUsdtBalance] = useState(0)
    const [balanceEth, setEthBalance] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('metamaskToken')) {
            setData({
                address: localStorage.getItem('metamaskToken'),
                isLogged: true,
            })
            getBalance().then(response => setBnbBalance(ethers?.utils.formatEther(response)))
            getTokenBalance("0x29bF9170eA91DD949d93cED804d4433aDbD20832").then(response => setUsdtBalance(response))
            getTokenBalance("0xE872167664d7412Db01b1456e2D5777f7489132D").then(response => setEthBalance(response))
        }
        console.log(data.address)
    }, []);

    return (
        <div className={style.board}>
            <h1 className={style.board__title}>Welcome to CryptoReact</h1>
            <div className={style.board__label}>Your account token: {data.isLogged ? (<span className={style.board__tokenLabel}>{data.address}</span>) : (<span className='color-red'>Not autorized</span>)}</div>
            <div className={style.board__table}>
                {data.isLogged ? (<div className={style.board__tableBody}>
                    <div className={style.board__header}>
                        <div className={style.board__headerName}>Name</div>
                        <div className={style.board__headerCount}>Count</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>BNB</div>
                        <div className={style.board__tokenCount}>{balanceBnb}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>USDT</div>
                        <div className={style.board__tokenCount}>{balanceUsdt}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>ETH</div>
                        <div className={style.board__tokenCount}>{balanceEth}</div>
                    </div>
                </div>
                ) : (
                    <div>
                        Not autorized
                    </div>
                )}
            </div>
        </div>
    );
}

export default Board;