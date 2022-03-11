# E_voting-dapp
A decentralized system for e-voting using Block chain. (Under Development)

<h1>How To Use :</h2><br>
<ol>
  <li>Clone this repository</li>
  <li>Start Ganache on your machine</li>
  <li>Open terminal and cd to the <strong>E_voting-dapp</strong> directory and run <br> <code>npm install -g truffle</code>. This will install truffle suit on your machine globally. Wait for the installation process.</li>
  <li>Now run <code>truffle migrate --reset</code></li>
  <li>Now cd to client directory and run <code>npm start</code></li>
</ol>

Step 4 will deploy the smart contract on local block chain hosted by ganache.
Step 5 will start the react server on local machine.

If followed correctly the project will work fine.

<h3>Problem Fixers :</h3>
- If you run into <code>truffle.ps1 cannot be loaded because running scripts is disabled on this system.</code> ERROR. Then visit this link (<a href="https://www.c-sharpcorner.com/article/how-to-fix-ps1-can-not-be-loaded-because-running-scripts-is-disabled-on-this-sys/" target="_blank">Fix Error PS1<a/>).
<br><br>
- If it says <code>'Set-ExecutionPolicy' is not recognized as an internal or external command</code>. Use <strong>PowerShell</strong> and run those scripts and not <strike>CMD</strike>. refer (<a href="https://stackoverflow.com/questions/58536140/set-executionpolicy-is-not-recognized-as-an-internal-or-external-command-oper" target="_blank">here</a>).
