import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "../components/Button";
import UserSVG from "../assets/user-profile.svg";
import { User } from "../models/User";
import { PROGRAM_ID } from "../constants";
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import usePhantomConnection from "../hooks/WalletContextProvider";
import { Program } from "@coral-xyz/anchor";
import { IDL, type Swipe } from "./swipe";
import { AnchorProvider } from "@coral-xyz/anchor";

const profilePicture = require("../assets/favicon.png");


const CreateAccount = (props: any) => {
  const [username, setUsername] = useState("");
  const [uri, setUri] = useState("");
  const {
    connection,
    session,
    phantomWalletPublicKey,
    signAndSendTransaction,
    disconnect,
    signAllTransactions,
  } = usePhantomConnection();
  
  const inclompleteProfile = !username || !uri;
  const handleTransaction = async (user: User) => {
    if (!phantomWalletPublicKey) {
      alert("Please connect your Phantom wallet");
      return;
    }
    const instructionDataBuffer = user.serialize();
    const transaction = new Transaction();
    const [pda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("user"), new PublicKey(phantomWalletPublicKey).toBuffer()],
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
    

    const program = new Program(IDL, PROGRAM_ID);

    const tx = await program.methods.createUser(username, uri).accounts({
      owner: new PublicKey(phantomWalletPublicKey),
      user: pda,
    }).instruction();

    transaction.add(tx);
    
    // const instruction2 = SystemProgram.transfer({
    //   fromPubkey: phantomWalletPublicKey,
    //   toPubkey: new PublicKey("B1GmJpBZeGrW144CcSkHxxHE4yoyXnudNhWoewVDyfnL"),
    //   lamports: 1000000,
    // });
    
    // transaction.add(instruction);
      
    await signAndSendTransaction(transaction);
    console.log("program", program);
    console.log("pda", pda);
    console.log("instruction", tx);
    console.log("Transaction sent", transaction);
  };

  const handleSubmit = async () => {
    if (!phantomWalletPublicKey) return;
    const user = new User(username, uri);
    const buffer = user.serialize();
    const [pda, bump] = await PublicKey.findProgramAddress(
      [new PublicKey(phantomWalletPublicKey).toBuffer(), Buffer.from("user")],
      new PublicKey(PROGRAM_ID)
    );
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: new PublicKey(phantomWalletPublicKey),
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
      data: buffer,
      programId: new PublicKey(PROGRAM_ID),
    });
    const transaction = new Transaction();
    // transaction.add(instruction);

    const program = new Program(IDL, PROGRAM_ID);

    const tx = await program.methods
      .createUser(username, uri)
      .accounts({
        owner: new PublicKey(phantomWalletPublicKey),
        user: pda,
      })
      .instruction();
    transaction.add(tx);

    const signedTransaction = await signAndSendTransaction(transaction);
    console.log(new PublicKey(phantomWalletPublicKey));
    await signAndSendTransaction(transaction);
    console.log("program", program);
    console.log("pda", pda);
    console.log("instruction", tx);
    console.log("Transaction sent", transaction);
    console.log("signedTransaction", signedTransaction);
  };
  return (
    <View style={styles.layout}>
      <Text style={styles.header}>Create Account</Text>
      <ProfilePicture image={profilePicture} />
      <Text style={styles.labelText}>Step 1: Enter Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.inputText}
        maxLength={15}
      />
      <Text style={styles.labelText}>Step 2: Enter Profile Image URL</Text>
      <TextInput
        placeholder="Enter your profile image URL"
        value={uri}
        onChangeText={setUri}
        style={styles.inputText}
      />
      <TouchableOpacity
        disabled={inclompleteProfile}
        style={[
          styles.button,
          inclompleteProfile ? { backgroundColor: "#4C4C4C" } : styles.button,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { bottom: 80 }]}
        onPress={disconnect}
      >
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

function ProfilePicture(props: any) {
  return (
    <View>
      <Text style={[styles.labelText, { paddingLeft: -5 }]}>
        Profile Picture
      </Text>
      <View style={styles.profileGrid}>
        <UserSVG style={styles.image} />
        <Button
          bg="#393939"
          buttonWidth={283}
          buttonHeight={56}
          text="Choose NFT"
          fontSize={20}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileGrid: {
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    backgroundColor: "#161517",
    paddingHorizontal: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 24,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#C6C6C6",
    paddingVertical: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#F8F9FD",
    paddingTop: 20,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 26,
    fontWeight: "normal",
    color: "#F8F9FD",
    borderWidth: 1,
    borderColor: "#4C4C4C",
    borderRadius: 8,
    width: 380,
    paddingHorizontal: 10,
    height: 49,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#0F62FF",
    borderRadius: 8,
    width: 380,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 170,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8F9FD",
  },
});
function async() {
  throw new Error("Function not implemented.");
}

