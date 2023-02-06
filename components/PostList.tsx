import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Connection } from "@solana/web3.js";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import { COLORS } from "../constants";
import { usePrevious } from "../utils/usePrevious";
import { UserCoordinator } from "./UserCoordinator";

interface UserListProps {
  connection: Connection;
}

export default function UserList({ connection }: UserListProps) {
  const [Users, setUsers] = useState<(User | null)[]>([]);
  const [userInput, setUserInput] = useState({
    page: 1,
    search: "",
  });

  const previousUserInput = usePrevious(userInput);

  useEffect(() => {
    const { page, search } = userInput;

    let shouldReload = false;
    if (
      typeof previousUserInput?.search != "undefined" &&
      previousUserInput.search !== search
    ) {
      shouldReload = true;
    }

    UserCoordinator.fetchPage(connection, page, 10, search, shouldReload).then(
      (fetchedUsers) => {
        console.log(
          `fetch complete, received ${fetchedUsers.length} new Users`
        );
        shouldReload
          ? setUsers(fetchedUsers)
          : setUsers((Users) => [...Users, ...fetchedUsers]);
      }
    );
  }, [userInput]);

  const handleScroll = () =>
    Users.length < 10
      ? null
      : setUserInput((prev) => ({ page: prev.page + 1, search: prev.search }));

  const handleSearch = (text: string) =>
    setUserInput((prev) => ({ page: 1, search: text }));

  return (
    <View style={{ flexGrow: 1 }}>
      <Input
        value={userInput.search}
        placeholder="Search Users..."
        onChangeText={handleSearch}
      />
      <FlatList
        ItemSeparatorComponent={() => <View style={{ marginTop: 20 }} />}
        data={Users}
        onEndReached={handleScroll}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.item} key={index}>
            <View style={styles.itemHeader}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.username}>
                {item?.username}
              </Text>
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.uri}
            >
              {item?.uri}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  uri: {
    color: COLORS.LIGHT_GREY,
    fontSize: 14,
  },
  item: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: COLORS.GREY,
    borderRadius: 6,
    height: 80,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  list: {
    minWidth: "100%",
    flexDirection: "column",
  },
  username: {
    color: COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
});
