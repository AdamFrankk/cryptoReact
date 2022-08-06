import React from 'react';
import { useState, useEffect } from 'react';
import style from "./header.module.scss";
// images
import mainLogo from "../../static/logo.png";
import avatar from "../../static/icons/avatar.png";
import Web3 from 'web3/dist/web3.min.js'
import detectEthereumProvider from "@metamask/detect-provider";

// const nav = [
//   {
//     name: "Trade",
//     link: "/trade",
//   },
//   {
//     name: "Buy ETH",
//     link: "/buy",
//   },
//   {
//     name: "Documentation",
//     link: "/documentation",
//   },
//   {
//     name: "Contacts",
//     link: "/contacts",
//   },
// ];

async function requestAccount() {
  const accounts: any = await window?.ethereum?.request({
    method: 'eth_requestAccounts',
  })
  return accounts[0]
}

async function getAccount() {
  const provider = await detectEthereumProvider()
  const web3: any = new Web3(provider);
  const accounts: any = await web3.eth.getAccounts();
  return accounts
}

const Header = () => {
  const [data, setData] = useState({
    address: "",
    isLogged: false
  });
  const isMetamaskSupported: boolean = typeof window.ethereum !== 'undefined'
  useEffect(() => {
    if (isMetamaskSupported) {
      getAccount().then(
        (response) => {
          console.log(response)
          if (response[0] != null) {
            localStorage.setItem('metamaskToken', response[0])
          }
          else {
            localStorage.removeItem('metamaskToken')
          }
        },
      );
      if (localStorage.getItem('metamaskToken')) {
        setData({
          address: localStorage.getItem('metamaskToken'),
          isLogged: true,
        })
      }
    }
  }, []);

  const connectWallet = () => {
    requestAccount().then(res => {
      if (isMetamaskSupported) {
        setData({
          address: res,
          isLogged: true,
        }), localStorage.setItem('metamaskToken', res)
      }
      else {
        window.location.href ="https://metamask.io/download/"
      }
    })
  }

  return (
    <div className={style.header}>
      <div className={style.header__logo}>
        <img src={mainLogo} alt="logo.png" className={style.header__logoImg} />
      </div>
      {/* <div className={style.header__links}>
        {links &&
          Array.isArray(links) &&
          links.map((item) => (
            <Link key={item.name} to={item.link} className={style.header__link}>
            <span className={style.header__linkLabel}>{item.name}</span>
            </Link>
          ))}
      </div> */}
      {data.isLogged ? (
        <div className={style.header__wallet}>
          <div className={style.header__profile}>
            <div className={style.header__profileToken}>{data.address.substring(0, 16) + "..."}</div>

            <div className={style.header__profileOpen}>
              <img src={avatar} alt="avatar.png" className={style.header__avatarImg} />
            </div>
          </div>
        </div>

      ) : (
        <div className={style.header__connectWallet}>
          <button className={style.header__connectButton} onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default Header;
