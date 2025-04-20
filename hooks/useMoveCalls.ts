import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { useWallet } from '@suiet/wallet-kit';
import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient } from "@suiet/wallet-kit";

export const useMoveCalls = () => {
   
  const client = new SuiClient({
    url: getFullnodeUrl("testnet")
  });

  const { signAndExecuteTransaction, account } = useWallet();
  const packageObjectId = '0x69dd51b6dfc243004a82f83dc51d974e6db518c599a8f0418c2a138732eb7a88';

  const createForm = async ({
    purpose,
    audience,
    informationTypes,
    ageGroup,
    questions,
  }: {
    purpose: string;
    audience: string;
    informationTypes: string;
    ageGroup: string;
    questions: Array<{
      id: string;
      type: string;
      question: string;
      options?: string[];
    }>;
  }) => {
    try {
      if (!account?.address) {
        throw new Error("Wallet is not connected.");
      }

      const tx = new Transaction();

      const questionObjs = questions.map((q) =>
        tx.moveCall({
          target: `${packageObjectId}::forms::create_question`,
          arguments: [
            tx.pure.string(q.id),
            tx.pure.string(q.type),
            tx.pure.string(q.question),
            q.options
              ? tx.pure.vector('string', q.options)
              : tx.pure.vector('string', []),
          ],
        })
      );

      const questionVector = tx.makeMoveVec({
        elements: questionObjs,
        type: `${packageObjectId}::forms::Question`,
      });

      const form = tx.moveCall({
        target: `${packageObjectId}::forms::create_form`,
        arguments: [
          tx.pure.string(audience),
          tx.pure.string(informationTypes),
          tx.pure.string(purpose),
          tx.pure.string(ageGroup),
          questionVector,
        ],
      });

      tx.transferObjects([form], tx.pure.address(account.address));

      const result = await signAndExecuteTransaction({
        transaction: tx,
      },{});

      console.log('✅ Form created:', result);
      return result;
    } catch (err) {
      console.error('❌ Failed to create form:', err);
      throw err;
    }
  };

  return {
    createForm
  };
};
