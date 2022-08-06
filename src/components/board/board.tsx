import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3/dist/web3.min.js'
import style from "./board.module.scss";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

async function getBalance() {
    const provider = await detectEthereumProvider();
    const web3: any = new Web3(provider);
    const accounts: [string] = await web3.eth.getAccounts();
    const balance: number = await web3.eth.getBalance(accounts[0]);
    return balance
}

const Board = () => {
    const [data, setData] = useState({
        address: "",
        isLogged: false
    });
    const [balance, setBalance] = useState();

    useEffect(() => {
        if (localStorage.getItem('metamaskToken')) {
            setData({
                address: localStorage.getItem('metamaskToken'),
                isLogged: true,
            })
            getBalance().then(response => setBalance(ethers.utils.formatEther(response)))
        }
        console.log(data.address)
    }, []);

    return (
        <div className={style.board}>
            <h1 className={style.board__title}>Welcome to CryptoReact</h1>
            <div className={style.board__label}>Your account token: {data.isLogged ? ( <span className={style.board__tokenLabel}>{data.address}</span> ) : ( <span className='color-red'>Not autorized</span>)}</div>
            <div className={style.board__table}>
                {data.isLogged ? ( <div className={style.board__tableBody}>
                    <div className={style.board__header}>
                        <div className={style.board__headerName}>Name</div>
                        <div className={style.board__headerCount}>Count</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
                    </div>
                    <div className={style.board__row}>
                        <div className={style.board__tokenName}>Bnb</div>
                        <div className={style.board__tokenCount}>{balance}</div>
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