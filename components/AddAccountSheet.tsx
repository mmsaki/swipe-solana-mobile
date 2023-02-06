import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { RefObject, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { COLORS, PROGRAM_ID } from "../constants";
import { User } from "../models/User";
import Input from "./Input";

interface AddReviewSheetProps {
  actionSheetRef: RefObject<ActionSheet>;
  phantomWalletPublicKey: PublicKey | null;
  signAndSendTransaction: Function;
}

interface InputValues {
  username: string;
  uri: string;
}

const INITIAL_STATE = {
  username: "",
  uri: "",
};

export default function AddAccountSheet({
  actionSheetRef,
  phantomWalletPublicKey,
  signAndSendTransaction,
}: AddReviewSheetProps) {
  const [values, setValues] = useState<InputValues>(INITIAL_STATE);

  const handleChange = (field: keyof InputValues, value: string) => {
    let checkedValue = value;
  }
  const handleSubmit = async () => {
    if (!phantomWalletPublicKey) return;
    const user = new User(
      values.username,
      values.uri
    );
    const instructionDataBuffer = user.serialize();
    const transaction = new Transaction();
    const [pda] = await PublicKey.findProgramAddress(
      [phantomWalletPublicKey.toBuffer(), Buffer.from("user")],
      new PublicKey(PROGRAM_ID)
    );
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: phantomWalletPublicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: instructionDataBuffer,
      programId: new PublicKey(PROGRAM_ID),
    });
    transaction.add(instruction);
    signAndSendTransaction(transaction);
    setValues(INITIAL_STATE);
  };

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.sheet}>
      <View style={styles.form}>
        <View style={styles.fields}>
          <Input
            value={values.username}
            placeholder="username"
            onChangeText={(newText) => handleChange("username", newText)}
          />
          <Input
            value={values.uri}
            placeholder="profile image url link"
            onChangeText={(newText) => handleChange("uri", newText)}
          />
        </View>
        <Button
          title="Submit Review"
          onPress={handleSubmit}
          disabled={!values.username || !values.uri}
        />
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  fields: {
    marginBottom: 20,
  },
  form: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  sheet: {
    backgroundColor: COLORS.DARK_GREY,
  },
});

