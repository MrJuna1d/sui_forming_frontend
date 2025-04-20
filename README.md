# Formcraft

### Project Description:
Most people ignore surveys because there's no real incentive. I’m fixing that by making surveys rewarding — you get tokens or NFTs every time you respond. It’s all built on the Sui blockchain so everything’s transparent, secure, and actually fun.
We built a platform where anyone can create surveys on-chain using Sui. When someone responds, their answers are stored securely on the blockchain, and they are rewarded for it to keep them incentivized.




## Tech Stack
![TechS Tack](https://github.com/user-attachments/assets/f1ed70df-3261-45c9-9e83-fdd76e5bb670)

⚠️ **Disclaimer:**  
To enable the Gemini API functionality, please insert your own API key in the `.env` file.

## Smart Contract Deployed
![smartContractDeployed](https://github.com/user-attachments/assets/6849856f-fb16-4932-88ba-405fe9888737)

Smart Contract Github Link:
https://github.com/KwanJunEr/sui_forming_backend.git

## 🧠 Frontend Interaction with the Smart Contract
To see exactly how the frontend communicates with the Smart Contract, check the following files:

- 📄 Smart Contract Calls:
The logic for interacting with the smart contract (e.g., upload, read, etc.) is handled in the file:
hooks/useMoveCalls.ts

- 📤 Survey Upload (by Creator):
The part where the creator uploads a survey to the smart contract can be found in:
app/form_creator/createform/page.tsx

In "app/form_creator/createform/page.tsx" you can go to line 160 to see how the hook is used.
