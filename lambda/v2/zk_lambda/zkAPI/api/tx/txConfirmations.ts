function listenForTransactionMine(transactionResponse: any, provider: any) {
    console.log(`Mining ${transactionResponse.hash}`);
    return new Promise<void>((resolve, reject) => {
      try {
        provider.once(transactionResponse.hash, (transactionReceipt: any) => {
          console.log(
            `Completed with ${transactionReceipt.confirmations} confirmations. `
          );
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  export default listenForTransactionMine;